"""
Summarizer

Uses the shared RAG pipeline to summarize
retrieved document content.
"""

from typing import Dict, Optional

from config import TOP_K_RESULTS
from src.pipeline.rag_pipeline import RAGPipeline


class Summarizer:
    """
    Document summarization feature.
    """

    def __init__(
        self,
        pipeline: Optional[RAGPipeline] = None,
    ) -> None:
        """
        Initialize Summarizer.

        If a pipeline is provided, it will be reused.
        Otherwise, create a new pipeline.
        """

        self.pipeline = pipeline or RAGPipeline()

    def summarize(
        self,
        query: str,
        top_k: int = TOP_K_RESULTS,
    ) -> Dict:
        """
        Summarize retrieved document content.
        """

        return self.pipeline.summarize(
            query=query,
            top_k=top_k,
        )