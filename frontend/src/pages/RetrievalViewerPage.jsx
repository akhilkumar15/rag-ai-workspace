
import { useState } from "react";
import {
  Clock3,
  Database,
  FileText,
  History,
  Lightbulb,
  Network,
  Search,
  Send,
  Sparkles,
  RotateCcw,
  Layers,
  BarChart3,
  PieChart,
  CheckCircle2,
} from "lucide-react";

function RetrievalViewerPage() {
  const [query, setQuery] = useState(
    "What is artificial intelligence and how does it work?"
  );

  const [topK, setTopK] = useState(5);
  const [loading, setLoading] = useState(false);

  const [retrievedChunks, setRetrievedChunks] = useState([
    {
      rank: 1,
      score: 0.87,
      preview:
        "Artificial Intelligence (AI) is a branch of computer science that aims to create systems capable of performing tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.",
      source: "wiki_015.txt",
      location: "Page 2 • Chunk 3",
    },
    {
      rank: 2,
      score: 0.79,
      preview:
        "AI works by combining algorithms, large amounts of data, and computational power. Machine learning, a subset of AI, enables systems to learn patterns from data and make predictions or decisions without being explicitly programmed.",
      source: "wiki_015.txt",
      location: "Page 2 • Chunk 1",
    },
    {
      rank: 3,
      score: 0.68,
      preview:
        "Deep learning, another subset of machine learning, uses neural networks with multiple layers to model complex relationships in data. It has shown remarkable performance in areas such as image recognition and natural language processing.",
      source: "wiki_015.txt",
      location: "Page 3 • Chunk 2",
    },
    {
      rank: 4,
      score: 0.55,
      preview:
        "AI applications are widely used in healthcare, finance, transportation, customer service, and many other industries to automate tasks and improve efficiency.",
      source: "wiki_015.txt",
      location: "Page 4 • Chunk 4",
    },
    {
      rank: 5,
      score: 0.47,
      preview:
        "The future of AI involves improving model interpretability, reducing bias, and ensuring safe and ethical deployment of intelligent systems.",
      source: "wiki_015.txt",
      location: "Page 5 • Chunk 1",
    },
  ]);

  const handleRetrieve = () => {
    if (!query.trim() || loading) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleClear = () => {
    if (loading) return;

    setQuery("");
  };

  const averageScore =
    retrievedChunks.reduce((sum, chunk) => sum + chunk.score, 0) /
    retrievedChunks.length;

  const uniqueSources = new Set(
    retrievedChunks.map((chunk) => chunk.source)
  ).size;

  return (
    <div className="retrieval-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="retrieval-page-header">

        <div className="retrieval-title-section">

          <div className="retrieval-title-icon">
            <Search size={28} />
          </div>

          <div>
            <h1>Retrieval Viewer</h1>

            <p>
              Inspect retrieved chunks, relevance scores, and sources for any
              query.
            </p>
          </div>

        </div>

        <div className="retrieval-header-actions">

          <button className="retrieval-history-button">
            <History size={17} />
            <span>View History</span>
          </button>

          <div className="retrieval-ready-badge">
            <CheckCircle2 size={16} />
            <span>Ready</span>
          </div>

        </div>

      </div>


      {/* =====================================================
          QUERY SECTION
      ===================================================== */}

      <section className="retrieval-query-card">

        <div className="retrieval-query-main">

          <label>Query</label>

          <div className="retrieval-query-input-wrapper">

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRetrieve();
                }
              }}
              placeholder="Enter your query..."
              disabled={loading}
            />

            <Send size={19} />

          </div>

          <p>
            Enter your query to view retrieved relevant chunks from the
            knowledge base.
          </p>

        </div>


        <div className="retrieval-controls">

          <div className="retrieval-top-k">

            <label>Top K Chunks</label>

            <select
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>

          </div>


          <button
            className="retrieval-button retrieval-button-primary"
            onClick={handleRetrieve}
            disabled={loading}
          >
            <Sparkles size={17} />

            <span>
              {loading ? "Retrieving..." : "Retrieve"}
            </span>
          </button>


          <button
            className="retrieval-button retrieval-button-secondary"
            onClick={handleClear}
            disabled={loading}
          >
            <RotateCcw size={17} />
            <span>Clear</span>
          </button>

        </div>

      </section>


      {/* =====================================================
          RETRIEVAL SUMMARY
      ===================================================== */}

      <section className="retrieval-summary-card">

        <h2>Retrieval Summary</h2>

        <div className="retrieval-summary-grid">

          <div className="retrieval-summary-item">
            <div className="retrieval-summary-icon green">
              <Layers size={19} />
            </div>

            <div>
              <strong>{retrievedChunks.length}</strong>
              <span>Chunks Retrieved</span>
            </div>
          </div>


          <div className="retrieval-summary-item">
            <div className="retrieval-summary-icon blue">
              <Network size={19} />
            </div>

            <div>
              <strong>{retrievedChunks[0]?.score.toFixed(2)}</strong>
              <span>Top Score</span>
            </div>
          </div>


          <div className="retrieval-summary-item">
            <div className="retrieval-summary-icon purple">
              <Clock3 size={19} />
            </div>

            <div>
              <strong>{averageScore.toFixed(2)}</strong>
              <span>Avg. Score</span>
            </div>
          </div>


          <div className="retrieval-summary-item">
            <div className="retrieval-summary-icon pink">
              <FileText size={19} />
            </div>

            <div>
              <strong>{uniqueSources}</strong>
              <span>Sources</span>
            </div>
          </div>


          <div className="retrieval-summary-item">
            <div className="retrieval-summary-icon green">
              <Database size={19} />
            </div>

            <div>
              <strong>1,248</strong>
              <span>Total Chunks in Index</span>
            </div>
          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN RETRIEVAL CONTENT
      ===================================================== */}

      <div className="retrieval-content-grid">


        {/* ===================================================
            RETRIEVED CHUNKS
        =================================================== */}

        <section className="retrieved-chunks-card">

          <div className="retrieval-section-header">

            <h2>Retrieved Chunks</h2>

          </div>


          <div className="retrieved-chunks-table">

            <div className="retrieved-table-header">

              <span>Rank</span>
              <span>Score</span>
              <span>Chunk Preview</span>
              <span>Source</span>

            </div>


            {retrievedChunks.map((chunk) => (

              <div
                className="retrieved-chunk-row"
                key={chunk.rank}
              >

                <div className="chunk-rank">

                  <span>{chunk.rank}</span>

                </div>


                <div
                  className={`chunk-score ${
                    chunk.score >= 0.7 ? "high" : "normal"
                  }`}
                >
                  {chunk.score.toFixed(2)}
                </div>


                <div className="chunk-preview">

                  {chunk.preview}

                </div>


                <div className="chunk-source">

                  <div>
                    <FileText size={15} />
                    <span>{chunk.source}</span>
                  </div>

                  <small>{chunk.location}</small>

                </div>

              </div>

            ))}

          </div>


          <button className="retrieval-view-button">
            <FileText size={16} />
            <span>View All Retrieved Chunks</span>
          </button>

        </section>


        {/* ===================================================
            RIGHT ANALYTICS
        =================================================== */}

        <div className="retrieval-analytics-column">


          {/* =================================================
              SCORE DISTRIBUTION
          ================================================= */}

          <section className="score-distribution-card">

            <div className="retrieval-section-header">

              <h2>Score Distribution</h2>

              <button className="chart-action-button">
                <BarChart3 size={17} />
              </button>

            </div>


            <div className="score-chart">

              {retrievedChunks.map((chunk) => (

                <div
                  className="score-bar-column"
                  key={chunk.rank}
                >

                  <span className="score-value">
                    {chunk.score.toFixed(2)}
                  </span>

                  <div className="score-bar-wrapper">

                    <div
                      className="score-bar"
                      style={{
                        height: `${chunk.score * 100}%`,
                      }}
                    />

                  </div>

                  <span className="score-rank">
                    {chunk.rank}
                  </span>

                </div>

              ))}

            </div>


            <div className="score-chart-legend">

              <span className="legend-dot" />
              <span>Relevance Score</span>

            </div>

          </section>


          {/* =================================================
              SOURCE BREAKDOWN
          ================================================= */}

          <section className="source-breakdown-card">

            <div className="retrieval-section-header">

              <h2>Source Breakdown</h2>

            </div>


            <div className="source-breakdown-content">

              <div className="source-donut">

                <div className="source-donut-inner">
                  <span>5</span>
                  <small>chunks</small>
                </div>

              </div>


              <div className="source-breakdown-table">

                <div className="source-table-header">
                  <span></span>
                  <span>Chunks</span>
                  <span>Percentage</span>
                </div>


                <div className="source-table-row">

                  <div className="source-name">

                    <span className="source-dot" />

                    <span>wiki_015.txt</span>

                  </div>

                  <span>5</span>

                  <span>100%</span>

                </div>

              </div>

            </div>


            <button className="retrieval-view-button">
              <FileText size={16} />
              <span>View All Sources</span>
            </button>

          </section>

        </div>

      </div>


      {/* =====================================================
          TIP
      ===================================================== */}

      <div className="retrieval-tip">

        <Lightbulb size={18} />

        <span>
          <strong>Tip:</strong> Higher scores indicate greater relevance to
          your query. Click on any chunk to view more details or the full
          context.
        </span>

      </div>

    </div>
  );
}

export default RetrievalViewerPage;