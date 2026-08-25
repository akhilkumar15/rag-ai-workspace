import { Hash } from "lucide-react";

function PredictionCard({
  prediction,
  index,
  onSelect,
}) {
  return (
    <button
      type="button"
      className="prediction-card"
      onClick={() => onSelect(prediction.word)}
    >
      <span className="prediction-card-badge">
        {index + 1}
      </span>

      <span className="prediction-card-word">
        {prediction.word}
      </span>

      <span className="prediction-card-score">
        {prediction.score}
      </span>
    </button>
  );
}

export default PredictionCard;