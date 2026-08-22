"""
Question Answering API Router

Connects the existing RAG QA pipeline
to the locked React Question Answering frontend.
"""

from __future__ import annotations

import time

from fastapi import APIRouter, HTTPException

from backend.schemas.request_models import QARequest

from backend.schemas.response_models import (
    QAAnalyticsModel,
    QAResponse,
    QASourceChunkModel,
)

from config import (
    TOP_K_RESULTS,
    EMBEDDING_MODEL_NAME,
    LLM_MODEL_NAME,
)

from src.features.qa_engine import QAEngine


router = APIRouter(
    prefix="/qa",
    tags=["Question Answering"],
)


# =========================================================
# QA ENGINE
# =========================================================

qa_engine = QAEngine()


# =========================================================
# ENDPOINT
# =========================================================

@router.post(
    "",
    response_model=QAResponse,
)
def answer_question(
    request: QARequest,
) -> QAResponse:

    start_time = time.perf_counter()

    try:

        # =====================================================
        # 1. RUN QA PIPELINE
        # =====================================================

        result = qa_engine.answer(
            question=request.question,
            top_k=TOP_K_RESULTS,
        )

        # =====================================================
        # 2. EXTRACT BASIC RESPONSE
        # =====================================================

        response_text = result.get(
            "response",
            "",
        )

        sources = result.get(
            "sources",
            [],
        )

        retrieved_chunks = result.get(
            "retrieved_chunks",
            0,
        )

        # =====================================================
        # 3. RETRIEVE ACTUAL CHUNKS
        #
        # Needed because the locked frontend displays
        # the actual content of the top retrieved chunk.
        # =====================================================

        retrieved = qa_engine.pipeline.retriever.retrieve(
            query=request.question,
            top_k=TOP_K_RESULTS,
        )

        # =====================================================
        # 4. BUILD SOURCE LIST
        # =====================================================

        formatted_sources = []

        for chunk in retrieved:

            formatted_sources.append(
                {
                    "file_name": chunk.get(
                        "file_name",
                        "Unknown",
                    ),

                    "chunk_id": int(
                        chunk.get(
                            "chunk_id",
                            0,
                        )
                    ),

                    "score": float(
                        chunk.get(
                            "score",
                            0.0,
                        )
                    ),
                }
            )

        # =====================================================
        # 5. BUILD TOP SOURCE CHUNK
        # =====================================================

        top_source = None

        if retrieved:

            top_chunk = retrieved[0]

            top_source = QASourceChunkModel(
                title=top_chunk.get(
                    "file_name",
                    "Retrieved Document",
                ),

                content=top_chunk.get(
                    "text",
                    "",
                ),

                similarity=float(
                    top_chunk.get(
                        "score",
                        0.0,
                    )
                ),

                source=top_chunk.get(
                    "file_name",
                    "Unknown",
                ),
            )

        # =====================================================
        # 6. LLM METADATA
        # =====================================================

        llm_metadata = result.get(
            "llm_metadata",
            {},
        )

        llm_model = llm_metadata.get(
            "model",
            LLM_MODEL_NAME,
        )

        # =====================================================
        # 7. RESPONSE TIME
        # =====================================================

        total_time_ms = int(
            (
                time.perf_counter()
                - start_time
            ) * 1000
        )

        # =====================================================
        # 8. RETRIEVAL TIME
        #
        # Ollama metadata contains generation timing.
        # The total API time is used here as the backend
        # response timing until dedicated retrieval timing
        # is exposed by the pipeline.
        # =====================================================

        retrieval_time = total_time_ms

        # =====================================================
        # 9. TOKEN COUNT
        # =====================================================

        prompt_tokens = int(
            llm_metadata.get(
                "prompt_eval_count",
                0,
            )
        )

        response_tokens = int(
            llm_metadata.get(
                "eval_count",
                0,
            )
        )

        tokens_used = (
            prompt_tokens
            + response_tokens
        )

        # =====================================================
        # 10. CONFIDENCE
        #
        # Top retrieved similarity is used as the current
        # retrieval-based confidence indicator.
        # =====================================================

        confidence_score = (
            retrieved[0].get(
                "score",
                0.0,
            )
            if retrieved
            else 0.0
        )

        confidence = f"{round(confidence_score * 100)}%"

        # =====================================================
        # 11. EMBEDDING MODEL
        # =====================================================

        embedding_model = (
            EMBEDDING_MODEL_NAME.split("/")[-1]
        )

        # =====================================================
        # 12. SOURCES USED
        # =====================================================

        sources_used = (
            f"1 / {len(retrieved)}"
            if retrieved
            else "0 / 0"
        )

        # =====================================================
        # 13. QA ANALYTICS
        # =====================================================

        analytics = QAAnalyticsModel(
            embeddingModel=embedding_model,

            retrievalTime=f"{retrieval_time} ms",

            llmModel=llm_model,

            responseTime=f"{total_time_ms / 1000:.2f} s",

            confidence=confidence,

            tokensUsed=tokens_used,

            sourcesUsed=sources_used,
        )

        # =====================================================
        # 14. FINAL RESPONSE
        # =====================================================

        return QAResponse(
            query=result.get(
                "query",
                request.question,
            ),

            response=response_text,

            sources=formatted_sources,

            retrieved_chunks=retrieved_chunks,

            top_source=top_source,

            analytics=analytics,
        )

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        ) from exc