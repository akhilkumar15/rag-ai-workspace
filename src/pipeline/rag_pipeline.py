"""
RAG Pipeline

Central orchestration module for all AI features.

Supported Tasks:
- Word Prediction
- Question Answering
- Summarization
- Comparison
"""

from typing import Dict, List

from config import TOP_K_RESULTS
from src.retrieval.retriever import Retriever
from src.retrieval.candidate_extractor import CandidateExtractor
from src.retrieval.ranker import Ranker
from src.retrieval.prompt_builder import PromptBuilder
from src.prediction.predictor_factory import PredictorFactory
from src.llm.llm_factory import LLMFactory


class RAGPipeline:

    def __init__(self):

        self.retriever = Retriever()
        self.extractor = CandidateExtractor()
        self.ranker = Ranker()
        self.prompt_builder = PromptBuilder()

        self.predictor = PredictorFactory.get_predictor()

        self.llm = LLMFactory.get_llm()

    def _prepare_context(
        self,
        query: str,
        top_k: int,
    ) -> List[Dict]:

        retrieved = self.retriever.retrieve(
            query=query,
            top_k=top_k,
        )

        candidates = self.extractor.extract(retrieved)

        ranked = self.ranker.rank(candidates)

        return ranked

    # ------------------------------------------------------------------

    # WORD PREDICTION (No LLM)

    # ------------------------------------------------------------------

    def predict(
        self,
        user_input: str,
        top_k: int = TOP_K_RESULTS,
    ) -> Dict:

        ranked = self._prepare_context(
            user_input,
            top_k,
        )

        return self.predictor.predict(
            query=user_input,
            ranked_chunks=ranked,
        )

    # ------------------------------------------------------------------

    # QUESTION ANSWERING

    # ------------------------------------------------------------------

    def answer(
        self,
        question: str,
        top_k: int = TOP_K_RESULTS,
    ) -> Dict:

        ranked = self._prepare_context(
            question,
            top_k,
        )

        prompt = self.prompt_builder.build_qa_prompt(
            question=question,
            candidates=ranked,
        )

        response = self.llm.generate(prompt)

        return self._build_response(
            question,
            response,
            ranked,
        )

    # ------------------------------------------------------------------

    # SUMMARIZATION

    # ------------------------------------------------------------------

    def summarize(
        self,
        query: str,
        top_k: int = TOP_K_RESULTS,
    ) -> Dict:

        ranked = self._prepare_context(
            query,
            top_k,
        )

        prompt = self.prompt_builder.build_summary_prompt(
            candidates=ranked,
        )

        response = self.llm.generate(prompt)

        return self._build_response(
            query,
            response,
            ranked,
        )

    # ------------------------------------------------------------------

    # COMPARISON

    # ------------------------------------------------------------------

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

        return {
            "response": response
        }

    # ------------------------------------------------------------------

    def _build_response(
        self,
        query: str,
        response: str,
        ranked: List[Dict],
    ) -> Dict:

        return {

            "query": query,

            "response": response,

            "sources": [

                {
                    "file_name": item["file_name"],
                    "chunk_id": item["chunk_id"],
                    "score": item["score"],
                }

                for item in ranked

            ],

            "retrieved_chunks": len(ranked),

        }