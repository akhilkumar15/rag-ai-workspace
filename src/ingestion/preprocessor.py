"""
Text preprocessing module for the RAG AI Workspace.
"""

from __future__ import annotations

import logging
import re
from typing import List

logger = logging.getLogger(__name__)


class TextPreprocessor:
    """
    Cleans raw text before tokenization.
    """

    def __init__(
        self,
        lowercase: bool = True,
        remove_extra_spaces: bool = True,
        remove_empty_lines: bool = True,
    ) -> None:
        self.lowercase = lowercase
        self.remove_extra_spaces = remove_extra_spaces
        self.remove_empty_lines = remove_empty_lines

    def preprocess(self, text: str) -> str:
        """
        Clean a single text document.
        """
        if not isinstance(text, str):
            raise TypeError("Input must be a string.")

        logger.info("Preprocessing text.")

        if self.lowercase:
            text = text.lower()

        text = text.replace("\r\n", "\n")
        text = text.replace("\r", "\n")
        text = text.replace("\t", " ")

        if self.remove_extra_spaces:
            text = re.sub(r"[ ]+", " ", text)

        if self.remove_empty_lines:
            text = re.sub(r"\n\s*\n+", "\n", text)

        text = text.strip()

        logger.info("Preprocessing completed.")

        return text

    def preprocess_documents(self, documents: List[dict]) -> List[dict]:
        """
        Preprocess all loaded documents.
        """
        processed_documents = []

        for document in documents:
            processed_documents.append(
                {
                    **document,
                    "content": self.preprocess(document["content"])
                    if isinstance(document["content"], str)
                    else document["content"],
                }
            )

        logger.info(
            "Processed %d document(s).",
            len(processed_documents),
        )

        return processed_documents