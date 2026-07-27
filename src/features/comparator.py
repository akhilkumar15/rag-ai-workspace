"""
Comparator

Uses the shared RAG pipeline to compare
two PDF/documents.
"""

from typing import Dict, Optional

from src.pipeline.rag_pipeline import RAGPipeline


class Comparator:
    """
    Document comparison feature.
    """

    def __init__(
        self,
        pipeline: Optional[RAGPipeline] = None,
    ) -> None:
        """
        Initialize Comparator.

        If a pipeline is provided, it will be reused.
        Otherwise, create a new pipeline.
        """

        self.pipeline = pipeline or RAGPipeline()

    def compare(
        self,
        document_a: str,
        document_b: str,
    ) -> Dict:
        """
        Compare two documents using the shared RAG pipeline.

        Parameters
        ----------
        document_a : str
            First document text.

        document_b : str
            Second document text.

        Returns
        -------
        Dict
            Comparison result.
        """

        return self.pipeline.compare(
            document_a=document_a,
            document_b=document_b,
        )