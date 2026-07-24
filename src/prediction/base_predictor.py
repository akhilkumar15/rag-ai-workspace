"""
Base Predictor

Defines the interface for all word prediction algorithms.
Future versions (Regex, Weighted, Hybrid, Transformer, etc.)
must inherit from this class.
"""

from abc import ABC, abstractmethod
from typing import Dict, List


class BasePredictor(ABC):
    """
    Abstract base class for all prediction strategies.
    """

    @abstractmethod
    def predict(
        self,
        query: str,
        ranked_chunks: List[Dict],
        top_n_words: int = 5,
    ) -> Dict:
        """
        Predict next words from ranked chunks.

        Parameters
        ----------
        query : str
            User input.

        ranked_chunks : List[Dict]
            Ranked retrieval results.

        top_n_words : int
            Number of predicted words.

        Returns
        -------
        Dict
            Prediction result.
        """
        pass