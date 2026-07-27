"""
Data Loader Module for RAG AI Workspace.
"""

from __future__ import annotations

import logging
import re
from pathlib import Path
from typing import List

import pandas as pd

from config import (
    DEFAULT_DATA_DIRECTORY,
    SUPPORTED_EXTENSIONS,
)

logger = logging.getLogger(__name__)

# =============================================================================
# Development Configuration
# =============================================================================

# None = Load all articles
MAX_ARTICLES = 20000


class DataLoader:
    """
    Loads supported documents from the configured data directory.
    """

    def __init__(self, data_directory: Path = DEFAULT_DATA_DIRECTORY) -> None:
        self.data_directory = data_directory

    def get_supported_files(self) -> List[Path]:
        """
        Return supported files.
        """

        files: List[Path] = []

        for extension in SUPPORTED_EXTENSIONS:
            files.extend(
                self.data_directory.rglob(f"*{extension}")
            )

        files.extend(
            sorted(self.data_directory.rglob("wiki_*"))
        )

        files.sort()

        logger.info("Found %d supported file(s).", len(files))

        return files

    def split_wikipedia_articles(self, text: str) -> List[dict]:
        """
        Split a Wikipedia dump into individual articles.

        Each article begins with a title followed by a blank line.
        """

        text = text.replace("\r\n", "\n")

        pattern = re.compile(
            r"\n{3,}"
        )

        raw_articles = pattern.split(text)

        articles = []

        for article in raw_articles:

            article = article.strip()

            if not article:
                continue

            lines = article.split("\n")

            if len(lines) < 2:
                continue

            title = lines[0].strip()

            content = "\n".join(lines[1:]).strip()

            if len(content) < 100:
                continue

            articles.append(
                {
                    "title": title,
                    "content": content,
                }
            )

        return articles

    def load_csv(self, file_path: Path) -> pd.DataFrame:

        logger.info("Loading CSV: %s", file_path)

        return pd.read_csv(file_path)

    def load_txt(self, file_path: Path) -> str:

        logger.info("Loading TXT: %s", file_path)

        return file_path.read_text(
            encoding="utf-8",
            errors="ignore",
        )

    def load_pdf(self, file_path: Path) -> str:

        from pypdf import PdfReader

        logger.info("Loading PDF: %s", file_path)

        reader = PdfReader(file_path)

        pages = []

        for page in reader.pages:

            extracted = page.extract_text()

            if extracted:
                pages.append(extracted)

        return "\n".join(pages)

    def load_all(self) -> list:

        loaded_documents = []

        article_count = 0

        for file_path in self.get_supported_files():

            # Wikipedia files
            if file_path.name.startswith("wiki_"):

                text = self.load_txt(file_path)

                articles = self.split_wikipedia_articles(text)

                for article in articles:

                    loaded_documents.append(
                        {
                            "file_name": article["title"],
                            "file_path": str(file_path),
                            "content": article["content"],
                        }
                    )

                    article_count += 1

                    if (
                        MAX_ARTICLES is not None
                        and article_count >= MAX_ARTICLES
                    ):
                        logger.info(
                            "Loaded %d Wikipedia articles.",
                            article_count,
                        )
                        return loaded_documents

                continue

            suffix = file_path.suffix.lower()

            if suffix == ".csv":
                content = self.load_csv(file_path)

            elif suffix == ".txt":
                content = self.load_txt(file_path)

            elif suffix == ".pdf":
                content = self.load_pdf(file_path)

            else:
                continue

            loaded_documents.append(
                {
                    "file_name": file_path.name,
                    "file_path": str(file_path),
                    "content": content,
                }
            )

        logger.info(
            "Loaded %d document(s).",
            len(loaded_documents),
        )

        return loaded_documents