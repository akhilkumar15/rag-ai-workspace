"""
Predictor Factory

Responsible for creating the active prediction algorithm.

Future:
- RegexPredictor
- WeightedPredictor
- HybridPredictor
"""

from src.prediction.regex_predictor import RegexPredictor
from src.prediction.base_predictor import BasePredictor


class PredictorFactory:
    """
    Factory class for prediction strategies.
    """

    @staticmethod
    def get_predictor(
        predictor_type: str = "regex",
    ) -> BasePredictor:

        predictor_type = predictor_type.lower()

        if predictor_type == "regex":
            return RegexPredictor()

        raise ValueError(
            f"Unsupported predictor type: {predictor_type}"
        )