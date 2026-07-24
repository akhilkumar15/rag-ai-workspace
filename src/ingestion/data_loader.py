"""
Data Loader Module for RAG AI Workspace.
"""

from __future__ import annotations

import logging
from pathlib import Path
from typing import List

import pandas as pd

from config import (
    DEFAULT_DATA_DIRECTORY,
    SUPPORTED_EXTENSIONS,
)

logger = logging.getLogger(__name__)


class DataLoader:
    """
    Loads supported documents from the configured data directory.
    """

    def __init__(self, data_directory: Path = DEFAULT_DATA_DIRECTORY) -> None:
        self.data_directory = data_directory

    def get_supported_files(self) -> List[Path]:
        """
        Return all supported files from the data directory.
        """
        files: List[Path] = []

        for extension in SUPPORTED_EXTENSIONS:
            files.extend(self.data_directory.glob(f"*{extension}"))

        files.sort()

        logger.info("Found %d supported file(s).", len(files))

        return files

    def load_csv(self, file_path: Path) -> pd.DataFrame:
        """
        Load a CSV file.
        """
        logger.info("Loading CSV: %s", file_path)

        return pd.read_csv(file_path)

    def load_txt(self, file_path: Path) -> str:
        """
        Load a TXT file.
        """
        logger.info("Loading TXT: %s", file_path)

        return file_path.read_text(
            encoding="utf-8",
            errors="ignore",
        )

    def load_pdf(self, file_path: Path) -> str:
        """
        Load a PDF file.
        """
        from pypdf import PdfReader

        logger.info("Loading PDF: %s", file_path)

        reader = PdfReader(file_path)

        text = []

        for page in reader.pages:
            extracted = page.extract_text()

            if extracted:
                text.append(extracted)

        return "\n".join(text)

    def load_file(self, file_path: Path):
        """
        Load a single supported file.
        """
        suffix = file_path.suffix.lower()

        if suffix == ".csv":
            return self.load_csv(file_path)

        if suffix == ".txt":
            return self.load_txt(file_path)

        if suffix == ".pdf":
            return self.load_pdf(file_path)

        raise ValueError(f"Unsupported file type: {suffix}")

    def load_all(self) -> list:
        """
        Load every supported file from the configured directory.
        """
        loaded_documents = []

        for file_path in self.get_supported_files():
            loaded_documents.append(
                {
                    "file_name": file_path.name,
                    "file_path": str(file_path),
                    "content": self.load_file(file_path),
                }
            )

        logger.info(
            "Loaded %d document(s).",
            len(loaded_documents),
        )

        return loaded_documents