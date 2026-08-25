import { useState } from "react";

import {
  Scale,
  History,
  CheckCircle2,
  FileText,
  X,
  GitCompare,
  AlertCircle,
  UploadCloud,
  Pencil,
  FileCheck2,
} from "lucide-react";

import useComparison from "../hooks/useComparison";

function ComparisonPage() {
  const {
    documentA,
    documentB,
    setDocumentA,
    setDocumentB,

    documentAFile,
    documentBFile,
    setDocumentAFile,
    setDocumentBFile,

    result,
    loading,
    error,
    compare,
    clear,
  } = useComparison();

  const [documentAMode, setDocumentAMode] = useState("paste");
  const [documentBMode, setDocumentBMode] = useState("paste");

  /* =========================================================
     FILE VALIDATION
  ========================================================= */

  const handleFileSelect = (event, documentType) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const allowedExtensions = [".pdf", ".txt", ".docx"];

    const extension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(extension)
    ) {
      alert("Please upload a PDF, TXT, or DOCX file.");
      event.target.value = "";
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert("Maximum file size is 50MB.");
      event.target.value = "";
      return;
    }

    if (documentType === "A") {
      setDocumentAFile(file);
      setDocumentAMode("upload");
    } else {
      setDocumentBFile(file);
      setDocumentBMode("upload");
    }
  };

  /* =========================================================
     REMOVE FILE
  ========================================================= */

  const removeFile = (documentType) => {
    if (documentType === "A") {
      setDocumentAFile(null);
    } else {
      setDocumentBFile(null);
    }
  };

  /* =========================================================
     CLEAR EVERYTHING
  ========================================================= */

  const handleClear = () => {
    clear();

    setDocumentAFile(null);
    setDocumentBFile(null);

    setDocumentAMode("paste");
    setDocumentBMode("paste");
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const documentAReady =
    documentAMode === "upload"
      ? Boolean(documentAFile)
      : Boolean(documentA.trim());

  const documentBReady =
    documentBMode === "upload"
      ? Boolean(documentBFile)
      : Boolean(documentB.trim());

  const canCompare =
    documentAReady &&
    documentBReady &&
    !loading;

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

          <button
            type="button"
            className="comparison-history-button"
          >
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

          {/* =================================================
              DOCUMENT A
          ================================================= */}

          <div className="comparison-document-input">

            <div className="comparison-document-label">

              <div className="comparison-document-title">

                <div className="comparison-file-icon">
                  <FileText size={20} />
                </div>

                <strong>Document A</strong>

              </div>

            </div>


            {/* INPUT MODE BUTTONS */}

            <div className="comparison-input-mode">

              <button
                type="button"
                className={`comparison-mode-button ${
                  documentAMode === "upload" ? "active" : ""
                }`}
                onClick={() => setDocumentAMode("upload")}
              >
                <UploadCloud size={15} />
                Upload
              </button>

              <button
                type="button"
                className={`comparison-mode-button ${
                  documentAMode === "paste" ? "active" : ""
                }`}
                onClick={() => setDocumentAMode("paste")}
              >
                <Pencil size={15} />
                Edit
              </button>

            </div>


            {/* UPLOAD */}

            {documentAMode === "upload" && (

              <label className="comparison-upload-zone">

                <UploadCloud size={24} />

                <strong>
                  Click to upload Document A
                </strong>

                <span>
                  PDF, TXT or DOCX • Max 50MB
                </span>

                <input
                  type="file"
                  accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(event) =>
                    handleFileSelect(event, "A")
                  }
                  hidden
                />

              </label>

            )}


            {/* SELECTED FILE */}

            {documentAMode === "upload" && documentAFile && (

              <div className="comparison-selected-file">

                <div className="comparison-selected-file-icon">
                  <FileCheck2 size={18} />
                </div>

                <div className="comparison-selected-file-info">

                  <strong>
                    {documentAFile.name}
                  </strong>

                  <span>
                    PDF / TXT / DOCX •{" "}
                    {(documentAFile.size / 1024).toFixed(1)} KB
                  </span>

                </div>

                <button
                  type="button"
                  onClick={() => removeFile("A")}
                  aria-label="Remove Document A"
                >
                  <X size={17} />
                </button>

              </div>

            )}


            {/* PASTE */}

            {documentAMode === "paste" && (

              <textarea
                className="comparison-content-textarea"
                value={documentA}
                onChange={(event) =>
                  setDocumentA(event.target.value)
                }
                placeholder="Enter or paste document A content..."
                rows={6}
              />

            )}

          </div>


          {/* =================================================
              VS
          ================================================= */}

          <div className="comparison-vs">
            VS
          </div>


          {/* =================================================
              DOCUMENT B
          ================================================= */}

          <div className="comparison-document-input">

            <div className="comparison-document-label">

              <div className="comparison-document-title">

                <div className="comparison-file-icon">
                  <FileText size={20} />
                </div>

                <strong>Document B</strong>

              </div>

            </div>


            {/* INPUT MODE BUTTONS */}

            <div className="comparison-input-mode">

              <button
                type="button"
                className={`comparison-mode-button ${
                  documentBMode === "upload" ? "active" : ""
                }`}
                onClick={() => setDocumentBMode("upload")}
              >
                <UploadCloud size={15} />
                Upload
              </button>

              <button
                type="button"
                className={`comparison-mode-button ${
                  documentBMode === "paste" ? "active" : ""
                }`}
                onClick={() => setDocumentBMode("paste")}
              >
                <Pencil size={15} />
                Edit
              </button>

            </div>


            {/* UPLOAD */}

            {documentBMode === "upload" && (

              <label className="comparison-upload-zone">

                <UploadCloud size={24} />

                <strong>
                  Click to upload Document B
                </strong>

                <span>
                  PDF, TXT or DOCX • Max 50MB
                </span>

                <input
                  type="file"
                  accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(event) =>
                    handleFileSelect(event, "B")
                  }
                  hidden
                />

              </label>

            )}


            {/* SELECTED FILE */}

            {documentBMode === "upload" && documentBFile && (

              <div className="comparison-selected-file">

                <div className="comparison-selected-file-icon">
                  <FileCheck2 size={18} />
                </div>

                <div className="comparison-selected-file-info">

                  <strong>
                    {documentBFile.name}
                  </strong>

                  <span>
                    PDF / TXT / DOCX •{" "}
                    {(documentBFile.size / 1024).toFixed(1)} KB
                  </span>

                </div>

                <button
                  type="button"
                  onClick={() => removeFile("B")}
                  aria-label="Remove Document B"
                >
                  <X size={17} />
                </button>

              </div>

            )}


            {/* PASTE */}

            {documentBMode === "paste" && (

              <textarea
                className="comparison-content-textarea"
                value={documentB}
                onChange={(event) =>
                  setDocumentB(event.target.value)
                }
                placeholder="Enter or paste document B content..."
                rows={6}
              />

            )}

          </div>


          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="comparison-selection-actions">

            <button
              type="button"
              className="comparison-button comparison-button-primary"
              onClick={compare}
              disabled={!canCompare}
            >

              <GitCompare size={17} />

              {loading
                ? "Comparing..."
                : "Compare Documents"}

            </button>


            <button
              type="button"
              className="comparison-button comparison-button-secondary"
              onClick={handleClear}
            >

              <X size={17} />

              Clear

            </button>

          </div>

        </div>


        <p className="comparison-helper">

          Choose how to provide each document:
          upload a PDF/TXT/DOCX file or enter/paste its content.

        </p>


        {/* ERROR */}

        {error && (

          <div className="comparison-error">

            <AlertCircle size={16} />

            <span>{error}</span>

          </div>

        )}

      </section>


      {/* =====================================================
          ACTUAL COMPARISON RESULT
          ONLY APPEARS AFTER SUCCESSFUL COMPARISON
      ===================================================== */}

      {result && (

        <section className="comparison-result-card">

          <div className="comparison-result-header">

            <div>

              <span className="comparison-result-label">
                Comparison Result
              </span>

              <h2>
                Document Analysis
              </h2>

            </div>

            <div className="comparison-result-status">
              <CheckCircle2 size={16} />
              Completed
            </div>

          </div>


          {/* DOCUMENT INFORMATION */}

          {result.documents && (

            <div className="comparison-result-documents">

              <div className="comparison-result-document">

                <span>Document A</span>

                <strong>
                  {result.documents.document_a?.file_name ||
                    "Text Input"}
                </strong>

                {result.documents.document_a?.file_type && (
                  <small>
                    {result.documents.document_a.file_type}
                    {result.documents.document_a.total_pages
                      ? ` • ${result.documents.document_a.total_pages} page${
                          result.documents.document_a.total_pages > 1
                            ? "s"
                            : ""
                        }`
                      : ""}
                  </small>
                )}

              </div>


              <div className="comparison-result-vs">
                VS
              </div>


              <div className="comparison-result-document">

                <span>Document B</span>

                <strong>
                  {result.documents.document_b?.file_name ||
                    "Text Input"}
                </strong>

                {result.documents.document_b?.file_type && (
                  <small>
                    {result.documents.document_b.file_type}
                    {result.documents.document_b.total_pages
                      ? ` • ${result.documents.document_b.total_pages} page${
                          result.documents.document_b.total_pages > 1
                            ? "s"
                            : ""
                        }`
                      : ""}
                  </small>
                )}

              </div>

            </div>

          )}


          {/* ACTUAL BACKEND RESPONSE */}

          <div className="comparison-result-content">

            <h3>AI Comparison</h3>

            <div className="comparison-result-text">

              {result.response || "No comparison result returned."}

            </div>

          </div>

        </section>

      )}

    </div>
  );
}

export default ComparisonPage;