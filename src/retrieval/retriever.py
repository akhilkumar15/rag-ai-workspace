"""
Retriever Module

Loads the FAISS index and retrieves the most relevant document
chunks for a given user query.
"""

from typing import List, Dict

import numpy as np

from src.embeddings.embedding_generator import EmbeddingGenerator
from src.embeddings.vector_database import VectorDatabase


class Retriever:
    """
    Retrieves top-k most relevant chunks from the vector database.
    """

    def __init__(self) -> None:
        self.embedding_generator = EmbeddingGenerator()

        self.vector_db = VectorDatabase()
        self.vector_db.load()

    def retrieve(
        self,
        query: str,
        top_k: int = 5,
    ) -> List[Dict]:
        """
        Retrieve top-k most similar chunks.

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

        query_embedding = self.embedding_generator.generate_embedding(query)

        query_vector = np.array(
            [query_embedding],
            dtype="float32"
        )

        distances, indices = self.vector_db.index.search(
            query_vector,
            top_k
        )

        results = []

        for score, idx in zip(distances[0], indices[0]):

            if idx == -1:
                continue

            chunk = self.vector_db.metadata[idx].copy()

            chunk["score"] = float(score)

            results.append(chunk)

        return results