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

  return (
    <aside className="retrieval-panel">

      {/* Header */}

      <div className="retrieval-panel-header">

        <h2>
          Retrieved Context
        </h2>

        <div className="retrieval-panel-navigation">

          <button type="button">
            <ChevronLeft size={16} />
          </button>

          <span>
            1 of 5
          </span>

          <button type="button">
            <ChevronRight size={16} />
          </button>

        </div>

      </div>

      {/* Source */}

      <div className="retrieval-source">

        <h3>
          {chunk.title}
        </h3>

        <p>
          {chunk.content}
        </p>

      </div>

      {/* Metrics */}

      <div className="retrieval-metrics">

        <div className="retrieval-metric">

          <span className="retrieval-label">
            SIMILARITY SCORE
          </span>

          <div className="retrieval-score-row">

            <strong>
              {chunk.similarity.toFixed(2)}
            </strong>

            <div className="retrieval-progress">
              <div
                style={{
                  width: `${chunk.similarity * 100}%`,
                }}
              />
            </div>

          </div>

        </div>

        <div className="retrieval-metric">

          <span className="retrieval-label">
            SOURCE
          </span>

          <div className="retrieval-source-value">

            <FileText size={16} />

            <span>
              {chunk.source}
            </span>

          </div>

        </div>

      </div>

      {/* View all */}

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