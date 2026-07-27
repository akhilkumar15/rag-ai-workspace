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

    The embedding model is loaded only once and shared across
    all EmbeddingGenerator instances.
    """

    _shared_model = None

    def __init__(
        self,
        model_name: str = EMBEDDING_MODEL_NAME,
    ) -> None:

        if EmbeddingGenerator._shared_model is None:

            logger.info("Loading embedding model: %s", model_name)

            EmbeddingGenerator._shared_model = SentenceTransformer(
                model_name
            )

            logger.info("Embedding model loaded successfully.")

        self.model = EmbeddingGenerator._shared_model

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
        batch_size: int = 64,
    ) -> List[Dict]:
        """
        Generate embeddings for all chunks using batch processing.
        """

        if not chunks:
            return []

        logger.info(
            "Generating embeddings for %d chunks (batch size = %d).",
            len(chunks),
            batch_size,
        )

        texts = [chunk["text"] for chunk in chunks]

        embeddings = self.model.encode(
            texts,
            batch_size=batch_size,
            convert_to_numpy=True,
            normalize_embeddings=True,
            show_progress_bar=True,
        )

        embedded_chunks: List[Dict] = []

        for chunk, embedding in zip(chunks, embeddings):
            embedded_chunks.append(
                {
                    **chunk,
                    "embedding": embedding.tolist(),
                }
            )

        logger.info("Embedding generation completed.")

        return embedded_chunks