"""
RAG Pipeline

Central orchestration module for all AI features.
"""

from __future__ import annotations

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
    Central orchestration layer for retrieval-based tasks.
    """

    def __init__(self) -> None:

        self.retriever = Retriever()
        self.extractor = CandidateExtractor()
        self.ranker = Ranker()

        self.prompt_builder = PromptBuilder()
        self.llm = LLMFactory.get_llm()
        
        self.predictor = PredictorFactory.get_predictor()

    # -------------------------------------------------------------
    # Shared Retrieval
    # -------------------------------------------------------------

    def _retrieve_chunks(
        self,
        query: str,
        top_k: int,
    ) -> List[Dict]:

        return self.retriever.retrieve(
            query=query,
            top_k=top_k,
        )

    # -------------------------------------------------------------
    # Word Prediction
    # -------------------------------------------------------------

    def predict(
        self,
        user_input: str,
        top_k: int = TOP_K_RESULTS,
    ) -> List[Dict]:

        retrieved_chunks = self._retrieve_chunks(
            query=user_input,
            top_k=top_k,
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
         retrieved_chunks=retrieved_chunks,
         top_k=top_k,
        )
    # -------------------------------------------------------------
    # QA
    # -------------------------------------------------------------

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

        response = self.llm.generate(prompt)

        return self._build_response(
            query=question,
            response=response,
            retrieved_chunks=retrieved_chunks,
        )

    # -------------------------------------------------------------
    # Summary
    # -------------------------------------------------------------

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

        response = self.llm.generate(prompt)

        return self._build_response(
            query=query,
            response=response,
            retrieved_chunks=retrieved_chunks,
        )

    # -------------------------------------------------------------
    # Comparison
    # -------------------------------------------------------------

    def compare(
        self,
        document_a: str,
        document_b: str,
    ) -> Dict:

        prompt = self.prompt_builder.build_comparison_prompt(
            document_a=document_a,
            document_b=document_b,
        )

        response = self.llm.generate(prompt)

        return {"response": response}

    # -------------------------------------------------------------
    # Common Response Builder
    # -------------------------------------------------------------

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
            "retrieved_chunks": len(retrieved_chunks),
        }