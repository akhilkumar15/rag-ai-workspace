"""
RAG Pipeline

Central orchestration module for all AI features.
"""

from __future__ import annotations

import re
from typing import Dict, List

from config import TOP_K_RESULTS

from src.llm.llm_factory import LLMFactory

from src.retrieval.candidate_extractor import CandidateExtractor
from src.retrieval.prompt_builder import PromptBuilder
from src.retrieval.ranker import Ranker
from src.retrieval.retriever import Retriever

from src.prediction.predictor_factory import PredictorFactory


class RAGPipeline:
    """
    Central orchestration layer for all RAG-based tasks.
    """

    def __init__(self) -> None:

        self.retriever = Retriever()

        self.extractor = CandidateExtractor()

        self.ranker = Ranker()

        self.prompt_builder = PromptBuilder()

        self.llm = LLMFactory.get_llm()

        self.predictor = PredictorFactory.get_predictor()

    # =============================================================
    # SHARED RETRIEVAL
    # =============================================================

    def _retrieve_chunks(
        self,
        query: str,
        top_k: int,
    ) -> List[Dict]:

        return self.retriever.retrieve(
            query=query,
            top_k=top_k,
        )

    # =============================================================
    # WORD PREDICTION
    # =============================================================

    def predict(
        self,
        user_input: str,
        top_k: int = TOP_K_RESULTS,
    ) -> List[Dict]:

        prediction_retrieval_k = max(
            top_k,
            20,
        )

        retrieved_chunks = self._retrieve_chunks(
            query=user_input,
            top_k=prediction_retrieval_k,
        )

        candidates = self.extractor.extract(
            query=user_input,
            retrieved_chunks=retrieved_chunks,
        )

        ranked = self.ranker.rank(
            candidates=candidates,
            top_k=top_k,
        )

        return self.predictor.predict(
            query=user_input,
            ranked_candidates=ranked,
            top_n_words=top_k,
        )

    # =============================================================
    # QUESTION ANSWERING
    # =============================================================

    def answer(
        self,
        question: str,
        top_k: int = TOP_K_RESULTS,
    ) -> Dict:

        retrieved_chunks = self._retrieve_chunks(
            query=question,
            top_k=top_k,
        )

        prompt = self.prompt_builder.build_qa_prompt(
            question=question,
            candidates=retrieved_chunks,
        )

        # ---------------------------------------------------------
        # QA uses metadata-capable Ollama generation
        # ---------------------------------------------------------

        if hasattr(
            self.llm,
            "generate_with_metadata",
        ):

            llm_result = self.llm.generate_with_metadata(
                prompt=prompt,
            )

            response = llm_result["response"]

            result = self._build_response(
                query=question,
                response=response,
                retrieved_chunks=retrieved_chunks,
            )

            # Preserve the existing response structure
            # and attach LLM metadata for QA analytics.

            result["llm_metadata"] = llm_result

            return result

        # ---------------------------------------------------------
        # Fallback for LLM implementations without metadata
        # ---------------------------------------------------------

        response = self.llm.generate(
            prompt
        )

        return self._build_response(
            query=question,
            response=response,
            retrieved_chunks=retrieved_chunks,
        )

    # =============================================================
    # SUMMARIZATION
    # =============================================================

    def summarize(
        self,
        query: str,
        top_k: int = TOP_K_RESULTS,
    ) -> Dict:

        retrieved_chunks = self._retrieve_chunks(
            query=query,
            top_k=top_k,
        )

        prompt = self.prompt_builder.build_summary_prompt(
            candidates=retrieved_chunks,
        )

        response = self.llm.generate(
            prompt
        )

        return self._build_response(
            query=query,
            response=response,
            retrieved_chunks=retrieved_chunks,
        )

    # =============================================================
    # UPLOADED DOCUMENT SUMMARIZATION
    # =============================================================

    def summarize_uploaded_document(
        self,
        chunks: List[Dict],
    ) -> Dict:

        if not chunks:
            raise ValueError(
                "No document chunks were provided."
            )

        prompt = self.prompt_builder.build_summary_prompt(
            candidates=chunks,
        )

        # ---------------------------------------------------------
        # Use metadata-capable Ollama generation when available
        # ---------------------------------------------------------

        if hasattr(
            self.llm,
            "generate_with_metadata",
        ):

            llm_result = self.llm.generate_with_metadata(
                prompt=prompt
            )

            result = {
                "response": llm_result.get(
                    "response",
                    "",
                ),
                "chunks_used": len(chunks),
                "llm_metadata": llm_result,
            }

            return result

        # ---------------------------------------------------------
        # Fallback for LLM implementations without metadata
        # ---------------------------------------------------------

        response = self.llm.generate(
            prompt
        )

        return {
            "response": response,
            "chunks_used": len(chunks),
            "llm_metadata": {},
        }

    # =============================================================
    # DOCUMENT COMPARISON
    # =============================================================

    def compare(
        self,
        document_a: str,
        document_b: str,
    ) -> Dict:

        prompt = self.prompt_builder.build_comparison_prompt(
            document_a=document_a,
            document_b=document_b,
        )

        response = self.llm.generate(
            prompt
        )

        structured_result = self._parse_comparison_response(
            response=response
        )

        return {
            "response": response,
            "similarities": structured_result["similarities"],
            "differences": structured_result["differences"],
            "conclusion": structured_result["conclusion"],
        }

    # =============================================================
    # PARSE COMPARISON RESPONSE
    # =============================================================

    def _parse_comparison_response(
        self,
        response: str,
    ) -> Dict:

        similarities: List[str] = []
        differences: List[str] = []
        conclusion = ""

        # ---------------------------------------------------------
        # Normalize response
        # ---------------------------------------------------------

        text = response.strip()

        # ---------------------------------------------------------
        # Extract Similarities section
        # ---------------------------------------------------------

        similarities_match = re.search(
            r"\*\*Similarities:\*\*(.*?)(?=\*\*Differences:\*\*|\Z)",
            text,
            flags=re.IGNORECASE | re.DOTALL,
        )

        if similarities_match:

            similarities_text = (
                similarities_match.group(1).strip()
            )

            similarities = self._extract_numbered_items(
                similarities_text
            )

        # ---------------------------------------------------------
        # Extract Differences section
        # ---------------------------------------------------------

        differences_match = re.search(
            r"\*\*Differences:\*\*(.*?)(?=\*\*Final Conclusion:\*\*|\Z)",
            text,
            flags=re.IGNORECASE | re.DOTALL,
        )

        if differences_match:

            differences_text = (
                differences_match.group(1).strip()
            )

            differences = self._extract_numbered_items(
                differences_text
            )

        # ---------------------------------------------------------
        # Extract Final Conclusion
        # ---------------------------------------------------------

        conclusion_match = re.search(
            r"\*\*Final Conclusion:\*\*(.*)$",
            text,
            flags=re.IGNORECASE | re.DOTALL,
        )

        if conclusion_match:

            conclusion = (
                conclusion_match.group(1).strip()
            )

        # ---------------------------------------------------------
        # Fallbacks
        # ---------------------------------------------------------

        if not similarities:

            similarities = [
                "No structured similarity points were detected."
            ]

        if not differences:

            differences = [
                "No structured difference points were detected."
            ]

        if not conclusion:

            conclusion = (
                "No separate conclusion was returned "
                "by the comparison model."
            )

        return {
            "similarities": similarities,
            "differences": differences,
            "conclusion": conclusion,
        }

    # =============================================================
    # EXTRACT NUMBERED ITEMS
    # =============================================================

    def _extract_numbered_items(
        self,
        text: str,
    ) -> List[str]:

        items = re.findall(
            r"(?:^|\n)\s*\d+\.\s*(.*?)(?=\n\s*\d+\.|\Z)",
            text,
            flags=re.DOTALL,
        )

        cleaned_items = []

        for item in items:

            cleaned = " ".join(
                item.split()
            ).strip()

            if cleaned:

                cleaned_items.append(
                    cleaned
                )

        return cleaned_items

    # =============================================================
    # COMMON RESPONSE BUILDER
    # =============================================================

    def _build_response(
        self,
        query: str,
        response: str,
        retrieved_chunks: List[Dict],
    ) -> Dict:

        return {
            "query": query,

            "response": response,

            "sources": [
                {
                    "file_name": chunk["file_name"],
                    "chunk_id": chunk["chunk_id"],
                    "score": chunk["score"],
                }
                for chunk in retrieved_chunks
            ],

            "retrieved_chunks": len(
                retrieved_chunks
            ),
        }