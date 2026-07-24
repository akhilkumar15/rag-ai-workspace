"""
Embedding Generator Module for the RAG AI Workspace.
"""

from __future__ import annotations

import logging
from typing import Dict, List

from sentence_transformers import SentenceTransformer

from config import EMBEDDING_MODEL_NAME

logger = logging.getLogger(__name__)


class EmbeddingGenerator:
    """
    Generates vector embeddings for text chunks.
    """

    def __init__(
        self,
        model_name: str = EMBEDDING_MODEL_NAME,
    ) -> None:

        logger.info("Loading embedding model: %s", model_name)

        self.model = SentenceTransformer(model_name)

        logger.info("Embedding model loaded successfully.")

    def generate_embedding(
        self,
        text: str,
    ) -> List[float]:
        """
        Generate embedding for a single text.
        """

        embedding = self.model.encode(
            text,
            convert_to_numpy=True,
            normalize_embeddings=True,
        )

        return embedding.tolist()

    def generate_embeddings(
        self,
        chunks: List[Dict],
    ) -> List[Dict]:
        """
        Generate embeddings for all chunks.
        """

        embedded_chunks = []

        total = len(chunks)

        logger.info("Generating embeddings for %d chunks.", total)

        for index, chunk in enumerate(chunks, start=1):

            logger.info(
                "Embedding chunk %d/%d",
                index,
                total,
            )

            embedded_chunks.append(
                {
                    **chunk,
                    "embedding": self.generate_embedding(
                        chunk["text"]
                    ),
                }
            )

        logger.info("Embedding generation completed.")

        return embedded_chunks