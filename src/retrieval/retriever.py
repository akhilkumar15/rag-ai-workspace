"""
Retriever Module

Loads the persistent FAISS index and optionally retrieves from
a currently uploaded document index.
"""

from __future__ import annotations

import logging
from typing import Dict, List, Optional

import faiss
import numpy as np

from config import (
    MIN_SIMILARITY_SCORE,
    TOP_K_RESULTS,
)

from src.embeddings.embedding_generator import EmbeddingGenerator
from src.embeddings.vector_database import VectorDatabase

logger = logging.getLogger(__name__)


class Retriever:
    """
    Retrieves relevant chunks from:

    1. The persistent Wikipedia FAISS database.
    2. An optional in-memory uploaded-document index.
    """

    def __init__(self) -> None:

        self.embedding_generator = EmbeddingGenerator()

        # -------------------------------------------------
        # Persistent knowledge base
        # -------------------------------------------------

        self.vector_db = VectorDatabase()
        self.vector_db.load()

        # -------------------------------------------------
        # Current uploaded document
        #
        # This is intentionally NOT saved to disk.
        # -------------------------------------------------

        self.uploaded_index = None
        self.uploaded_metadata: List[Dict] = []

        logger.info(
            "Retriever initialized with %d persistent vectors.",
            self.vector_db.total_vectors(),
        )

    # =====================================================
    # UPLOADED DOCUMENT
    # =====================================================

    def set_uploaded_document(
        self,
        embedded_chunks: List[Dict],
    ) -> None:
        """
        Replace the current in-memory uploaded document.

        The persistent Wikipedia FAISS index is never modified.
        """

        if not embedded_chunks:
            raise ValueError(
                "No embedded document chunks were provided."
            )

        embeddings = np.array(
            [
                chunk["embedding"]
                for chunk in embedded_chunks
            ],
            dtype=np.float32,
        )

        dimension = embeddings.shape[1]

        uploaded_index = faiss.IndexFlatIP(
            dimension
        )

        uploaded_index.add(embeddings)

        metadata = []

        for chunk in embedded_chunks:

            item = dict(chunk)

            # The FAISS index stores the vectors.
            # Metadata should not contain the embedding.
            item.pop("embedding", None)

            metadata.append(item)

        self.uploaded_index = uploaded_index
        self.uploaded_metadata = metadata

        logger.info(
            "Uploaded document index created with %d vectors.",
            uploaded_index.ntotal,
        )

    def clear_uploaded_document(self) -> None:
        """
        Remove the current uploaded document from memory.
        """

        self.uploaded_index = None
        self.uploaded_metadata = []

        logger.info(
            "Uploaded document index cleared."
        )

    def has_uploaded_document(self) -> bool:
        """
        Return whether an uploaded document is currently active.
        """

        return (
            self.uploaded_index is not None
            and self.uploaded_index.ntotal > 0
        )

    # =====================================================
    # RETRIEVAL
    # =====================================================

    def retrieve(
        self,
        query: str,
        top_k: int = TOP_K_RESULTS,
    ) -> List[Dict]:
        """
        Retrieve the most relevant chunks from both:

        - persistent Wikipedia knowledge base
        - current uploaded document

        Results are combined and sorted by similarity.
        """

        query = query.strip()

        if not query:
            raise ValueError(
                "Query cannot be empty."
            )

        # -------------------------------------------------
        # Query embedding
        # -------------------------------------------------

        query_embedding = (
            self.embedding_generator.generate_embedding(
                query
            )
        )

        query_vector = np.array(
            [query_embedding],
            dtype=np.float32,
        )

        # -------------------------------------------------
        # Persistent FAISS retrieval
        # -------------------------------------------------

        persistent_results = self._retrieve_from_index(
            index=self.vector_db.index,
            metadata=self.vector_db.metadata,
            query_vector=query_vector,
            top_k=top_k,
        )

        # -------------------------------------------------
        # Uploaded document retrieval
        # -------------------------------------------------

        uploaded_results = []

        if self.has_uploaded_document():

            uploaded_results = self._retrieve_from_index(
                index=self.uploaded_index,
                metadata=self.uploaded_metadata,
                query_vector=query_vector,
                top_k=top_k,
            )

        # -------------------------------------------------
        # Combine results
        # -------------------------------------------------

        combined_results = (
            persistent_results
            + uploaded_results
        )

        # -------------------------------------------------
        # Remove duplicate chunk IDs
        #
        # Uploaded chunks are prefixed separately so they
        # cannot collide with Wikipedia chunk IDs.
        # -------------------------------------------------

        seen_chunk_ids = set()
        results = []

        for chunk in combined_results:

            chunk_id = (
                chunk.get("source_id")
                or chunk.get("chunk_id")
            )

            if chunk_id in seen_chunk_ids:
                continue

            seen_chunk_ids.add(chunk_id)

            results.append(chunk)

        # -------------------------------------------------
        # Global ranking
        # -------------------------------------------------

        results.sort(
            key=lambda chunk: chunk["score"],
            reverse=True,
        )

        results = results[:top_k]

        logger.info(
            "Retrieved %d chunk(s) for query '%s'.",
            len(results),
            query,
        )

        return results

    # =====================================================
    # INDEX SEARCH
    # =====================================================

    def _retrieve_from_index(
        self,
        index,
        metadata: List[Dict],
        query_vector: np.ndarray,
        top_k: int,
    ) -> List[Dict]:
        """
        Search one FAISS index.
        """

        if index is None:
            return []

        total_vectors = index.ntotal

        if total_vectors == 0:
            return []

        search_k = min(
            top_k,
            total_vectors,
        )

        distances, indices = index.search(
            query_vector,
            search_k,
        )

        results = []

        for score, idx in zip(
            distances[0],
            indices[0],
        ):

            if idx == -1:
                continue

            if score < MIN_SIMILARITY_SCORE:
                continue

            if idx >= len(metadata):
                continue

            chunk = metadata[idx].copy()

            chunk["score"] = float(score)

            results.append(chunk)

        return results