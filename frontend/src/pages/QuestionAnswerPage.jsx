import {
  MessageCircleQuestion,
  CalendarClock,
  CheckCircle2,
} from "lucide-react";

import { useState } from "react";
import useQA from "../hooks/useQA";

function QuestionAnswerPage() {
  const {
    result,
    loading,
    error,
    ask,
    clear,
  } = useQA();

  const [input, setInput] = useState("");

  // =========================================================
  // ASK QUESTION
  // =========================================================

  const handleAsk = async () => {
    const value = input.trim();

    if (!value || loading) {
      return;
    }

    await ask(value);
  };

  // =========================================================
  // ENTER KEY
  // =========================================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAsk();
    }
  };

  // =========================================================
  // CLEAR
  // =========================================================

  const handleClear = () => {
    setInput("");
    clear();
  };

  // =========================================================
  // BACKEND DATA
  // =========================================================

  const answer = result?.response || "";

  const topSource = result?.top_source;

  const analytics = result?.analytics;

  const answerLength = answer
    ? answer.trim().split(/\s+/).length
    : 0;

  return (
    <div className="question-answer-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="qa-page-header">

        <div className="qa-header-left">

          <div className="qa-header-icon">
            <MessageCircleQuestion size={32} />
          </div>

          <div>
            <h1>Question Answering</h1>

            <p>
              Ask questions and get answers from your indexed documents.
            </p>
          </div>

        </div>

        <div className="qa-header-actions">

          <button className="qa-history-button">
            <CalendarClock size={18} />
            <span>View History</span>
          </button>

          <div className="qa-ready-status">
            <CheckCircle2 size={16} />
            <span>
              {loading ? "Processing" : "Ready"}
            </span>
          </div>

        </div>

      </section>


      {/* =====================================================
          QUESTION INPUT
      ===================================================== */}

      <section className="qa-input-card">

        <h2>Ask a Question</h2>

        <div className="qa-input-row">

          <input
            type="text"
            placeholder="What is Artificial Intelligence?"
            className="qa-input-field"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          <button
            className="qa-ask-button"
            onClick={handleAsk}
            disabled={loading || !input.trim()}
          >
            <MessageCircleQuestion size={18} />

            <span>
              {loading ? "Asking..." : "Ask"}
            </span>
          </button>

          <button
            className="qa-clear-button"
            onClick={handleClear}
            disabled={loading}
          >
            <span>↻</span>
            <span>Clear</span>
          </button>

        </div>

        <p className="qa-input-helper">
          Press Enter to ask&nbsp; • &nbsp;Get answer with cited sources
        </p>

      </section>


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="qa-error-message">
          {typeof error === "string"
            ? error
            : "Unable to get an answer."}
        </div>
      )}


      {/* =====================================================
          ANSWER + SOURCE
      ===================================================== */}

      <section className="qa-main-grid">

        {/* ===================================================
            ANSWER
        =================================================== */}

        <article className="qa-answer-card">

          <h2>Answer</h2>

          <div className="qa-answer-content">

            {loading ? (

              <p>
                Generating answer from your indexed documents...
              </p>

            ) : answer ? (

              <p>
                {answer}
              </p>

            ) : (

              <>
                <p>
                  Ask a question to generate an answer from your
                  indexed documents.
                </p>

                <p>
                  The answer will be generated using the retrieved
                  document context.
                </p>
              </>

            )}

          </div>

          <div className="qa-answer-footer">

            <div className="qa-feedback">
              <button disabled={!answer}>👍</button>
              <button disabled={!answer}>👎</button>
            </div>

            <div className="qa-answer-meta">

              Answer length:

              <strong>
                {answerLength} words
              </strong>

              <span>•</span>

              Confidence:

              <strong>
                {analytics?.confidence || "--"}
              </strong>

            </div>

          </div>

        </article>


        {/* ===================================================
            SOURCE
        =================================================== */}

        <article className="qa-source-card">

          <div className="qa-source-header">

            <h2>Top Source Chunk</h2>

            <div className="qa-source-navigation">

              <button disabled>
                ←
              </button>

              <span>
                {topSource ? "1" : "0"} of{" "}
                {result?.retrieved_chunks || 0}
              </span>

              <button disabled>
                →
              </button>

            </div>

          </div>


          <div className="qa-source-content">

            <h3>
              {topSource?.title || "No source available"}
            </h3>

            <p>
              {topSource?.content ||
                "Ask a question to retrieve the relevant document context."}
            </p>

          </div>


          <div className="qa-source-meta">

            <div>

              <span>
                Similarity Score
              </span>

              <strong>
                {topSource
                  ? Number(topSource.similarity).toFixed(2)
                  : "--"}
              </strong>

            </div>

            <div>

              <span>
                Source
              </span>

              <strong>
                {topSource?.source || "--"}
              </strong>

            </div>

          </div>


          <button className="qa-view-chunks-button">
            View All Retrieved Chunks
          </button>

        </article>

      </section>


      {/* =====================================================
          QA ANALYTICS
      ===================================================== */}

      <section className="qa-analytics">

        <div className="qa-analytics-header">

          <h2>
            QA Analytics
          </h2>

        </div>


        <div className="qa-analytics-grid">

          {/* Embedding Model */}

          <div className="qa-stat">

            <span>◈</span>

            <div>

              <small>
                Embedding Model
              </small>

              <strong>
                {analytics?.embeddingModel || "--"}
              </strong>

            </div>

          </div>


          {/* Retrieval Time */}

          <div className="qa-stat">

            <span>◷</span>

            <div>

              <small>
                Retrieval Time
              </small>

              <strong>
                {analytics?.retrievalTime || "--"}
              </strong>

            </div>

          </div>


          {/* LLM Model */}

          <div className="qa-stat">

            <span>⚙</span>

            <div>

              <small>
                LLM Model
              </small>

              <strong>
                {analytics?.llmModel || "--"}
              </strong>

            </div>

          </div>


          {/* Response Time */}

          <div className="qa-stat">

            <span>◷</span>

            <div>

              <small>
                Response Time
              </small>

              <strong>
                {analytics?.responseTime || "--"}
              </strong>

            </div>

          </div>


          {/* Confidence */}

          <div className="qa-stat">

            <span>♣</span>

            <div>

              <small>
                Confidence Score
              </small>

              <strong className="qa-confidence">
                {analytics?.confidence || "--"}
              </strong>

            </div>

          </div>


          {/* Tokens */}

          <div className="qa-stat">

            <span>▤</span>

            <div>

              <small>
                Tokens Used
              </small>

              <strong>
                {analytics?.tokensUsed ?? "--"}
              </strong>

            </div>

          </div>


          {/* Sources */}

          <div className="qa-stat">

            <span>▱</span>

            <div>

              <small>
                Sources Used
              </small>

              <strong>
                {analytics?.sourcesUsed || "--"}
              </strong>

            </div>

          </div>

        </div>


        <div className="qa-tip">

          💡 Tip: Answers are generated from retrieved chunks and may
          not fully represent the entire document.

        </div>

      </section>

    </div>
  );
}

export default QuestionAnswerPage;