import { Lightbulb } from "lucide-react";

function PredictionGrid({
  predictions = [],
  onSelectPrediction,
}) {
  const visiblePredictions = predictions.slice(0, 5);

  return (
    <section className="prediction-grid-section">

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="prediction-grid-header">
        <h2>Predicted Next Words</h2>

        <span>
          (Top {visiblePredictions.length})
        </span>
      </div>


      {/* =====================================================
          PREDICTION CARDS
      ===================================================== */}

      {visiblePredictions.length > 0 ? (

        <div className="prediction-cards">

          {visiblePredictions.map((prediction, index) => {

            const rank = prediction.rank ?? index + 1;
            const score = Number(prediction.score);

            return (
              <button
                key={`${prediction.word}-${index}`}
                type="button"
                className="prediction-card"
                onClick={() =>
                  onSelectPrediction?.(prediction.word)
                }
              >

                {/* Rank */}

                <div className="prediction-card-badge">
                  {rank}
                </div>


                {/* Predicted Word */}

                <div className="prediction-card-word">
                  {prediction.word}
                </div>


                {/* Confidence Score */}

                <div className="prediction-card-score">
                  {Number.isFinite(score)
                    ? score.toFixed(2)
                    : "0.00"}
                </div>

              </button>
            );
          })}

        </div>

      ) : (

        <div className="prediction-empty">
          No predictions available.
        </div>

      )}


      {/* =====================================================
          FOOTER TIP
      ===================================================== */}

      <div className="prediction-grid-footer">

        <Lightbulb size={16} />

        <span>
          Click any predicted word to append it to your input and
          continue generating predictions.
        </span>

      </div>

    </section>
  );
}

export default PredictionGrid;