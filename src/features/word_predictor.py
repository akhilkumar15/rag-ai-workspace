"""
Predictor Module

Provides next-word prediction using the shared RAG pipeline.
"""

from typing import Dict, Optional

from config import TOP_K_RESULTS
from src.pipeline.rag_pipeline import RAGPipeline


class WordPredictor:
    """
    High-level interface for word prediction.
    """

    def __init__(
        self,
        pipeline: Optional[RAGPipeline] = None,
    ) -> None:
        """
        Initialize WordPredictor.

        If a pipeline is provided, it will be reused.
        Otherwise, create a new pipeline.
        """

        self.pipeline = pipeline or RAGPipeline()

    def predict(
        self,
        user_input: str,
        top_k: int = TOP_K_RESULTS,
    ) -> Dict:
        """
        Predict the next words for the user's input.

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

        return self.pipeline.predict(
            user_input=user_input,
            top_k=top_k,
        )