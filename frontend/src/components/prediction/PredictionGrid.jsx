import { Lightbulb } from "lucide-react";

function PredictionGrid({
  predictions = [],
  onSelectPrediction,
}) {
  return (
    <section className="prediction-grid-section">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="prediction-grid-header">

        <h2>
          Predicted Next Words
        </h2>

        <span>
          (Top {predictions.length})
        </span>

      </div>


      {/* =====================================================
          CARDS
      ===================================================== */}

      {predictions.length > 0 ? (

        <div className="prediction-cards">

          {predictions.slice(0, 5).map((prediction, index) => (

            <button
              key={`${prediction.word}-${index}`}
              onClick={() =>
                onSelectPrediction?.(prediction.word)
              }
              className="prediction-card"
            >

              {/* Badge */}

              <div className="prediction-card-badge">
                {prediction.rank ?? index + 1}
              </div>


              {/* Word */}

              <div className="prediction-card-word">
                {prediction.word}
              </div>


              {/* Score */}

              <div className="prediction-card-score">
                {Number(prediction.score).toFixed(2)}
              </div>

            </button>

          ))}

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

        <Lightbulb
          size={16}
        />

        <span>
          Click any predicted word to append it to your input and
          continue generating predictions.
        </span>

      </div>

    </section>
  );
}

export default PredictionGrid;