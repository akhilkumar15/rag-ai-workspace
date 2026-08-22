import {
  Scale,
  History,
  CheckCircle2,
  FileText,
  X,
  GitCompare,
  ArrowLeft,
  ArrowRight,
  Lock,
  AlertCircle,
  Lightbulb,
  Clock3,
  Layers3,
  Brain,
  ShieldCheck,
  Network,
} from "lucide-react";

function ComparisonPage() {
  return (
    <div className="comparison-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="comparison-header">

        <div className="comparison-header-left">

          <div className="comparison-icon">
            <Scale size={30} />
          </div>

          <div>
            <h1>Comparison</h1>

            <p>
              Compare two documents and analyze similarities and differences.
            </p>
          </div>

        </div>

        <div className="comparison-header-actions">

          <button className="comparison-history-button">
            <History size={17} />
            View History
          </button>

          <div className="comparison-ready">
            <CheckCircle2 size={16} />
            Ready
          </div>

        </div>

      </section>


      {/* =====================================================
          DOCUMENT SELECTION
      ===================================================== */}

      <section className="comparison-selection-card">

        <h2>Select Documents to Compare</h2>

        <div className="comparison-selection-row">

          {/* DOCUMENT A */}

          <div className="comparison-document">

            <label>Document A</label>

            <div className="comparison-file-card">

              <div className="comparison-file-icon">
                <FileText size={20} />
              </div>

              <div className="comparison-file-info">

                <strong>
                  artificial_intelligence_overview.pdf
                </strong>

                <span>
                  PDF&nbsp;&nbsp;•&nbsp;&nbsp;2.45 MB&nbsp;&nbsp;•&nbsp;&nbsp;16 pages
                </span>

              </div>

              <button className="comparison-remove-button">
                <X size={18} />
              </button>

            </div>

          </div>


          {/* VS */}

          <div className="comparison-vs">
            VS
          </div>


          {/* DOCUMENT B */}

          <div className="comparison-document">

            <label>Document B</label>

            <div className="comparison-file-card">

              <div className="comparison-file-icon">
                <FileText size={20} />
              </div>

              <div className="comparison-file-info">

                <strong>
                  machine_learning_fundamentals.pdf
                </strong>

                <span>
                  PDF&nbsp;&nbsp;•&nbsp;&nbsp;1.98 MB&nbsp;&nbsp;•&nbsp;&nbsp;14 pages
                </span>

              </div>

              <button className="comparison-remove-button">
                <X size={18} />
              </button>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="comparison-selection-actions">

            <button className="comparison-button comparison-button-primary">
              <GitCompare size={17} />
              Compare Documents
            </button>

            <button className="comparison-button comparison-button-secondary">
              <X size={17} />
              Clear
            </button>

          </div>

        </div>

        <p className="comparison-helper">
          Select two documents to see a detailed comparison of content,
          similarities, and differences.
        </p>

      </section>


      {/* =====================================================
          MAIN COMPARISON AREA
      ===================================================== */}

      <section className="comparison-main-grid">

        {/* =================================================
            LEFT COLUMN
        ================================================= */}

        <div className="comparison-left-column">

          {/* OVERVIEW */}

          <section className="comparison-overview-card">

            <h2>Comparison Overview</h2>

            <div className="comparison-overview-grid">

              <div className="overview-stat overview-stat-success">

                <div className="overview-stat-icon">
                  <Lock size={18} />
                </div>

                <div>
                  <span>Similarities</span>
                  <strong>68%</strong>
                  <small>High similarity</small>
                </div>

              </div>


              <div className="overview-stat overview-stat-warning">

                <div className="overview-stat-icon">
                  <GitCompare size={18} />
                </div>

                <div>
                  <span>Differences</span>
                  <strong>22%</strong>
                  <small>Moderate differences</small>
                </div>

              </div>


              <div className="overview-stat overview-stat-danger">

                <div className="overview-stat-icon">
                  <X size={18} />
                </div>

                <div>
                  <span>Unique Content</span>
                  <strong>10%</strong>
                  <small>Distinct information</small>
                </div>

              </div>

            </div>

          </section>


          {/* SIDE BY SIDE */}

          <section className="side-by-side-card">

            <div className="comparison-section-header">

              <h2>
                Side-by-Side Comparison
                <span>(Top Matches)</span>
              </h2>

            </div>


            <div className="comparison-tabs">

              <button className="comparison-tab active">
                All
              </button>

              <button className="comparison-tab">
                Similar
              </button>

              <button className="comparison-tab">
                Different
              </button>

              <button className="comparison-tab">
                Unique to A
              </button>

              <button className="comparison-tab">
                Unique to B
              </button>

            </div>


            <div className="comparison-table">

              <div className="comparison-table-header">

                <div>
                  Document A:
                  artificial_intelligence_overview.pdf
                </div>

                <div>Comparison</div>

                <div>
                  Document B:
                  machine_learning_fundamentals.pdf
                </div>

              </div>


              <ComparisonRow
                left="Artificial Intelligence (AI) is the simulation of human intelligence in machines that are programmed to think, learn, and make decisions like humans."
                status="Similar"
                right="Machine Learning (ML) is a subset of AI that enables systems to learn from data and improve performance without being explicitly programmed."
                type="similar"
              />

              <ComparisonRow
                left="AI encompasses technologies such as machine learning, natural language processing, computer vision, and robotics."
                status="Similar"
                right="ML focuses on algorithms that learn patterns from data, such as regression, classification, clustering, and reinforcement learning."
                type="similar"
              />

              <ComparisonRow
                left="The goal of AI is to create intelligent systems that can adapt, reason, and solve complex real-world problems."
                status="Different"
                right="The goal of ML is to build models that can make accurate predictions or decisions based on data."
                type="different"
              />

              <ComparisonRow
                left="Deep learning is a subset of machine learning based on artificial neural networks with multiple layers."
                status="Unique to A"
                right="Supervised learning uses labeled data to train models, while unsupervised learning finds hidden patterns."
                type="unique"
              />

              <ComparisonRow
                left="AI applications include autonomous vehicles, chatbots, recommendation systems, and medical diagnosis."
                status="Similar"
                right="ML applications include spam detection, image classification, fraud detection, and predictive analytics."
                type="similar"
              />

            </div>


            <button className="comparison-report-button">
              View Full Comparison Report
            </button>

          </section>

        </div>


        {/* =================================================
            RIGHT COLUMN
        ================================================= */}

        <div className="comparison-right-column">

          {/* KEY DIFFERENCES */}

          <section className="key-differences-card">

            <h2>Key Differences</h2>

            <DifferenceItem
              icon={<X size={18} />}
              text="Document A focuses more on the broad overview of AI concepts and real-world applications."
              label="From A"
              type="danger"
            />

            <DifferenceItem
              icon={<X size={18} />}
              text="Document B provides deeper coverage of machine learning algorithms and model training techniques."
              label="From B"
              type="danger"
            />

            <DifferenceItem
              icon={<GitCompare size={18} />}
              text="Both documents discuss AI/ML concepts, but from different depth and perspectives."
              label="Common"
              type="warning"
            />

          </section>


          {/* UNIQUE CONTENT */}

          <section className="unique-content-card">

            <h2>Unique Content</h2>

            <div className="unique-content-item">

              <div className="unique-content-icon">
                A
              </div>

              <p>
                Deep learning, neural networks, and AI applications
                in autonomous systems.
              </p>

              <span>2 pages</span>

            </div>


            <div className="unique-content-item">

              <div className="unique-content-icon">
                B
              </div>

              <p>
                Supervised vs unsupervised learning, model evaluation
                metrics, and training pipelines.
              </p>

              <span>3 pages</span>

            </div>


            <button className="unique-content-button">
              View All Unique Content
            </button>

          </section>

        </div>

      </section>


      {/* =====================================================
          ANALYTICS
      ===================================================== */}

      <section className="comparison-analytics-card">

        <h2>Comparison Analytics</h2>

        <div className="comparison-analytics-grid">

          <ComparisonMetric
            icon={<Clock3 size={18} />}
            label="Comparison Time"
            value="1.78 s"
          />

          <ComparisonMetric
            icon={<Layers3 size={18} />}
            label="Total Chunks Compared"
            value="254"
          />

          <ComparisonMetric
            icon={<GitCompare size={18} />}
            label="Similar Chunks"
            value="173 (68%)"
            type="success"
          />

          <ComparisonMetric
            icon={<GitCompare size={18} />}
            label="Different Chunks"
            value="56 (22%)"
            type="warning"
          />

          <ComparisonMetric
            icon={<FileText size={18} />}
            label="Unique to A"
            value="12 (5%)"
          />

          <ComparisonMetric
            icon={<FileText size={18} />}
            label="Unique to B"
            value="13 (5%)"
          />

          <ComparisonMetric
            icon={<Brain size={18} />}
            label="Model Used"
            value="MiniLM-L6-v2"
          />

          <ComparisonMetric
            icon={<Network size={18} />}
            label="Top K"
            value="5"
          />

          <ComparisonMetric
            icon={<ShieldCheck size={18} />}
            label="Confidence Score"
            value="91%"
            type="success"
          />

        </div>

        <div className="comparison-tip">
          <Lightbulb size={18} />
          <span>
            Tip: Higher similarity indicates more overlapping content.
            Click on any section to view detailed passages and sources.
          </span>
        </div>

      </section>

    </div>
  );
}


/* =========================================================
   COMPARISON ROW
========================================================= */

function ComparisonRow({
  left,
  status,
  right,
  type,
}) {
  return (
    <div className="comparison-table-row">

      <div>{left}</div>

      <div>
        <span className={`comparison-status ${type}`}>
          {status}
        </span>
      </div>

      <div>{right}</div>

    </div>
  );
}


/* =========================================================
   DIFFERENCE ITEM
========================================================= */

function DifferenceItem({
  icon,
  text,
  label,
  type,
}) {
  return (
    <div className="difference-item">

      <div className={`difference-icon ${type}`}>
        {icon}
      </div>

      <p>{text}</p>

      <span>{label}</span>

    </div>
  );
}


/* =========================================================
   ANALYTICS METRIC
========================================================= */

function ComparisonMetric({
  icon,
  label,
  value,
  type = "",
}) {
  return (
    <div className="comparison-metric">

      <div className="comparison-metric-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong className={type}>
          {value}
        </strong>
      </div>

    </div>
  );
}


export default ComparisonPage;