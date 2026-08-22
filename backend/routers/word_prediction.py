"""
Word Prediction API Router

Connects the existing RAG Word Prediction pipeline
to the locked React frontend.
"""

from __future__ import annotations

import time

from fastapi import APIRouter, HTTPException

from backend.schemas.request_models import WordPredictionRequest
from backend.schemas.response_models import (
    PredictionAnalyticsModel,
    PredictionModel,
    RetrievedContextModel,
    WordPredictionResponse,
)

from src.features.word_predictor import WordPredictor
from config import EMBEDDING_MODEL_NAME, TOP_K_RESULTS


router = APIRouter(
    prefix="/word-predict",
    tags=["Word Prediction"],
)


# ---------------------------------------------------------
# Predictor
# ---------------------------------------------------------

predictor = WordPredictor()


# ---------------------------------------------------------
# Endpoint
# ---------------------------------------------------------

@router.post(
    "",
    response_model=WordPredictionResponse,
)
def predict_next_word(
    request: WordPredictionRequest,
) -> WordPredictionResponse:

    start_time = time.perf_counter()

    try:

        # =================================================
        # 1. Run existing Word Prediction pipeline
        # =================================================

        result = predictor.predict(
            user_input=request.text,
            top_k=TOP_K_RESULTS,
        )

        # =================================================
        # 2. Format predictions for existing frontend
        # =================================================

        predictions = [
            PredictionModel(
                word=item["word"],
                score=float(item["score"]),
                frequency=int(item["frequency"]),
                rank=int(item["rank"]),
            )
            for item in result.get("predictions", [])
        ]

        # =================================================
        # 3. Retrieve context
        #
        # The current WordPredictor returns predictions,
        # while the locked frontend also requires context.
        # =================================================

        retrieved_chunks = predictor.pipeline.retriever.retrieve(
            query=request.text,
            top_k=TOP_K_RESULTS,
        )

        context = []

        for chunk in retrieved_chunks:

            context.append(
                RetrievedContextModel(
                    title=chunk.get(
                        "file_name",
                        "Retrieved Document",
                    ),
                    content=chunk.get(
                        "text",
                        "",
                    ),
                    similarity=float(
                        chunk.get(
                            "score",
                            0.0,
                        )
                    ),
                    source=chunk.get(
                        "file_name",
                        "Unknown",
                    ),
                )
            )

        # =================================================
        # 4. Calculate retrieval time
        # =================================================

        elapsed_ms = int(
            (time.perf_counter() - start_time) * 1000
        )

        # =================================================
        # 5. Calculate candidate count
        # =================================================

        candidates = predictor.pipeline.extractor.extract(
            query=request.text,
            retrieved_chunks=retrieved_chunks,
        )

        candidate_count = len(candidates)

        # =================================================
        # 6. Calculate confidence
        # =================================================

        top_score = (
            predictions[0].score
            if predictions
            else 0.0
        )

        confidence = f"{round(top_score * 100)}%"

        # =================================================
        # 7. Format embedding model name
        # =================================================

        embedding_model = EMBEDDING_MODEL_NAME.split("/")[-1]

        # =================================================
        # 8. Build analytics for existing frontend
        # =================================================

        analytics = PredictionAnalyticsModel(
            embeddingModel=embedding_model,
            retrievalTime=f"{elapsed_ms} ms",
            predictionMethod="RAG + Regex",
            topKChunks=str(len(retrieved_chunks)),
            confidence=confidence,
            totalCandidates=str(candidate_count),
        )

        # =================================================
        # 9. Return exact frontend response structure
        # =================================================

        return WordPredictionResponse(
            query=result.get(
                "query",
                request.text,
            ),
            predictions=predictions,
            context=context,
            analytics=analytics,
            count=len(predictions),
        )

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        ) from exc