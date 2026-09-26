import {
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

function RetrievalPanel({
  context = [],
  useSampleData = false,
}) {
  const sampleChunk = {
    title: "Wikipedia: Artificial Intelligence",
    content:
      "Artificial intelligence is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans and animals. AI is a broad field that encompasses machine learning, natural language processing, robotics, and more.",
    similarity: 0.91,
    source: "wiki_015.txt",
  };

  const chunk =
    useSampleData || context.length === 0
      ? sampleChunk
      : context[0];

  const similarity = Number(chunk?.similarity ?? 0);

  return (
    <aside className="retrieval-panel">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="retrieval-panel-header">

        <div>
          <h2>Retrieved Context</h2>

          <span className="retrieval-panel-subtitle">
            Semantic context used for prediction
          </span>
        </div>

        <div className="retrieval-panel-navigation">

          <button
            type="button"
            aria-label="Previous retrieved chunk"
          >
            <ChevronLeft size={16} />
          </button>

          <span>1 of 5</span>

          <button
            type="button"
            aria-label="Next retrieved chunk"
          >
            <ChevronRight size={16} />
          </button>

        </div>

      </div>


      {/* =====================================================
          RETRIEVED CONTEXT
      ===================================================== */}

      <div className="retrieval-source">

        <div className="retrieval-source-heading">

          <FileText size={16} />

          <h3>
            {chunk?.title ?? "Retrieved document"}
          </h3>

        </div>

        <p>
          {chunk?.content ?? "No retrieved context available."}
        </p>

      </div>


      {/* =====================================================
          RETRIEVAL METRICS
      ===================================================== */}

      <div className="retrieval-metrics">

        {/* Similarity */}

        <div className="retrieval-metric">

          <span className="retrieval-label">
            SIMILARITY SCORE
          </span>

          <div className="retrieval-score-row">

            <strong>
              {similarity.toFixed(2)}
            </strong>

            <div
              className="retrieval-progress"
              aria-label={`Similarity score ${similarity}`}
            >
              <div
                style={{
                  width: `${Math.max(
                    0,
                    Math.min(similarity * 100, 100)
                  )}%`,
                }}
              />
            </div>

          </div>

        </div>


        {/* Source */}

        <div className="retrieval-metric">

          <span className="retrieval-label">
            SOURCE
          </span>

          <div className="retrieval-source-value">

            <FileText size={16} />

            <span>
              {chunk?.source ?? "Unknown source"}
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          VIEW ALL
      ===================================================== */}

      <button
        type="button"
        className="retrieval-view-all"
      >
        View All Retrieved Chunks
      </button>

    </aside>
  );
}

export default RetrievalPanel;