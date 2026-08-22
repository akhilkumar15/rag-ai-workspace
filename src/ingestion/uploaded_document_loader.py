"""
Uploaded Document Loader

Extracts text and metadata from documents uploaded
through the Summarization API.
"""

from __future__ import annotations

from pathlib import Path
from typing import BinaryIO, Dict

from docx import Document
from pypdf import PdfReader


class UploadedDocumentLoader:
    """
    Loads supported uploaded documents.

    Supported formats:
    - PDF
    - TXT
    - DOCX
    """

    SUPPORTED_EXTENSIONS = {
        ".pdf",
        ".txt",
        ".docx",
    }

    def load(
        self,
        file: BinaryIO,
        file_name: str,
        file_size: int,
    ) -> Dict:
        """
        Extract text and metadata from an uploaded document.
        """

        extension = Path(file_name).suffix.lower()

        if extension not in self.SUPPORTED_EXTENSIONS:
            raise ValueError(
                "Unsupported file type. "
                "Only PDF, TXT and DOCX files are supported."
            )

        if extension == ".pdf":
            return self._load_pdf(
                file=file,
                file_name=file_name,
                file_size=file_size,
            )

        if extension == ".txt":
            return self._load_txt(
                file=file,
                file_name=file_name,
                file_size=file_size,
            )

        if extension == ".docx":
            return self._load_docx(
                file=file,
                file_name=file_name,
                file_size=file_size,
            )

        raise ValueError("Unsupported file type.")

    # =========================================================
    # PDF
    # =========================================================

    def _load_pdf(
        self,
        file: BinaryIO,
        file_name: str,
        file_size: int,
    ) -> Dict:

        reader = PdfReader(file)

        pages = []

        for page in reader.pages:

            text = page.extract_text()

            if text:
                pages.append(text)

        content = "\n".join(pages)

        return {
            "file_name": file_name,
            "file_path": file_name,
            "file_type": "PDF",
            "file_size": file_size,
            "total_pages": len(reader.pages),
            "content": content,
        }

    # =========================================================
    # TXT
    # =========================================================

    def _load_txt(
        self,
        file: BinaryIO,
        file_name: str,
        file_size: int,
    ) -> Dict:

        content = file.read().decode(
            "utf-8",
            errors="ignore",
        )

        return {
            "file_name": file_name,
            "file_path": file_name,
            "file_type": "TXT",
            "file_size": file_size,
            "total_pages": 1,
            "content": content,
        }

    # =========================================================
    # DOCX
    # =========================================================

    def _load_docx(
        self,
        file: BinaryIO,
        file_name: str,
        file_size: int,
    ) -> Dict:

        document = Document(file)

        paragraphs = []

        for paragraph in document.paragraphs:

            text = paragraph.text.strip()

            if text:
                paragraphs.append(text)

        content = "\n".join(paragraphs)

        return {
            "file_name": file_name,
            "file_path": file_name,
            "file_type": "DOCX",
            "file_size": file_size,
            "total_pages": 1,
            "content": content,
        }