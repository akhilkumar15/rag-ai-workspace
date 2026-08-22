"""
Summarizer

Provides summarization for both indexed documents
and temporarily uploaded documents.
"""

from typing import Dict, List, Optional

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

        self.pipeline = pipeline or RAGPipeline()

    # =========================================================
    # INDEXED DOCUMENT SUMMARIZATION
    # =========================================================

    def summarize(
        self,
        query: str,
        top_k: int = TOP_K_RESULTS,
    ) -> Dict:
        """
        Summarize content retrieved from the existing
        FAISS knowledge base.
        """

        return self.pipeline.summarize(
            query=query,
            top_k=top_k,
        )

    # =========================================================
    # UPLOADED DOCUMENT SUMMARIZATION
    # =========================================================

    def summarize_uploaded_document(
        self,
        chunks: List[Dict],
    ) -> Dict:
        """
        Summarize chunks belonging to a temporarily
        uploaded document.
        """

        return self.pipeline.summarize_uploaded_document(
            chunks=chunks,
        )