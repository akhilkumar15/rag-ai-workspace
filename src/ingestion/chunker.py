"""
Chunking module for the RAG AI Workspace.
"""

from __future__ import annotations

import logging
from typing import Dict, List

from config import CHUNK_SIZE, CHUNK_OVERLAP

logger = logging.getLogger(__name__)


class TextChunker:
    """
    Splits tokenized documents into overlapping chunks.
    """

    def __init__(
        self,
        chunk_size: int = CHUNK_SIZE,
        chunk_overlap: int = CHUNK_OVERLAP,
    ) -> None:

        if chunk_overlap >= chunk_size:
            raise ValueError(
                "CHUNK_OVERLAP must be smaller than CHUNK_SIZE."
            )

        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    def chunk_tokens(
        self,
        tokens: List[str],
    ) -> List[Dict]:

        chunks: List[Dict] = []

        step = self.chunk_size - self.chunk_overlap

        chunk_id = 0

        for start in range(0, len(tokens), step):

            end = start + self.chunk_size

            chunk = tokens[start:end]

            if not chunk:
                continue

            chunks.append(
                {
                    "chunk_id": chunk_id,
                    "start_token": start,
                    "end_token": min(end, len(tokens)),
                    "token_count": len(chunk),
                    "text": " ".join(chunk),
                }
            )

            chunk_id += 1

            if end >= len(tokens):
                break

        logger.info(
            "Created %d chunk(s).",
            len(chunks),
        )

        return chunks

    def chunk_documents(
        self,
        documents: List[dict],
    ) -> List[dict]:

        all_chunks = []

        for document in documents:

            tokens = document.get("tokens", [])

            chunks = self.chunk_tokens(tokens)

            for chunk in chunks:

                all_chunks.append(
                    {
                        "file_name": document["file_name"],
                        "file_path": document["file_path"],
                        **chunk,
                    }
                )

        logger.info(
            "Generated %d total chunk(s).",
            len(all_chunks),
        )

        return all_chunks