import { useRef } from "react";

import {
  FileText,
  History,
  CheckCircle2,
  UploadCloud,
  X,
  Sparkles,
  RotateCcw,
  Copy,
  BrainCircuit,
  Clock3,
  Cpu,
  FileCheck2,
  ShieldCheck,
  Database,
  Layers3,
  Lightbulb,
} from "lucide-react";

import useSummary from "../hooks/useSummary";

function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) {
    return "—";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}


function SummarizationPage() {

  const {
    file,
    result,
    loading,
    error,
    selectFile,
    summarize,
    clear,
  } = useSummary();

  const fileInputRef = useRef(null);


  // =========================================================
  // FILE VALIDATION
  // =========================================================

  const handleFileSelect = (selectedFile) => {

    if (!selectedFile) {
      return;
    }

    const allowedTypes = [
      ".pdf",
      ".txt",
      ".docx",
    ];

    const extension =
      "." +
      selectedFile.name
        .split(".")
        .pop()
        .toLowerCase();

    if (!allowedTypes.includes(extension)) {
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      return;
    }

    selectFile(selectedFile);
  };


  // =========================================================
  // FILE INPUT
  // =========================================================

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };


  const handleInputChange = (event) => {

    const selectedFile =
      event.target.files?.[0];

    handleFileSelect(selectedFile);
  };


  // =========================================================
  // DRAG AND DROP
  // =========================================================

  const handleDrop = (event) => {

    event.preventDefault();

    const droppedFile =
      event.dataTransfer.files?.[0];

    handleFileSelect(droppedFile);
  };


  const handleDragOver = (event) => {
    event.preventDefault();
  };


  // =========================================================
  // CLEAR
  // =========================================================

  const handleClear = () => {

    clear();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  // =========================================================
  // COPY SUMMARY
  // =========================================================

  const handleCopy = async () => {

    if (!result?.response) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        result.response
      );
    } catch (copyError) {
      console.error(
        "Copy failed:",
        copyError
      );
    }
  };


  // =========================================================
  // DISPLAY DATA
  // =========================================================

  const documentData =
    result?.document || {};

  const analytics =
    result?.analytics || {};

  const summaryText =
    result?.response || "";

  const summaryWords =
    analytics.summaryLength ||
    "—";

  const processingTime =
    analytics.processingTime ||
    "—";

  const tokensUsed =
    analytics.tokensUsed ??
    "—";

  const chunksUsed =
    analytics.chunksUsed ??
    "—";

  const confidence =
    analytics.confidence ||
    "—";

  const embeddingModel =
    analytics.embeddingModel ||
    "—";

  const llmModel =
    analytics.llmModel ||
    "—";


  return (
    <main className="summarization-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="summarization-header">

        <div className="summarization-header-left">

          <div className="summarization-icon">
            <FileText size={32} />
          </div>

          <div>
            <h1>Summarization</h1>

            <p>
              Upload a document and get an AI-generated summary.
            </p>
          </div>

        </div>

        <div className="summarization-header-actions">

          <button className="summarization-history-button">
            <History size={18} />
            <span>View History</span>
          </button>

          <div className="summarization-ready-status">
            <CheckCircle2 size={16} />
            <span>Ready</span>
          </div>

        </div>

      </header>


      {/* =====================================================
          UPLOAD DOCUMENT
      ===================================================== */}

      <section className="summarization-upload-card">

        <h2>Upload Document</h2>

        <div className="summarization-upload-row">

          {/* Hidden File Input */}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.docx"
            onChange={handleInputChange}
            style={{ display: "none" }}
          />


          {/* Upload Area */}

          <div
            className="summarization-drop-zone"
            onClick={handleBrowse}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {

              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                handleBrowse();
              }

            }}
          >

            <UploadCloud size={30} />

            <div>

              <p>
                Drag and drop your file here, or{" "}
                <span>click to browse</span>
              </p>

              <small>
                Supports PDF, TXT, DOCX&nbsp; • &nbsp;Max file size: 50MB
              </small>

            </div>

          </div>


          {/* Selected File */}

          {file && (

            <div className="summarization-file-card">

              <div className="summarization-file-icon">
                <FileText size={22} />
              </div>

              <div className="summarization-file-info">

                <strong>
                  {file.name}
                </strong>

                <span>
                  {file.name
                    .split(".")
                    .pop()
                    .toUpperCase()}
                  &nbsp; • &nbsp;
                  {formatFileSize(file.size)}
                </span>

              </div>

              <button
                className="summarization-remove-file"
                aria-label="Remove file"
                onClick={handleClear}
              >
                <X size={20} />
              </button>

            </div>

          )}


          {/* Actions */}

          <div className="summarization-upload-actions">

            <button
              className="summarization-generate-button"
              onClick={summarize}
              disabled={!file || loading}
            >

              <Sparkles size={18} />

              <span>
                {loading
                  ? "Generating..."
                  : "Generate Summary"}
              </span>

            </button>

            <button
              className="summarization-clear-button"
              onClick={handleClear}
              disabled={loading}
            >

              <RotateCcw size={18} />

              <span>Clear</span>

            </button>

          </div>

        </div>

        <p className="summarization-upload-helper">
          {error ||
            "The document will be processed and summarized using AI."}
        </p>

      </section>


      {/* =====================================================
          SUMMARY + DOCUMENT DETAILS
      ===================================================== */}

      <section className="summarization-main-grid">

        {/* Summary */}

        <article className="summary-card">

          <h2>Summary</h2>

          <div className="summary-content">

            {summaryText ? (

              <p>
                {summaryText}
              </p>

            ) : (

              <p>
                Upload a document and generate a summary to see
                the AI-generated result here.
              </p>

            )}

          </div>

          <div className="summary-footer">

            <button
              className="summary-copy-button"
              aria-label="Copy summary"
              onClick={handleCopy}
              disabled={!summaryText}
            >
              <Copy size={18} />
            </button>

            <div className="summary-meta">

              <span>
                {summaryWords}
              </span>

              <span>•</span>

              <span>
                Confidence:
                <strong>{confidence}</strong>
              </span>

            </div>

          </div>

        </article>


        {/* Document Details */}

        <article className="document-details-card">

          <h2>Document Details</h2>

          <div className="document-details-list">

            <div className="document-detail-row">
              <span>File Name</span>
              <strong>
                {documentData.file_name || "—"}
              </strong>
            </div>

            <div className="document-detail-row">
              <span>File Type</span>
              <strong>
                {documentData.file_type || "—"}
              </strong>
            </div>

            <div className="document-detail-row">
              <span>File Size</span>
              <strong>
                {formatFileSize(documentData.file_size)}
              </strong>
            </div>

            <div className="document-detail-row">
              <span>Total Pages</span>
              <strong>
                {documentData.total_pages ?? "—"}
              </strong>
            </div>

            <div className="document-detail-row">
              <span>Uploaded On</span>
              <strong>
                {documentData.uploaded_on || "—"}
              </strong>
            </div>

          </div>


          {/* Statistics */}

          <div className="summary-statistics">

            <h3>Summary Statistics</h3>

            <div className="summary-stat-grid">

              <div className="summary-stat">
                <span>Processing Time</span>

                <strong className="stat-success">
                  {processingTime}
                </strong>
              </div>

              <div className="summary-stat">
                <span>Tokens Used</span>

                <strong>
                  {tokensUsed}
                </strong>
              </div>

              <div className="summary-stat">
                <span>Chunks Used</span>

                <strong>
                  {chunksUsed}
                </strong>
              </div>

              <div className="summary-stat">
                <span>Summary Length</span>

                <strong>
                  {summaryWords}
                </strong>
              </div>

            </div>

          </div>

        </article>

      </section>


      {/* =====================================================
          SUMMARIZATION ANALYTICS
      ===================================================== */}

      <section className="summarization-analytics">

        <div className="analytics-header">

          <h2>Summarization Analytics</h2>

        </div>

        <div className="summarization-analytics-grid">

          <div className="summary-analytics-item">
            <BrainCircuit size={22} />

            <div>
              <span>Embedding Model</span>

              <strong>
                {embeddingModel}
              </strong>
            </div>
          </div>


          <div className="summary-analytics-item">
            <Clock3 size={22} />

            <div>
              <span>Processing Time</span>

              <strong>
                {processingTime}
              </strong>
            </div>
          </div>


          <div className="summary-analytics-item">
            <Cpu size={22} />

            <div>
              <span>LLM Model</span>

              <strong>
                {llmModel}
              </strong>
            </div>
          </div>


          <div className="summary-analytics-item">
            <FileCheck2 size={22} />

            <div>
              <span>Summary Length</span>

              <strong>
                {summaryWords}
              </strong>
            </div>
          </div>


          <div className="summary-analytics-item">
            <ShieldCheck size={22} />

            <div>
              <span>Confidence (Top 1)</span>

              <strong className="stat-success">
                {confidence}
              </strong>
            </div>
          </div>


          <div className="summary-analytics-item">
            <Database size={22} />

            <div>
              <span>Tokens Used</span>

              <strong>
                {tokensUsed}
              </strong>
            </div>
          </div>


          <div className="summary-analytics-item">
            <Layers3 size={22} />

            <div>
              <span>Chunks Used</span>

              <strong>
                {chunksUsed}
              </strong>
            </div>
          </div>

        </div>


        {/* Tip */}

        <div className="summarization-tip">

          <Lightbulb size={18} />

          <span>
            <strong>Tip:</strong> Longer documents may take more time to
            process. AI summaries capture key information and main points.
          </span>

        </div>

      </section>

    </main>
  );
}

export default SummarizationPage;