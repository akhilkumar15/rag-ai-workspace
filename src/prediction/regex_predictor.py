"""
Regex Predictor

Version 1 implementation of the word prediction algorithm.

Uses regular expressions to find the immediate next word
following the user's query within the retrieved text.
"""

import re
from collections import Counter
from typing import Dict, List

from src.prediction.base_predictor import BasePredictor


class RegexPredictor(BasePredictor):
    """
    Regex-based next word predictor.
    """

    def predict(
        self,
        query: str,
        ranked_chunks: List[Dict],
        top_n_words: int = 5,
    ) -> Dict:

        counter = Counter()

        escaped_query = re.escape(query.lower())

        pattern = re.compile(
            rf"{escaped_query}\s+([a-zA-Z][a-zA-Z\-]*)"
        )

        for chunk in ranked_chunks:

            text = chunk["text"].lower()

            matches = pattern.findall(text)

            counter.update(matches)

        predictions = []

        for word, frequency in counter.most_common(top_n_words):

            predictions.append(
                {
                    "word": word,
                    "frequency": frequency,
                }
            )

        return {
            "query": query,
            "predictions": predictions,
        }