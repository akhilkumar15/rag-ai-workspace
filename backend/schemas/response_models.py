"""
Response Models
"""

from typing import List

from pydantic import BaseModel


# =========================================================
# SHARED SOURCE
# =========================================================

class SourceModel(BaseModel):
    file_name: str
    chunk_id: int
    score: float


# =========================================================
# WORD PREDICTION
# =========================================================

class PredictionModel(BaseModel):
    word: str
    score: float
    frequency: int
    rank: int


class RetrievedContextModel(BaseModel):
    title: str
    content: str
    similarity: float
    source: str


class PredictionAnalyticsModel(BaseModel):
    embeddingModel: str
    retrievalTime: str
    predictionMethod: str
    topKChunks: str
    confidence: str
    totalCandidates: str


class WordPredictionResponse(BaseModel):
    query: str
    predictions: List[PredictionModel]
    context: List[RetrievedContextModel]
    analytics: PredictionAnalyticsModel
    count: int


# =========================================================
# QUESTION ANSWERING
# =========================================================

class QASourceChunkModel(BaseModel):
    title: str
    content: str
    similarity: float
    source: str


class QAAnalyticsModel(BaseModel):
    embeddingModel: str
    retrievalTime: str
    llmModel: str
    responseTime: str
    confidence: str
    tokensUsed: int
    sourcesUsed: str


class QAResponse(BaseModel):
    query: str
    response: str

    sources: List[SourceModel]

    retrieved_chunks: int

    top_source: QASourceChunkModel | None = None

    analytics: QAAnalyticsModel

# =========================================================
# SUMMARIZATION
# =========================================================

class SummaryAnalyticsModel(BaseModel):
    embeddingModel: str
    processingTime: str
    llmModel: str
    summaryLength: str
    confidence: str
    tokensUsed: int
    chunksUsed: int


class SummaryResponse(BaseModel):
    query: str
    response: str

    sources: List[SourceModel]

    retrieved_chunks: int

    document: dict

    analytics: SummaryAnalyticsModel
