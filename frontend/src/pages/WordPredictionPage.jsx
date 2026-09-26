import { useState } from "react";

import PredictionHeader from "../components/prediction/PredictionHeader";
import PredictionInput from "../components/prediction/PredictionInput";
import PredictionGrid from "../components/prediction/PredictionGrid";
import RetrievalPanel from "../components/prediction/RetrievalPanel";
import AnalyticsPanel from "../components/prediction/AnalyticsPanel";

import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import HistoryDrawer from "../components/common/HistoryDrawer";

import usePrediction from "../hooks/usePrediction";
import useHistory from "../hooks/useHistory";


/*
|--------------------------------------------------------------------------
| APPROVED FALLBACK DATA
|--------------------------------------------------------------------------
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
  embeddingModel: "MiniLM-L6-v2",
  retrievalTime: "42 ms",
  predictionMethod: "RAG + Regex",
  topKChunks: "5",
  confidence: "91%",
  totalCandidates: "32",
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


  // ---------------------------------------------------------
  // HISTORY
  // ---------------------------------------------------------

  const {
    history,
    saveHistory,
    clearHistory,
  } = useHistory("rag_history_word_prediction");


  const [historyOpen, setHistoryOpen] = useState(false);


  // ---------------------------------------------------------
  // PREDICT
  // ---------------------------------------------------------

  const handlePredict = async (text) => {

    const value = text?.trim();

    if (!value) {
      return;
    }

    await predict(value);

    saveHistory({
      title: value,
      query: value,
      text: value,
    });
  };


  // ---------------------------------------------------------
  // SELECT HISTORY
  // ---------------------------------------------------------

  const handleHistorySelect = async (item) => {

    setHistoryOpen(false);

    const query =
      item.query ||
      item.text ||
      item.title;

    if (!query) {
      return;
    }

    /*
     * Re-run the selected prediction.
     *
     * This gives the history item an actual dynamic
     * behavior instead of only displaying old text.
     */

    await predict(query);
  };


  // ---------------------------------------------------------
  // DISPLAY DATA
  // ---------------------------------------------------------

  const displayPredictions =
    predictions && predictions.length > 0
      ? predictions
      : defaultPredictions;


  const displayContext =
    context && context.length > 0
      ? context
      : sampleContext;


  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------

  return (
    <main className="prediction-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="prediction-header-wrap">

        <PredictionHeader
          onHistoryClick={() => setHistoryOpen(true)}
          historyCount={history.length}
        />

      </div>


      {/* =====================================================
          INPUT PHRASE
      ===================================================== */}

      <div className="prediction-input-wrap">

        <PredictionInput
          onPredict={handlePredict}
          onClear={reset}
          loading={loading}
        />

      </div>


      {/* =====================================================
          STATUS
      ===================================================== */}

      {loading && (
        <div className="prediction-status">
          <LoadingSpinner />
        </div>
      )}


      {error && (
        <div className="prediction-status">
          <ErrorMessage
            message={error}
          />
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
          PREDICTION ANALYTICS
      ===================================================== */}

      <AnalyticsPanel
        analytics={sampleAnalytics}
        useSampleData={true}
      />


      {/* =====================================================
          HISTORY DRAWER
      ===================================================== */}

      <HistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        title="Word Prediction History"
        subtitle="Your previous prediction phrases"
        items={history}
        onSelect={handleHistorySelect}
        onClear={clearHistory}
      />

    </main>
  );
}

export default WordPredictionPage;