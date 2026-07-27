"""
Predictor Factory

Responsible for creating the active prediction algorithm.

Future:
- RegexPredictor
- WeightedPredictor
- HybridPredictor
- TransformerPredictor
"""

from src.prediction.base_predictor import BasePredictor
from src.prediction.regex_predictor import RegexPredictor


class PredictorFactory:
    """
    Factory class for prediction strategies.
    """

    PREDICTORS = {
        "regex": RegexPredictor,
    }

    @classmethod
    def get_predictor(
        cls,
        predictor_type: str = "regex",
    ) -> BasePredictor:

        predictor_type = predictor_type.lower()

        if predictor_type not in cls.PREDICTORS:
            raise ValueError(
                f"Unsupported predictor type: {predictor_type}"
            )

        predictor_class = cls.PREDICTORS[predictor_type]

        return predictor_class()