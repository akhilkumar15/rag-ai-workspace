"""
Predictor Module

Provides next-word prediction and sentence completion
using the RAG pipeline.
"""

from typing import Dict, List

from config import TOP_K_RESULTS
from src.retrieval.retriever import Retriever
from src.retrieval.candidate_extractor import CandidateExtractor
from src.retrieval.ranker import Ranker
from src.retrieval.prompt_builder import PromptBuilder
from src.llm.llm_factory import LLMFactory


class Predictor:
    """
    RAG-based predictor for text completion.
    """

    def __init__(self) -> None:

        self.retriever = Retriever()
        self.extractor = CandidateExtractor()
        self.ranker = Ranker()
        self.prompt_builder = PromptBuilder()
        self.llm = LLMFactory.get_llm()

    def predict(
        self,
        user_input: str,
        top_k: int = TOP_K_RESULTS,
    ) -> Dict:
        """
        Predict the continuation of the user's text.

        Parameters
        ----------
        user_input : str
            User query.

        top_k : int
            Number of retrieved chunks.

        Returns
        -------
        Dict
            Prediction result.
        """

        retrieved = self.retriever.retrieve(
            query=user_input,
            top_k=top_k,
        )

        candidates = self.extractor.extract(retrieved)

        ranked = self.ranker.rank(candidates)

        prompt = self.prompt_builder.build_prediction_prompt(
            user_input=user_input,
            candidates=ranked,
        )

        response = self.llm.generate(prompt)

        sources: List[Dict] = []

        for item in ranked:

            sources.append(
                {
                    "file_name": item["file_name"],
                    "chunk_id": item["chunk_id"],
                    "score": item["score"],
                }
            )

        return {
            "query": user_input,
            "response": response,
            "sources": sources,
            "retrieved_chunks": len(ranked),
        }