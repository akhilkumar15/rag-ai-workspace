"""
Retriever Module

Loads the FAISS index and retrieves the most relevant document
chunks for a given user query.
"""

from __future__ import annotations

import logging
from typing import Dict, List

import numpy as np

from config import TOP_K_RESULTS
from src.embeddings.embedding_generator import EmbeddingGenerator
from src.embeddings.vector_database import VectorDatabase

logger = logging.getLogger(__name__)


class Retriever:
    """
    Retrieves the most relevant chunks from the FAISS vector database.
    """

    def __init__(self) -> None:

        self.embedding_generator = EmbeddingGenerator()

        self.vector_db = VectorDatabase()
        self.vector_db.load()

        logger.info(
            "Retriever initialized with %d vectors.",
            self.vector_db.total_vectors(),
        )

    def retrieve(
        self,
        query: str,
        top_k: int = TOP_K_RESULTS,
    ) -> List[Dict]:
        """
        Retrieve the top-k most similar chunks.

        Parameters
        ----------
        query : str
            User query.

        top_k : int
            Number of chunks to retrieve.

        Returns
        -------
        List[Dict]
            Retrieved chunks with similarity score.
        """

        query = query.strip()

        if not query:
            raise ValueError("Query cannot be empty.")

        if self.vector_db.index is None:
            raise RuntimeError("Vector database has not been loaded.")

        query_embedding = self.embedding_generator.generate_embedding(query)

        query_vector = np.array(
            [query_embedding],
            dtype=np.float32,
        )

        distances, indices = self.vector_db.index.search(
            query_vector,
            top_k,
        )

        results: List[Dict] = []

        for score, idx in zip(distances[0], indices[0]):

            if idx == -1:
                continue

            chunk = self.vector_db.metadata[idx].copy()

            chunk["score"] = float(score)

            results.append(chunk)

        logger.info(
            "Retrieved %d chunk(s) for query: %s",
            len(results),
            query,
        )

        return results