"""
Ranker Module

Ranks retrieved candidate contexts based on relevance score.
"""

from typing import List, Dict


class Ranker:
    """
    Ranks candidate contexts.
    """

    def __init__(self) -> None:
        pass

    def rank(
        self,
        candidates: List[Dict],
        top_k: int | None = None,
    ) -> List[Dict]:
        """
        Rank candidates by similarity score.

        Parameters
        ----------
        candidates : List[Dict]
            Candidate contexts.

        top_k : int | None
            Limit number of returned candidates.

        Returns
        -------
        List[Dict]
            Ranked candidates.
        """

        ranked = sorted(
            candidates,
            key=lambda x: x["score"],
            reverse=True,
        )

        for index, candidate in enumerate(ranked, start=1):
            candidate["rank"] = index

        if top_k is not None:
            ranked = ranked[:top_k]

        return ranked