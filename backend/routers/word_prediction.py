"""
Word Prediction API Router

Connects the existing RAG Word Prediction pipeline
to the locked React frontend.

Also provides document upload functionality so a
user-uploaded PDF can become the active in-memory
retrieval context for Word Prediction.
"""

from __future__ import annotations

import time

from fastapi import (
    APIRouter,
    File,
    HTTPException,
    UploadFile,
)

from backend.schemas.request_models import WordPredictionRequest
from backend.schemas.response_models import (
    PredictionAnalyticsModel,
    PredictionModel,
    RetrievedContextModel,
    WordPredictionResponse,
)

from src.features.word_predictor import WordPredictor
from src.ingestion.uploaded_document_loader import UploadedDocumentLoader
from src.ingestion.preprocessor import TextPreprocessor
from src.ingestion.chunker import TextChunker
from src.embeddings.embedding_generator import EmbeddingGenerator

from config import (
    EMBEDDING_MODEL_NAME,
    TOP_K_RESULTS,
)


router = APIRouter(
    prefix="/word-predict",
    tags=["Word Prediction"],
)


# =========================================================
# SERVICES
# =========================================================

predictor = WordPredictor()

document_loader = UploadedDocumentLoader()

preprocessor = TextPreprocessor()

chunker = TextChunker()

embedding_generator = EmbeddingGenerator()


# =========================================================
# DOCUMENT UPLOAD
# =========================================================

@router.post("/upload-document")
async def upload_prediction_document(
    file: UploadFile = File(...),
):
    """
    Upload a PDF and make it the active in-memory
    retrieval context for Word Prediction.

    The existing persistent Wikipedia FAISS index
    is never modified.
    """

    try:

        # =================================================
        # 1. Validate file
        # =================================================

        if not file.filename:
            raise ValueError(
                "Please select a PDF file."
            )

        if not file.filename.lower().endswith(".pdf"):
            raise ValueError(
                "Only PDF files are supported."
            )

        file_bytes = await file.read()

        if not file_bytes:
            raise ValueError(
                "The uploaded PDF is empty."
            )

        # 50 MB maximum file size.

        max_file_size = 50 * 1024 * 1024

        if len(file_bytes) > max_file_size:
            raise ValueError(
                "Maximum file size is 50MB."
            )

        # Reset file position after reading bytes.

        file.file.seek(0)


        # =================================================
        # 2. Extract PDF text
        # =================================================

        loaded_document = document_loader.load(
            file=file.file,
            file_name=file.filename,
            file_size=len(file_bytes),
        )

        content = loaded_document.get(
            "content",
            "",
        )

        if not content or not content.strip():
            raise ValueError(
                "The PDF contains no readable text."
            )


        # =================================================
        # 3. Preprocess document
        # =================================================

        processed_documents = (
            preprocessor.preprocess_documents(
                [loaded_document]
            )
        )

        processed_document = processed_documents[0]


        # =================================================
        # 4. Tokenize document
        # =================================================

        processed_document["tokens"] = (
            processed_document["content"].split()
        )


        # =================================================
        # 5. Create chunks
        # =================================================

        chunks = chunker.chunk_documents(
            [processed_document]
        )

        if not chunks:
            raise ValueError(
                "Unable to create chunks from the PDF."
            )


        # =================================================
        # 6. Create unique uploaded-document IDs
        # =================================================

        for index, chunk in enumerate(chunks):

            chunk["source_id"] = (
                f"uploaded:{file.filename}:{index}"
            )


        # =================================================
        # 7. Generate embeddings
        # =================================================

        embedded_chunks = (
            embedding_generator.generate_embeddings(
                chunks
            )
        )

        if not embedded_chunks:
            raise ValueError(
                "Unable to generate document embeddings."
            )


        # =================================================
        # 8. Activate uploaded document
        # =================================================

        predictor.pipeline.retriever.set_uploaded_document(
            embedded_chunks
        )


        # =================================================
        # 9. Return upload information
        # =================================================

        return {
            "success": True,

            "file_name": loaded_document[
                "file_name"
            ],

            "file_type": loaded_document[
                "file_type"
            ],

            "file_size": loaded_document[
                "file_size"
            ],

            "total_pages": loaded_document[
                "total_pages"
            ],

            "chunks": len(
                embedded_chunks
            ),

            "message": (
                "Document uploaded successfully "
                "and is now active for word prediction."
            ),
        }


    except ValueError as exc:

        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )


    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        ) from exc


# =========================================================
# WORD PREDICTION
# =========================================================

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
        # 2. Format predictions for frontend
        # =================================================

        predictions = [

            PredictionModel(
                word=item["word"],

                score=float(
                    item["score"]
                ),

                frequency=int(
                    item["frequency"]
                ),

                rank=int(
                    item["rank"]
                ),
            )

            for item in result.get(
                "predictions",
                [],
            )
        ]


        # =================================================
        # 3. Retrieve context
        #
        # The retriever now searches:
        #
        #   - persistent Wikipedia FAISS
        #   - active uploaded document
        #
        # =================================================

        retrieved_chunks = (
            predictor.pipeline.retriever.retrieve(
                query=request.text,
                top_k=TOP_K_RESULTS,
            )
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
            (
                time.perf_counter()
                - start_time
            )
            * 1000
        )


        # =================================================
        # 5. Calculate candidate count
        # =================================================

        candidates = (
            predictor.pipeline.extractor.extract(
                query=request.text,
                retrieved_chunks=retrieved_chunks,
            )
        )

        candidate_count = len(
            candidates
        )


        # =================================================
        # 6. Calculate confidence
        # =================================================

        top_score = (

            predictions[0].score

            if predictions

            else 0.0
        )

        confidence = (
            f"{round(top_score * 100)}%"
        )


        # =================================================
        # 7. Format embedding model name
        # =================================================

        embedding_model = (
            EMBEDDING_MODEL_NAME.split("/")[-1]
        )


        # =================================================
        # 8. Build analytics
        # =================================================

        analytics = PredictionAnalyticsModel(

            embeddingModel=embedding_model,

            retrievalTime=(
                f"{elapsed_ms} ms"
            ),

            predictionMethod="RAG + Regex",

            topKChunks=str(
                len(retrieved_chunks)
            ),

            confidence=confidence,

            totalCandidates=str(
                candidate_count
            ),
        )


        # =================================================
        # 9. Return frontend response
        # =================================================

        return WordPredictionResponse(

            query=result.get(
                "query",
                request.text,
            ),

            predictions=predictions,

            context=context,

            analytics=analytics,

            count=len(
                predictions
            ),
        )


    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        ) from exc