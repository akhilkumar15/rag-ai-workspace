"""
Candidate Extractor Module

Processes retrieved chunks into structured candidate contexts
for downstream modules like Predictor, QA Engine,
Summarizer, and Comparator.
"""

from typing import List, Dict


class CandidateExtractor:
    """
    Extracts and prepares candidate contexts from retrieved chunks.
    """

    def __init__(self) -> None:
        pass

    def extract(
        self,
        retrieved_chunks: List[Dict]
    ) -> List[Dict]:
        """
        Prepare retrieved chunks for downstream processing.

        Parameters
        ----------
        retrieved_chunks : List[Dict]
            Output from Retriever.

        Returns
        -------
        List[Dict]
            Candidate contexts.
        """

        candidates = []

        for rank, chunk in enumerate(retrieved_chunks, start=1):

            candidate = {
                "rank": rank,
                "score": chunk["score"],
                "file_name": chunk["file_name"],
                "file_path": chunk["file_path"],
                "chunk_id": chunk["chunk_id"],
                "start_token": chunk["start_token"],
                "end_token": chunk["end_token"],
                "token_count": chunk["token_count"],
                "text": chunk["text"],
            }

            candidates.append(candidate)

        return candidates