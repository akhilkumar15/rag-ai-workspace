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

    if (!trimmedText || loading) return;

    onPredict(trimmedText);
  };

  const handleClear = () => {
    if (loading) return;

    setText("");
    onClear?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <section className="prediction-input-card">

      {/* Header */}

      <h2 className="prediction-input-title">
        Input Phrase
      </h2>


      {/* Input + Buttons */}

      <div className="prediction-input-row">

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Artificial Intelligence is..."
          className="prediction-input-field"
        />


        <button
          onClick={handleSubmit}
          disabled={loading}
          className="prediction-button prediction-button-primary"
        >
          <Sparkles size={18} />

          <span>
            {loading ? "Predicting..." : "Predict"}
          </span>
        </button>


        <button
          onClick={handleClear}
          disabled={loading}
          className="prediction-button prediction-button-secondary"
        >
          <RotateCcw size={18} />

          <span>
            Clear
          </span>
        </button>

      </div>


      {/* Helper */}

      <div className="prediction-input-helper">

        Press{" "}
        <span>
          Enter
        </span>{" "}
        to predict, or click a predicted word below to continue
        generating suggestions.

      </div>

    </section>
  );
}

export default PredictionInput;