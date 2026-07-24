"""
Tokenization module for the RAG AI Workspace.
"""

from __future__ import annotations

import logging
import re
from typing import List

logger = logging.getLogger(__name__)


class Tokenizer:
    """
    Tokenizes preprocessed text into words.
    """

    def __init__(self) -> None:
        self.pattern = re.compile(r"\b\w+\b")

    def tokenize(self, text: str) -> List[str]:
        """
        Tokenize a single text document.
        """
        if not isinstance(text, str):
            raise TypeError("Input must be a string.")

        logger.info("Tokenizing document.")

        tokens = self.pattern.findall(text)

        logger.info("Generated %d tokens.", len(tokens))

        return tokens

    def tokenize_documents(self, documents: List[dict]) -> List[dict]:
        """
        Tokenize all documents.
        """
        tokenized_documents = []

        for document in documents:
            tokenized_documents.append(
                {
                    **document,
                    "tokens": self.tokenize(document["content"])
                    if isinstance(document["content"], str)
                    else [],
                }
            )

        logger.info(
            "Tokenized %d document(s).",
            len(tokenized_documents),
        )

        return tokenized_documents