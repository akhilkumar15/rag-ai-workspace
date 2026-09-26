import {
  MessageCircleQuestion,
  CalendarClock,
  CheckCircle2,
  X,
  Clock3,
  Trash2,
  ChevronRight,
} from "lucide-react";

import { useEffect, useState } from "react";
import useQA from "../hooks/useQA";

const HISTORY_KEY = "qa_history";

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
  // HISTORY STATE
  // =========================================================

  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  // =========================================================
  // LOAD HISTORY
  // =========================================================

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_KEY);

      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Failed to load QA history:", error);
    }
  }, []);

  // =========================================================
  // ASK QUESTION
  // =========================================================

  const handleAsk = async () => {
    const value = input.trim();

    if (!value || loading) {
      return;
    }

    await ask(value);

    // Add question to history
    const historyItem = {
      id: Date.now(),
      question: value,
      timestamp: new Date().toISOString(),
    };

    setHistory((previousHistory) => {
      // Prevent duplicate consecutive questions
      const filteredHistory = previousHistory.filter(
        (item) => item.question !== value
      );

      const updatedHistory = [
        historyItem,
        ...filteredHistory,
      ].slice(0, 20);

      localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(updatedHistory)
      );

      return updatedHistory;
    });
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
  // HISTORY ITEM CLICK
  // =========================================================

  const handleHistorySelect = (question) => {
    setInput(question);
    setHistoryOpen(false);
  };

  // =========================================================
  // CLEAR HISTORY
  // =========================================================

  const handleClearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  };

  // =========================================================
  // FORMAT HISTORY TIME
  // =========================================================

  const formatHistoryTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    const difference =
      Math.floor((now - date) / 1000);

    if (difference < 60) {
      return "Just now";
    }

    if (difference < 3600) {
      const minutes = Math.floor(difference / 60);
      return `${minutes} min ago`;
    }

    if (difference < 86400) {
      const hours = Math.floor(difference / 3600);
      return `${hours} hr ago`;
    }

    return date.toLocaleDateString();
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

  // =========================================================
  // RENDER
  // =========================================================

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

          {/* HISTORY BUTTON */}

          <button
            className={`qa-history-button ${
              historyOpen ? "active" : ""
            }`}
            onClick={() => setHistoryOpen(true)}
          >
            <CalendarClock size={18} />

            <span>View History</span>

            {history.length > 0 && (
              <span className="qa-history-count">
                {history.length}
              </span>
            )}
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

        {/* ANSWER */}

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


        {/* SOURCE */}

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

          <div className="qa-stat">
            <span>◈</span>

            <div>
              <small>Embedding Model</small>

              <strong>
                {analytics?.embeddingModel || "--"}
              </strong>
            </div>
          </div>

          <div className="qa-stat">
            <span>◷</span>

            <div>
              <small>Retrieval Time</small>

              <strong>
                {analytics?.retrievalTime || "--"}
              </strong>
            </div>
          </div>

          <div className="qa-stat">
            <span>⚙</span>

            <div>
              <small>LLM Model</small>

              <strong>
                {analytics?.llmModel || "--"}
              </strong>
            </div>
          </div>

          <div className="qa-stat">
            <span>◷</span>

            <div>
              <small>Response Time</small>

              <strong>
                {analytics?.responseTime || "--"}
              </strong>
            </div>
          </div>

          <div className="qa-stat">
            <span>♣</span>

            <div>
              <small>Confidence Score</small>

              <strong className="qa-confidence">
                {analytics?.confidence || "--"}
              </strong>
            </div>
          </div>

          <div className="qa-stat">
            <span>▤</span>

            <div>
              <small>Tokens Used</small>

              <strong>
                {analytics?.tokensUsed ?? "--"}
              </strong>
            </div>
          </div>

          <div className="qa-stat">
            <span>▱</span>

            <div>
              <small>Sources Used</small>

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


      {/* =====================================================
          HISTORY BACKDROP
      ===================================================== */}

      {historyOpen && (
        <div
          className="qa-history-backdrop"
          onClick={() => setHistoryOpen(false)}
        />
      )}


      {/* =====================================================
          HISTORY DRAWER
      ===================================================== */}

      <aside
        className={`qa-history-drawer ${
          historyOpen ? "open" : ""
        }`}
      >

        <div className="qa-history-drawer-header">

          <div>
            <div className="qa-history-title">
              <Clock3 size={20} />
              <h2>QA History</h2>
            </div>

            <p>
              Your previous questions
            </p>
          </div>

          <button
            className="qa-history-close"
            onClick={() => setHistoryOpen(false)}
          >
            <X size={20} />
          </button>

        </div>


        <div className="qa-history-list">

          {history.length === 0 ? (

            <div className="qa-history-empty">

              <CalendarClock size={38} />

              <h3>
                No history yet
              </h3>

              <p>
                Questions you ask will appear here.
              </p>

            </div>

          ) : (

            history.map((item) => (

              <button
                key={item.id}
                className="qa-history-item"
                onClick={() =>
                  handleHistorySelect(item.question)
                }
              >

                <div className="qa-history-item-content">

                  <span className="qa-history-question">
                    {item.question}
                  </span>

                  <span className="qa-history-time">
                    {formatHistoryTime(item.timestamp)}
                  </span>

                </div>

                <ChevronRight size={18} />

              </button>

            ))

          )}

        </div>


        {history.length > 0 && (
          <div className="qa-history-drawer-footer">

            <button
              onClick={handleClearHistory}
              className="qa-clear-history-button"
            >
              <Trash2 size={16} />
              Clear History
            </button>

          </div>
        )}

      </aside>

    </div>
  );
}

export default QuestionAnswerPage;