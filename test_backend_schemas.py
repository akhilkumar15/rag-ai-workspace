from backend.schemas.request_models import (
    WordPredictionRequest,
    QARequest,
)

from backend.schemas.response_models import (
    WordPredictionResponse,
)

req = WordPredictionRequest(text="Artificial Intelligence")

qa = QARequest(question="What is AI?")

res = WordPredictionResponse(
    predictions=["is", "can", "will"]
)

assert req.text == "Artificial Intelligence"
assert qa.question == "What is AI?"
assert res.predictions == ["is", "can", "will"]

print("✓ Schema models validated.")