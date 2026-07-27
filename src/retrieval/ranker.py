"""
Ranker Module

Ranks candidate words using frequency and retrieval similarity.
"""

from __future__ import annotations

from typing import Dict, List


class Ranker:
    """
    Rank candidate next words.
    """

    # Weight configuration
    SIMILARITY_WEIGHT = 0.70
    FREQUENCY_WEIGHT = 0.30

    def rank(
        self,
        candidates: List[Dict],
        top_k: int | None = None,
    ) -> List[Dict]:
        """
        Rank candidate words.

        Parameters
        ----------
        candidates : List[Dict]
            Candidate words produced by CandidateExtractor.

        top_k : int | None
            Number of candidates to return.

        Returns
        -------
        List[Dict]
            Ranked candidates.
        """

        if not candidates:
            return []

        max_frequency = max(
            candidate["frequency"]
            for candidate in candidates
        )

        for candidate in candidates:

            frequency_score = (
                candidate["frequency"] / max_frequency
                if max_frequency > 0
                else 0.0
            )

            similarity_score = candidate["best_score"]

            final_score = (
                self.SIMILARITY_WEIGHT * similarity_score
                + self.FREQUENCY_WEIGHT * frequency_score
            )

            candidate["frequency_score"] = round(
                frequency_score,
                4,
            )

            candidate["similarity_score"] = round(
                similarity_score,
                4,
            )

            candidate["final_score"] = round(
                final_score,
                4,
            )

        ranked = sorted(
            candidates,
            key=lambda candidate: (
                candidate["final_score"],
                candidate["similarity_score"],
                candidate["frequency"],
                candidate["word"],
            ),
            reverse=True,
        )

        for rank, candidate in enumerate(ranked, start=1):
            candidate["rank"] = rank

        if top_k is not None:
            ranked = ranked[:top_k]

        return ranked