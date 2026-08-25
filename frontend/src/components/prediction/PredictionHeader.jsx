import { Upload, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PredictionHeader() {
  const navigate = useNavigate();

  return (
    <div className="prediction-header">

      {/* Left side */}

      <div className="prediction-header-left">

        {/* Word Prediction Logo */}

        <div className="prediction-page-logo">
          <span></span>
        </div>

        <div className="prediction-header-text">

          <h1>
            Word prediction
          </h1>

          <p>
            Predict the next word using retrieved context and RAG.
          </p>

        </div>

      </div>

      {/* Right side */}

      <div className="prediction-header-actions">

        <button
          type="button"
          className="prediction-header-button"
        >
          <Clock3 size={17} />
          <span>View history</span>
        </button>

        <button
          type="button"
          className="prediction-header-button"
          onClick={() => navigate("/upload-documents")}
        >
          <Upload size={17} />
          <span>Upload doc</span>
        </button>

        <div className="prediction-ready">
          <span className="prediction-ready-dot"></span>
          <span>Ready</span>
        </div>

      </div>

    </div>
  );
}

export default PredictionHeader;