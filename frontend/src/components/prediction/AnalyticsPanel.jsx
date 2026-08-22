import {
  Brain,
  Clock3,
  Database,
  Target,
  Layers3,
  BarChart3,
} from "lucide-react";

function MetricCard({ icon: Icon, title, value }) {
  return (
    <div className="flex min-w-0 items-center gap-4 px-3 py-3">

      {/* Icon */}

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800">

        <Icon
          size={19}
          className="text-zinc-300"
        />

      </div>

      {/* Content */}

      <div className="min-w-0">

        <p className="text-xs uppercase tracking-wide text-zinc-500">
          {title}
        </p>

        <h3 className="mt-1 truncate text-base font-semibold text-white">
          {value}
        </h3>

      </div>

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
    <section className="rounded-3xl border border-zinc-800 bg-[#151922] p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold tracking-tight text-white">
          Prediction Analytics
        </h2>

        <span className="text-sm text-zinc-500">
          Live Metrics
        </span>

      </div>

      {/* Metrics */}

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

        <MetricCard
          icon={Brain}
          title="Embedding Model"
          value={data.embeddingModel}
        />

        <MetricCard
          icon={Clock3}
          title="Retrieval Time"
          value={data.retrievalTime}
        />

        <MetricCard
          icon={Target}
          title="Prediction Method"
          value={data.predictionMethod}
        />

        <MetricCard
          icon={Layers3}
          title="Top-K Chunks"
          value={data.topKChunks}
        />

        <MetricCard
          icon={BarChart3}
          title="Confidence"
          value={data.confidence}
        />

        <MetricCard
          icon={Database}
          title="Total Candidates"
          value={data.totalCandidates}
        />

      </div>

    </section>
  );
}

export default AnalyticsPanel;