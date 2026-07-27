"""
Request Models
"""

from pydantic import BaseModel, Field


class WordPredictionRequest(BaseModel):
    text: str = Field(..., min_length=1)


class QARequest(BaseModel):
    question: str = Field(..., min_length=1)


class SummarizationRequest(BaseModel):
    text: str = Field(..., min_length=1)


class ComparisonRequest(BaseModel):
    document_a: str = Field(..., min_length=1)
    document_b: str = Field(..., min_length=1)