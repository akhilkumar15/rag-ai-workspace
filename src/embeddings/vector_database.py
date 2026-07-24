"""
FAISS Vector Database Module for the RAG AI Workspace.
"""

from __future__ import annotations

import logging
import pickle
from pathlib import Path
from typing import Dict, List

import faiss
import numpy as np

from config import VECTOR_STORE_DIR

logger = logging.getLogger(__name__)


class VectorDatabase:
    """
    Handles creation, saving and loading of FAISS vector indexes.
    """

    def __init__(self) -> None:

        self.index = None
        self.metadata: List[Dict] = []

    def build_index(
        self,
        embedded_chunks: List[Dict],
    ) -> None:

        if not embedded_chunks:
            raise ValueError("No embedded chunks found.")

        embeddings = np.array(
            [chunk["embedding"] for chunk in embedded_chunks],
            dtype=np.float32,
        )

        dimension = embeddings.shape[1]

        self.index = faiss.IndexFlatIP(dimension)

        self.index.add(embeddings)

        self.metadata = []

        for chunk in embedded_chunks:

            metadata = dict(chunk)

            metadata.pop("embedding")

            self.metadata.append(metadata)

        logger.info(
            "FAISS index created with %d vectors.",
            self.index.ntotal,
        )

    def save(self) -> None:

        if self.index is None:
            raise ValueError("Index has not been created.")

        faiss.write_index(
            self.index,
            str(VECTOR_STORE_DIR / "faiss.index"),
        )

        with open(
            VECTOR_STORE_DIR / "metadata.pkl",
            "wb",
        ) as file:

            pickle.dump(
                self.metadata,
                file,
            )

        logger.info("Vector database saved.")

    def load(self) -> None:

        self.index = faiss.read_index(
            str(VECTOR_STORE_DIR / "faiss.index")
        )

        with open(
            VECTOR_STORE_DIR / "metadata.pkl",
            "rb",
        ) as file:

            self.metadata = pickle.load(file)

        logger.info(
            "Loaded %d vectors.",
            self.index.ntotal,
        )

    def total_vectors(self) -> int:

        if self.index is None:
            return 0

        return self.index.ntotal