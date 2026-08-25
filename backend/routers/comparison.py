"""
Comparison Router

Provides the API endpoint for comparing two documents.

Each document can be supplied as:
- pasted text
- PDF
- TXT
- DOCX
"""

from fastapi import APIRouter, HTTPException, UploadFile, File, Form

from backend.schemas.request_models import ComparisonRequest
from src.pipeline.rag_pipeline import RAGPipeline
from src.ingestion.uploaded_document_loader import UploadedDocumentLoader


router = APIRouter(
    prefix="/compare",
    tags=["Comparison"],
)


# Create reusable services once.
rag_pipeline = RAGPipeline()
document_loader = UploadedDocumentLoader()


# =========================================================
# TEXT + TEXT
# =========================================================

@router.post("")
async def compare_documents(
    document_a: str | None = Form(default=None),
    document_b: str | None = Form(default=None),
    document_a_file: UploadFile | None = File(default=None),
    document_b_file: UploadFile | None = File(default=None),
):
    """
    Compare two documents.

    Each document may be provided either as:
    - pasted text
    - PDF
    - TXT
    - DOCX

    Mixed input is also supported.
    """

    try:
        # -------------------------------------------------
        # Validate Document A
        # -------------------------------------------------

        if document_a_file is not None:
            file_a_bytes = await document_a_file.read()

            if not file_a_bytes:
                raise ValueError(
                    "Document A file is empty."
                )

            document_a_file.file.seek(0)

            loaded_a = document_loader.load(
                file=document_a_file.file,
                file_name=document_a_file.filename,
                file_size=len(file_a_bytes),
            )

            content_a = loaded_a["content"]

        elif document_a and document_a.strip():
            content_a = document_a.strip()

        else:
            raise ValueError(
                "Please provide Document A."
            )

        # -------------------------------------------------
        # Validate Document B
        # -------------------------------------------------

        if document_b_file is not None:
            file_b_bytes = await document_b_file.read()

            if not file_b_bytes:
                raise ValueError(
                    "Document B file is empty."
                )

            document_b_file.file.seek(0)

            loaded_b = document_loader.load(
                file=document_b_file.file,
                file_name=document_b_file.filename,
                file_size=len(file_b_bytes),
            )

            content_b = loaded_b["content"]

        elif document_b and document_b.strip():
            content_b = document_b.strip()

        else:
            raise ValueError(
                "Please provide Document B."
            )

        # -------------------------------------------------
        # Validate extracted content
        # -------------------------------------------------

        if not content_a.strip():
            raise ValueError(
                "Document A contains no readable text."
            )

        if not content_b.strip():
            raise ValueError(
                "Document B contains no readable text."
            )

        # -------------------------------------------------
        # Compare documents
        # -------------------------------------------------

        result = rag_pipeline.compare(
            document_a=content_a,
            document_b=content_b,
        )

        # -------------------------------------------------
        # Add document metadata when files were uploaded
        # -------------------------------------------------

        result["documents"] = {
            "document_a": {
                "file_name": (
                    loaded_a["file_name"]
                    if document_a_file is not None
                    else None
                ),
                "file_type": (
                    loaded_a["file_type"]
                    if document_a_file is not None
                    else "TEXT"
                ),
                "file_size": (
                    loaded_a["file_size"]
                    if document_a_file is not None
                    else len(content_a.encode("utf-8"))
                ),
                "total_pages": (
                    loaded_a["total_pages"]
                    if document_a_file is not None
                    else 1
                ),
            },
            "document_b": {
                "file_name": (
                    loaded_b["file_name"]
                    if document_b_file is not None
                    else None
                ),
                "file_type": (
                    loaded_b["file_type"]
                    if document_b_file is not None
                    else "TEXT"
                ),
                "file_size": (
                    loaded_b["file_size"]
                    if document_b_file is not None
                    else len(content_b.encode("utf-8"))
                ),
                "total_pages": (
                    loaded_b["total_pages"]
                    if document_b_file is not None
                    else 1
                ),
            },
        }

        return result

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )