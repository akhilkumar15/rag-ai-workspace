"""
Question Answering Engine

Uses the shared RAG pipeline to answer user questions.
"""

from typing import Dict

from config import TOP_K_RESULTS
from src.pipeline.rag_pipeline import RAGPipeline


class QAEngine:
    """
    Question Answering feature.
    """

    def __init__(self):

        self.pipeline = RAGPipeline()

    def answer(
        self,
        question: str,
        top_k: int = TOP_K_RESULTS,
    ) -> Dict:
        """
        Answer a user question using retrieved context.
        """

        return self.pipeline.answer(
            question=question,
            top_k=top_k,
        )