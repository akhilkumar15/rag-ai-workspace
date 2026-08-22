"""
FastAPI Application Entry Point

Initializes the FastAPI server, configures middleware,
and registers API routers.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.qa import router as qa_router
from backend.routers.summarization import router as summarization_router
from backend.routers.word_prediction import router as word_prediction_router


app = FastAPI(
    title="RAG AI Workspace API",
    description="REST API for Word Prediction, QA, Summarization and Document Comparison",
    version="1.1.0",
)


# ---------------------------------------------------
# CORS Configuration
# ---------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------
# Register Routers
# ---------------------------------------------------

app.include_router(word_prediction_router)
app.include_router(qa_router)
app.include_router(summarization_router)


# ---------------------------------------------------
# Health Check
# ---------------------------------------------------

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to RAG AI Workspace API",
        "status": "running",
    }


@app.get("/health", tags=["Health"])
def health():
    return {
        "status": "healthy",
    }