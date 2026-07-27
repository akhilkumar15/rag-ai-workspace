"""
Regex Predictor

Version 1 implementation of the prediction strategy.

Consumes ranked candidate words produced by the
CandidateExtractor and Ranker.
"""

from typing import Dict, List

from src.prediction.base_predictor import BasePredictor


class RegexPredictor(BasePredictor):
    """
    Regex-based prediction strategy.

    Note:
    This class no longer performs regex extraction.
    Regex extraction is handled by CandidateExtractor.
    This predictor simply formats and returns the
    highest-ranked candidate words.
    """

    def predict(
        self,
        query: str,
        ranked_candidates: List[Dict],
        top_n_words: int = 5,
    ) -> Dict:
        """
        Return the highest ranked candidate words.

        Parameters
        ----------
        query : str
            User query.

        ranked_candidates : List[Dict]
            Ranked candidate words.

        top_n_words : int
            Number of predictions.

        Returns
        -------
        Dict
            Prediction result.
        """

        predictions = []

        for candidate in ranked_candidates[:top_n_words]:

            predictions.append(
                {
                    "word": candidate["word"],
                    "frequency": candidate["frequency"],
                    "score": candidate["final_score"],
                    "rank": candidate["rank"],
                }
            )

        return {
            "query": query,
            "predictions": predictions,
            "count": len(predictions),
        }