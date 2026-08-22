"""
Summarization API Router

Handles document uploads and generates AI summaries
for the locked React Summarization frontend.
"""

from __future__ import annotations

import time
from datetime import datetime

from fastapi import APIRouter, File, HTTPException, UploadFile

from backend.schemas.response_models import (
    SummaryAnalyticsModel,
    SummaryResponse,
)

from config import (
    EMBEDDING_MODEL_NAME,
    LLM_MODEL_NAME,
    CHUNK_SIZE,
    CHUNK_OVERLAP,
)

from src.features.summarizer import Summarizer
from src.ingestion.uploaded_document_loader import (
    UploadedDocumentLoader,
)
from src.ingestion.preprocessor import TextPreprocessor
from src.ingestion.tokenizer import Tokenizer
from src.ingestion.chunker import TextChunker


router = APIRouter(
    prefix="/summarize",
    tags=["Summarization"],
)


# ---------------------------------------------------------
# Components
# ---------------------------------------------------------

summarizer = Summarizer()

document_loader = UploadedDocumentLoader()
preprocessor = TextPreprocessor()
tokenizer = Tokenizer()

chunker = TextChunker(
    chunk_size=CHUNK_SIZE,
    chunk_overlap=CHUNK_OVERLAP,
)


# ---------------------------------------------------------
# Configuration
# ---------------------------------------------------------

MAX_FILE_SIZE = 50 * 1024 * 1024

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".txt",
    ".docx",
}


# ---------------------------------------------------------
# Endpoint
# ---------------------------------------------------------

@router.post(
    "",
    response_model=SummaryResponse,
)
async def summarize_document(
    file: UploadFile = File(...),
) -> SummaryResponse:

    start_time = time.perf_counter()

    try:

        # =================================================
        # 1. Validate filename
        # =================================================

        if not file.filename:
            raise HTTPException(
                status_code=400,
                detail="A file is required.",
            )

        file_name = file.filename

        extension = "." + file_name.rsplit(
            ".",
            1,
        )[-1].lower() if "." in file_name else ""

        if extension not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=(
                    "Unsupported file type. "
                    "Only PDF, TXT and DOCX files are supported."
                ),
            )

        # =================================================
        # 2. Read uploaded file
        # =================================================

        file_bytes = await file.read()

        file_size = len(file_bytes)

        if file_size == 0:
            raise HTTPException(
                status_code=400,
                detail="The uploaded file is empty.",
            )

        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail="File size exceeds the 50 MB limit.",
            )

        # =================================================
        # 3. Extract document text
        # =================================================

        from io import BytesIO

        uploaded_document = document_loader.load(
            file=BytesIO(file_bytes),
            file_name=file_name,
            file_size=file_size,
        )

        content = uploaded_document.get(
            "content",
            "",
        )

        if not content.strip():
            raise HTTPException(
                status_code=400,
                detail="No readable text was found in the document.",
            )

        # =================================================
        # 4. Preprocess
        # =================================================

        processed_document = preprocessor.preprocess_documents(
            [
                uploaded_document
            ]
        )[0]

        # =================================================
        # 5. Tokenize
        # =================================================

        tokenized_document = tokenizer.tokenize_documents(
            [
                processed_document
            ]
        )[0]

        # =================================================
        # 6. Chunk
        # =================================================

        chunks = chunker.chunk_documents(
            [
                tokenized_document
            ]
        )

        if not chunks:
            raise HTTPException(
                status_code=400,
                detail="Unable to create document chunks.",
            )

        # =================================================
        # 7. Summarize uploaded document
        # =================================================

        result = summarizer.summarize_uploaded_document(
            chunks=chunks,
        )

        summary_text = result.get(
            "response",
            "",
        )

        # =================================================
        # 8. Calculate summary statistics
        # =================================================

        summary_words = len(
            summary_text.split()
        )

        summary_sentences = sum(
            summary_text.count(mark)
            for mark in [".", "!", "?"]
        )

        # =================================================
        # 9. Retrieve LLM metadata
        # =================================================

        llm_metadata = result.get(
            "llm_metadata",
            {},
        )

        tokens_used = int(
            llm_metadata.get(
                "eval_count",
                0,
            )
        )

        # =================================================
        # 10. Confidence
        #
        # This is currently based on successful generation.
        # It is not a semantic correctness score.
        # =================================================

        confidence = "100%" if summary_text else "0%"

        # =================================================
        # 11. Timing
        # =================================================

        elapsed_ms = int(
            (time.perf_counter() - start_time) * 1000
        )

        # =================================================
        # 12. Document metadata
        # =================================================

        uploaded_on = datetime.now().strftime(
            "%d %b %Y, %I:%M %p"
        )

        document = {
            "file_name": uploaded_document["file_name"],
            "file_type": uploaded_document["file_type"],
            "file_size": uploaded_document["file_size"],
            "total_pages": uploaded_document["total_pages"],
            "uploaded_on": uploaded_on,
            "chunks": len(chunks),
            "words": len(
                content.split()
            ),
        }

        # =================================================
        # 13. Analytics
        # =================================================

        analytics = SummaryAnalyticsModel(
            embeddingModel=EMBEDDING_MODEL_NAME.split("/")[-1],
            processingTime=f"{elapsed_ms / 1000:.2f} s",
            llmModel=LLM_MODEL_NAME,
            summaryLength=f"{summary_words} words",
            confidence=confidence,
            tokensUsed=tokens_used,
            chunksUsed=len(chunks),
        )

        # =================================================
        # 14. Sources
        #
        # Uploaded-document chunks are temporary and are
        # not added to FAISS.
        # =================================================

        sources = [
            {
                "file_name": file_name,
                "chunk_id": chunk["chunk_id"],
                "score": 1.0,
            }
            for chunk in chunks
        ]

        # =================================================
        # 15. Final response
        # =================================================

        return SummaryResponse(
            query=file_name,
            response=summary_text,
            sources=sources,
            retrieved_chunks=len(chunks),
            document=document,
            analytics=analytics,
        )

    except HTTPException:
        raise

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        ) from exc