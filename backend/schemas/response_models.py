"""
Response Models
"""

from typing import List
from pydantic import BaseModel


class SourceModel(BaseModel):
    file_name: str
    chunk_id: int
    score: float


# ---------------------------------------------------------
# Word Prediction Models
# ---------------------------------------------------------

class PredictionModel(BaseModel):
    word: str
    score: float
    frequency: int
    rank: int


class WordPredictionResponse(BaseModel):
    query: str
    predictions: List[PredictionModel]
    count: int


# ---------------------------------------------------------
# QA Models
# ---------------------------------------------------------

class QAResponse(BaseModel):
    query: str
    response: str
    sources: List[SourceModel]
    retrieved_chunks: int


# ---------------------------------------------------------
# Summary Models
# ---------------------------------------------------------

class SummaryResponse(BaseModel):
    query: str
    response: str
    sources: List[SourceModel]
    retrieved_chunks: int


# ---------------------------------------------------------
# Comparison Models
# ---------------------------------------------------------

class ComparisonResponse(BaseModel):
    response: str


# ---------------------------------------------------------
# Health Models
# ---------------------------------------------------------

class HealthResponse(BaseModel):
    status: str