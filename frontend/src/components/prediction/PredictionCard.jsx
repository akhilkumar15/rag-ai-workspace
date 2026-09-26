

function PredictionCard({
  prediction,
  index,
  onSelect,
}) {
  const score = Number(prediction?.score);

  return (
    <button
      type="button"
      className="prediction-card"
      onClick={() => onSelect?.(prediction?.word)}
    >
      {/* Rank */}

      <span className="prediction-card-badge">
        {prediction?.rank ?? index + 1}
      </span>


      {/* Predicted Word */}

      <span className="prediction-card-word">
        {prediction?.word ?? ""}
      </span>


      {/* Confidence Score */}

      <span className="prediction-card-score">
        {Number.isFinite(score)
          ? score.toFixed(2)
          : "0.00"}
      </span>
    </button>
  );
}

export default PredictionCard;