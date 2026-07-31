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
    <div className="rounded-2xl border border-zinc-700 bg-[#10141c] p-5 transition-all duration-200 hover:border-zinc-600 hover:bg-[#111722]">

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-800">
          <Icon
            size={20}
            className="text-zinc-300"
          />
        </div>

        <div className="min-w-0 flex-1">

          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            {title}
          </p>

          <h3 className="mt-1 truncate text-lg font-semibold text-white">
            {value}
          </h3>

        </div>

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

      <div className="flex items-center justify-between">

        <h2 className="text-[26px] font-bold tracking-tight text-white">
          Prediction Analytics
        </h2>

        <span className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
          Live Metrics
        </span>

      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 grid-cols-3">

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
