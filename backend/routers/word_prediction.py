"""
Word Prediction API Router

Exposes the Word Prediction feature through FastAPI.
"""

from fastapi import APIRouter, HTTPException

from backend.schemas.request_models import WordPredictionRequest
from backend.schemas.response_models import WordPredictionResponse
from src.features.word_predictor import WordPredictor

router = APIRouter(
    prefix="/word-predict",
    tags=["Word Prediction"],
)

predictor = WordPredictor()


@router.post(
    "",
    response_model=WordPredictionResponse,
)
def predict_next_word(request: WordPredictionRequest):
    """
    Predict the next words for the given input.
    """

    try:
        result = predictor.predict(
          user_input=request.text,
        )

        return WordPredictionResponse(
          query=result["query"],
          predictions=[
            prediction["word"]
            for prediction in result["predictions"]
          ],
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )