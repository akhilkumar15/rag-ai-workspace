"""
Candidate Extractor Module

Extracts candidate next words from retrieved chunks for
the RAG-based Word Prediction pipeline.
"""

from __future__ import annotations

import re
from collections import defaultdict
from typing import Dict, List


class CandidateExtractor:
    """
    Extract candidate next words from retrieved chunks.
    """

    WORD_PATTERN = re.compile(r"[A-Za-z]+(?:-[A-Za-z]+)?")

    STOP_WORDS = {
        "a",
        "an",
        "the",
        "is",
        "are",
        "am",
        "was",
        "were",
        "be",
        "been",
        "being",
        "of",
        "to",
        "in",
        "on",
        "at",
        "by",
        "for",
        "from",
        "with",
        "into",
        "onto",
        "over",
        "under",
        "and",
        "or",
        "but",
        "that",
        "this",
        "these",
        "those",
        "which",
        "who",
        "whose",
        "where",
        "when",
        "while",
        "it",
        "its",
        "their",
        "his",
        "her",
        "our",
        "your",
    }

    def extract(
        self,
        query: str,
        retrieved_chunks: List[Dict],
    ) -> List[Dict]:
        """
        Extract candidate next words.

        Parameters
        ----------
        query : str
            User input phrase.

        retrieved_chunks : List[Dict]
            Output from Retriever.

        Returns
        -------
        List[Dict]
            Candidate words with metadata.
        """

        if not query.strip():
            return []

        escaped_query = re.escape(query.strip())

        pattern = re.compile(
            rf"{escaped_query}\s+([A-Za-z]+(?:-[A-Za-z]+)?)",
            re.IGNORECASE,
        )

        candidate_map = defaultdict(
            lambda: {
                "word": "",
                "frequency": 0,
                "best_score": 0.0,
                "sources": [],
            }
        )

        for chunk in retrieved_chunks:

            text = chunk.get("text", "")

            matches = pattern.findall(text)

            for match in matches:

                word_match = self.WORD_PATTERN.search(match)

                if not word_match:
                    continue

                word = word_match.group(0).lower()

                # Ignore numbers
                if word.isdigit():
                    continue

                # Ignore very short words
                if len(word) < 3:
                    continue

                # Ignore stop words
                if word in self.STOP_WORDS:
                    continue

                candidate = candidate_map[word]

                candidate["word"] = word
                candidate["frequency"] += 1

                candidate["best_score"] = max(
                    candidate["best_score"],
                    chunk["score"],
                )

                candidate["sources"].append(
                    {
                        "file_name": chunk["file_name"],
                        "file_path": chunk["file_path"],
                        "chunk_id": chunk["chunk_id"],
                        "score": chunk["score"],
                    }
                )

        candidates = list(candidate_map.values())

        candidates.sort(
            key=lambda candidate: (
                -candidate["frequency"],
                -candidate["best_score"],
                candidate["word"],
            )
        )

        return candidates