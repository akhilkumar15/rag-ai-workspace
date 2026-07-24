"""
Word Predictor

Feature layer for next-word prediction.

Handles:
- Retrieval
- Candidate extraction
- Ranking

Delegates prediction logic to a prediction strategy
selected by PredictorFactory.
"""

from typing import Dict

from config import TOP_K_RESULTS
from src.retrieval.retriever import Retriever
from src.retrieval.candidate_extractor import CandidateExtractor
from src.retrieval.ranker import Ranker
from src.prediction.predictor_factory import PredictorFactory


class WordPredictor:
    """
    High-level word prediction feature.
    """

    def __init__(self):

        self.retriever = Retriever()
        self.extractor = CandidateExtractor()
        self.ranker = Ranker()

        # Current prediction strategy
        self.predictor = PredictorFactory.get_predictor()

    def predict_next_words(
        self,
        user_input: str,
        top_k_chunks: int = TOP_K_RESULTS,
        top_n_words: int = 5,
    ) -> Dict:

        retrieved = self.retriever.retrieve(
            query=user_input,
            top_k=top_k_chunks,
        )

        candidates = self.extractor.extract(retrieved)

        ranked = self.ranker.rank(candidates)

        result = self.predictor.predict(
            query=user_input,
            ranked_chunks=ranked,
            top_n_words=top_n_words,
        )

        result["sources"] = [
            {
                "file_name": item["file_name"],
                "chunk_id": item["chunk_id"],
                "score": item["score"],
            }
            for item in ranked
        ]

        return result