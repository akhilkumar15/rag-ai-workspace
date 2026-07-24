"""
Summarizer

Uses the shared RAG pipeline to summarize
retrieved document content.
"""

from typing import Dict

from config import TOP_K_RESULTS
from src.pipeline.rag_pipeline import RAGPipeline


class Summarizer:
    """
    Document summarization feature.
    """

    def __init__(self):

        self.pipeline = RAGPipeline()

    def summarize(
        self,
        query: str,
        top_k: int = TOP_K_RESULTS,
    ) -> Dict:

        return self.pipeline.summarize(
            query=query,
            top_k=top_k,
        )