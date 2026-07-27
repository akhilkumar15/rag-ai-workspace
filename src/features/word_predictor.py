"""
Word Predictor Module

Provides the public interface for next-word prediction.
"""

from __future__ import annotations

from typing import Dict, Optional

from config import TOP_K_RESULTS
from src.pipeline.rag_pipeline import RAGPipeline


class WordPredictor:
    """
    High-level interface for next-word prediction.

    This class acts as the feature layer between the API
    and the RAG pipeline.
    """

    def __init__(
        self,
        pipeline: Optional[RAGPipeline] = None,
    ) -> None:
        """
        Initialize the Word Predictor.

        Parameters
        ----------
        pipeline : Optional[RAGPipeline]
            Custom pipeline instance.
        """

        self.pipeline = pipeline or RAGPipeline()

    def predict(
        self,
        user_input: str,
        top_k: int = TOP_K_RESULTS,
    ) -> Dict:
        """
        Predict the next words for the given input.

        Parameters
        ----------
        user_input : str
            User input phrase.

        top_k : int
            Number of predictions to generate.

        Returns
        -------
        Dict
            Prediction response.
        """

        if not user_input.strip():
            return {
                "query": user_input,
                "predictions": [],
                "count": 0,
            }

        return self.pipeline.predict(
            user_input=user_input,
            top_k=top_k,
        )