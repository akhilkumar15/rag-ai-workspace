function MetricCard({ title, value, confidence = false }) {
  return (
    <div className="analytics-item">

      <div className="analytics-item-content">

        <span className="analytics-item-label">
          {title}
        </span>

        <strong
          className={
            confidence
              ? "analytics-item-value analytics-item-value-highlight"
              : "analytics-item-value"
          }
        >
          {value}
        </strong>

      </div>

    </div>
  );
}

function AnalyticsPanel({
  analytics = {},
  useSampleData = false,
}) {
  const sampleAnalytics = {
    embeddingModel: "MiniLM-L6-v2",
    retrievalTime: "42 ms",
    predictionMethod: "RAG + Regex",
    topKChunks: "5",
    confidence: "91%",
    totalCandidates: "32",
  };

  const data = useSampleData
    ? sampleAnalytics
    : {
        embeddingModel:
          analytics.embeddingModel ??
          sampleAnalytics.embeddingModel,

        retrievalTime:
          analytics.retrievalTime ??
          sampleAnalytics.retrievalTime,

        predictionMethod:
          analytics.predictionMethod ??
          sampleAnalytics.predictionMethod,

        topKChunks:
          analytics.topKChunks ??
          sampleAnalytics.topKChunks,

        confidence:
          analytics.confidence ??
          sampleAnalytics.confidence,

        totalCandidates:
          analytics.totalCandidates ??
          sampleAnalytics.totalCandidates,
      };

  return (
    <section className="analytics-container">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="analytics-header">

        <div>
          <h2>Prediction Analytics</h2>

          <p>
            Live Metrics
          </p>
        </div>

      </div>


      {/* =====================================================
          METRICS
      ===================================================== */}

      <div className="analytics-grid">

        <MetricCard
          title="Embedding Model"
          value={data.embeddingModel}
        />

        <MetricCard
          title="Retrieval Time"
          value={data.retrievalTime}
        />

        <MetricCard
          title="Prediction Method"
          value={data.predictionMethod}
        />

        <MetricCard
          title="Top-K Chunks"
          value={data.topKChunks}
        />

        <MetricCard
          title="Confidence"
          value={data.confidence}
          confidence
        />

        <MetricCard
          title="Total Candidates"
          value={data.totalCandidates}
        />

      </div>

    </section>
  );
}

export default AnalyticsPanel;