import {
  Brain,
  Clock3,
  Database,
  Target,
  Layers3,
  BarChart3,
} from "lucide-react";

function MetricCard({ title, value, confidence = false }) {
  return (
    <div className="min-w-0 px-3 py-3">

      <p className="text-xs uppercase tracking-wide text-[#9a9a96]">
        {title}
      </p>

      <h3
        className={`mt-1 truncate text-base font-semibold ${
          confidence
            ? "text-[#0F6E56]"
            : "text-[#161615]"
        }`}
      >
        {value}
      </h3>

    </div>
  );
}

function AnalyticsPanel({
  analytics = {},
  useSampleData = false,
}) {
  const sampleAnalytics = {
    embeddingModel: "all-MiniLM-L6-v2",
    retrievalTime: "42 ms",
    predictionMethod: "RAG + Regex",
    topKChunks: "5",
    confidence: "91%",
    totalCandidates: "18",
  };

  const data = useSampleData
    ? sampleAnalytics
    : {
        embeddingModel:
          analytics.embeddingModel ?? sampleAnalytics.embeddingModel,

        retrievalTime:
          analytics.retrievalTime ?? sampleAnalytics.retrievalTime,

        predictionMethod:
          analytics.predictionMethod ?? sampleAnalytics.predictionMethod,

        topKChunks:
          analytics.topKChunks ?? sampleAnalytics.topKChunks,

        confidence:
          analytics.confidence ?? sampleAnalytics.confidence,

        totalCandidates:
          analytics.totalCandidates ?? sampleAnalytics.totalCandidates,
      };

  return (
    <section className="rounded-3xl border border-[#e2e2df] bg-[#ffffff] p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold tracking-tight text-[#161615]">
          Prediction Analytics
        </h2>

        <span className="text-sm text-[#9a9a96]">
          Live Metrics
        </span>

      </div>

      {/* Metrics */}

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

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