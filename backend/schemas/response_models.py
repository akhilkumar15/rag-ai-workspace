"""
Response Models
"""

from typing import List
from pydantic import BaseModel


class SourceModel(BaseModel):
    file_name: str
    chunk_id: int
    score: float


class WordPredictionResponse(BaseModel):
    query: str
    predictions: List[str]


class QAResponse(BaseModel):
    query: str
    response: str
    sources: List[SourceModel]
    retrieved_chunks: int


class SummaryResponse(BaseModel):
    query: str
    response: str
    sources: List[SourceModel]
    retrieved_chunks: int


class ComparisonResponse(BaseModel):
    response: str


class HealthResponse(BaseModel):
    status: str