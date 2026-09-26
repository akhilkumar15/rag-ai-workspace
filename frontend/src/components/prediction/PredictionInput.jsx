import { useState } from "react";
import {
  Sparkles,
  RotateCcw,
} from "lucide-react";

function PredictionInput({
  onPredict,
  loading,
  onClear,
}) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const trimmedText = text.trim();

    if (!trimmedText || loading) {
      return;
    }

    onPredict(trimmedText);
  };

  const handleClear = () => {
    if (loading) {
      return;
    }

    setText("");
    onClear?.();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <section className="prediction-input-card">

      {/* =====================================================
          INPUT TITLE
      ===================================================== */}

      <h2 className="prediction-input-title">
        Input phrase
      </h2>


      {/* =====================================================
          INPUT + ACTIONS
      ===================================================== */}

      <div className="prediction-input-row">

        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Artificial Intelligence is..."
          className="prediction-input-field"
          aria-label="Input phrase"
        />


        {/* Predict */}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="prediction-button prediction-button-primary"
        >
          <Sparkles size={18} />

          <span>
            {loading ? "Predicting..." : "Predict"}
          </span>
        </button>


        {/* Clear */}

        <button
          type="button"
          onClick={handleClear}
          disabled={loading}
          className="prediction-button prediction-button-secondary"
        >
          <RotateCcw size={18} />

          <span>Clear</span>
        </button>

      </div>


      {/* =====================================================
          HELPER TEXT
      ===================================================== */}

      <div className="prediction-input-helper">
        <span>Press Enter</span>{" "}
        to predict&nbsp; · &nbsp;Click a predicted word below to continue
      </div>

    </section>
  );
}

export default PredictionInput;