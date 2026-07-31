import PredictionHeader from "../components/prediction/PredictionHeader";
import PredictionInput from "../components/prediction/PredictionInput";
import PredictionGrid from "../components/prediction/PredictionGrid";
import RetrievalPanel from "../components/prediction/RetrievalPanel";
import AnalyticsPanel from "../components/prediction/AnalyticsPanel";

import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

import usePrediction from "../hooks/usePrediction";

const USE_SAMPLE_DATA = false;

const samplePredictions = [
  { word: "is", score: 0.91 },
  { word: "becoming", score: 0.86 },
  { word: "used", score: 0.79 },
  { word: "revolutionizing", score: 0.74 },
  { word: "transforming", score: 0.72 },
];

const sampleContext = [
  {
    title: "Wikipedia: Artificial Intelligence",
    content:
      "Artificial Intelligence is intelligence demonstrated by machines, in contrast to natural intelligence displayed by humans.",
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

  const displayPredictions = USE_SAMPLE_DATA
    ? samplePredictions
    : predictions;

  const displayContext = USE_SAMPLE_DATA
    ? sampleContext
    : context;

  return (
    <main className="w-full">

      {/* Header */}

      <div className="mb-8">
        <PredictionHeader />
      </div>

      {/* Input */}

      <div className="mb-7">
        <PredictionInput
          onPredict={predict}
          onClear={reset}
          loading={loading}
        />
      </div>

      {loading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {/* Prediction + Retrieval */}

      <section
        className="
          mb-8
          grid
          items-start
          gap-6
          xl:grid-cols-[1.8fr_1fr]
        "
      >
        <PredictionGrid
          predictions={displayPredictions}
        />

        <RetrievalPanel
          context={displayContext}
          useSampleData={USE_SAMPLE_DATA}
        />
      </section>

      {/* Analytics */}

      <AnalyticsPanel
        analytics={sampleAnalytics}
        useSampleData={USE_SAMPLE_DATA}
      />

    </main>
  );
}

export default WordPredictionPage;