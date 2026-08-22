import PredictionHeader from "../components/prediction/PredictionHeader";
import PredictionInput from "../components/prediction/PredictionInput";
import PredictionGrid from "../components/prediction/PredictionGrid";
import RetrievalPanel from "../components/prediction/RetrievalPanel";
import AnalyticsPanel from "../components/prediction/AnalyticsPanel";

import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

import usePrediction from "../hooks/usePrediction";

/*
|--------------------------------------------------------------------------
| TEMPORARY SAMPLE DATA
|--------------------------------------------------------------------------
| Replace with live API response from usePrediction() when backend is
| fully connected to the frontend prediction flow.
*/

const defaultPredictions = [
  { rank: 1, word: "is", score: 0.91 },
  { rank: 2, word: "becoming", score: 0.86 },
  { rank: 3, word: "used", score: 0.79 },
  { rank: 4, word: "revolutionizing", score: 0.74 },
  { rank: 5, word: "transforming", score: 0.72 },
];

const sampleContext = [
  {
    title: "Wikipedia: Artificial Intelligence",
    content:
      "Artificial Intelligence is intelligence demonstrated by machines, in contrast to natural intelligence displayed by humans. AI is a broad field that encompasses machine learning, natural language processing, robotics, and more.",
    similarity: 0.91,
    source: "wiki_015.txt",
  },
];

const sampleAnalytics = {
  embeddingModel: "all-MiniLM-L6-v2",
  retrievalTime: "42 ms",
  predictionMethod: "RAG + Regex",
  topKChunks: "5",
  confidence: "91%",
  totalCandidates: "18",
};

function WordPredictionPage() {
  const {
    predictions,
    context,
    loading,
    error,
    predict,
    reset,
  } = usePrediction();

  /*
   * Keep the approved sample predictions visible when the API has not
   * returned predictions yet.
   */
  const displayPredictions =
    predictions && predictions.length > 0
      ? predictions
      : defaultPredictions;

  const displayContext =
    context && context.length > 0
      ? context
      : sampleContext;

  return (
    <main className="prediction-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="prediction-header-wrap">
        <PredictionHeader />
      </div>


      {/* =====================================================
          INPUT
      ===================================================== */}

      <div className="prediction-input-wrap">
        <PredictionInput
          onPredict={predict}
          onClear={reset}
          loading={loading}
        />
      </div>


      {/* =====================================================
          LOADING / ERROR
      ===================================================== */}

      {loading && (
        <div className="prediction-status">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="prediction-status">
          <ErrorMessage message={error} />
        </div>
      )}


      {/* =====================================================
          PREDICTIONS + RETRIEVED CONTEXT
      ===================================================== */}

      <section className="prediction-middle">

        <PredictionGrid
          predictions={displayPredictions}
        />

        <RetrievalPanel
          context={displayContext}
          useSampleData={false}
        />

      </section>


      {/* =====================================================
          ANALYTICS
      ===================================================== */}

      <AnalyticsPanel
        analytics={sampleAnalytics}
        useSampleData={true}
      />

    </main>
  );
}

export default WordPredictionPage;