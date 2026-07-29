import PredictionInput from "../components/prediction/PredictionInput";
import PredictionList from "../components/prediction/PredictionList";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

import usePrediction from "../hooks/usePrediction";

function WordPredictionPage() {
  const {
    predictions,
    loading,
    error,
    predict,
  } = usePrediction();

  return (
    <div className="space-y-8">

      <PredictionInput
        onPredict={predict}
        loading={loading}
      />

      {loading && <LoadingSpinner />}

      {error && (
        <ErrorMessage
          message={error}
        />
      )}

      {!loading && (
        <PredictionList
          predictions={predictions}
        />
      )}

    </div>
  );
}

export default WordPredictionPage;