import { useState } from "react";
import {
  Upload,
  Clock3,
  X,
  UploadCloud,
  FileCheck2,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { uploadPredictionDocument } from "../../services/predictionUploadService";


function PredictionHeader({
  onHistoryClick,
  historyCount = 0,
}) {
  const [showUploadPanel, setShowUploadPanel] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const [isUploading, setIsUploading] =
    useState(false);

  const [uploadSuccess, setUploadSuccess] =
    useState(false);

  const [uploadError, setUploadError] =
    useState("");


  // =========================================================
  // FILE VALIDATION
  // =========================================================

  const validateFile = (file) => {
    if (!file) {
      return;
    }

    const extension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();

    if (
      file.type !== "application/pdf" &&
      extension !== ".pdf"
    ) {
      setUploadError(
        "Please upload a PDF file."
      );

      setSelectedFile(null);

      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setUploadError(
        "Maximum file size is 50MB."
      );

      setSelectedFile(null);

      return;
    }

    setSelectedFile(file);

    setUploadError("");
    setUploadSuccess(false);
  };


  // =========================================================
  // FILE SELECT
  // =========================================================

  const handleFileSelect = (event) => {
    validateFile(
      event.target.files?.[0]
    );
  };


  // =========================================================
  // DRAG & DROP
  // =========================================================

  const handleDrop = (event) => {
    event.preventDefault();

    setIsDragging(false);

    if (isUploading) {
      return;
    }

    validateFile(
      event.dataTransfer.files?.[0]
    );
  };


  const handleDragOver = (event) => {
    event.preventDefault();

    if (isUploading) {
      return;
    }

    setIsDragging(true);
  };


  const handleDragLeave = (event) => {
    event.preventDefault();

    setIsDragging(false);
  };


  // =========================================================
  // REMOVE FILE
  // =========================================================

  const removeFile = () => {
    if (isUploading) {
      return;
    }

    setSelectedFile(null);
    setUploadError("");
    setUploadSuccess(false);
  };


  // =========================================================
  // UPLOAD DOCUMENT
  // =========================================================

  const handleUpload = async () => {
    if (!selectedFile || isUploading) {
      return;
    }

    setIsUploading(true);
    setUploadError("");
    setUploadSuccess(false);

    try {
      const result =
        await uploadPredictionDocument(
          selectedFile
        );

      console.log(
        "Prediction document uploaded:",
        result
      );

      setUploadSuccess(true);

    } catch (error) {
      console.error(
        "Prediction document upload failed:",
        error
      );

      setUploadError(
        error?.detail ||
        error?.message ||
        "Unable to upload the document."
      );

    } finally {
      setIsUploading(false);
    }
  };


  // =========================================================
  // CLOSE PANEL
  // =========================================================

  const closePanel = () => {
    if (isUploading) {
      return;
    }

    setShowUploadPanel(false);
    setSelectedFile(null);
    setIsDragging(false);
    setUploadSuccess(false);
    setUploadError("");
  };


  return (
    <>
      <div className="prediction-header">

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <div className="prediction-header-left">

         <div className="prediction-page-logo">
           <Sparkles size={28} />
           <span className="prediction-logo-lines"></span>
         </div>

          <div className="prediction-header-text">

            <h1>
              Word prediction
            </h1>

            <p>
              Predict the next word using retrieved context and RAG.
            </p>

          </div>

        </div>


        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="prediction-header-actions">

          {/* View History */}

          <button
            type="button"
            className="prediction-header-button prediction-history-button"
            onClick={onHistoryClick}
          >
            <Clock3 size={17} />

            <span>
              View history
            </span>

            {historyCount > 0 && (
              <span className="prediction-history-count">
                {historyCount}
              </span>
              )}
          </button>


          {/* Upload Document */}

          <button
            type="button"
            className="prediction-header-button"
            onClick={() =>
              setShowUploadPanel(true)
            }
          >
            <Upload size={17} />

            <span>
              Upload doc
            </span>
          </button>


          {/* Ready */}

          <div className="prediction-ready">

            <span className="prediction-ready-dot"></span>

            <span>
              Ready
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          UPLOAD PANEL
      ===================================================== */}

      {showUploadPanel && (

        <div
          className="prediction-upload-overlay"
          onMouseDown={(event) => {

            if (
              event.target ===
                event.currentTarget &&
              !isUploading
            ) {
              closePanel();
            }

          }}
        >

          <div className="prediction-upload-panel">

            {/* =================================================
                PANEL HEADER
            ================================================= */}

            <div className="prediction-upload-panel-header">

              <div>

                <h2>
                  Upload Document
                </h2>

                <p>
                  Upload a PDF to use as context for word prediction.
                </p>

              </div>


              <button
                type="button"
                className="prediction-upload-close"
                onClick={closePanel}
                disabled={isUploading}
                aria-label="Close upload panel"
              >
                <X size={19} />
              </button>

            </div>


            {/* =================================================
                UPLOAD AREA
            ================================================= */}

            {!selectedFile && (

              <label
                className={`prediction-upload-zone ${
                  isDragging
                    ? "dragging"
                    : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >

                <UploadCloud size={30} />

                <strong>
                  Drag & drop your PDF here
                </strong>

                <span>
                  or
                </span>

                <span className="prediction-upload-browse">
                  Browse PDF
                </span>

                <small>
                  PDF • Maximum 50MB
                </small>

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileSelect}
                  disabled={isUploading}
                  hidden
                />

              </label>

            )}


            {/* =================================================
                SELECTED FILE
            ================================================= */}

            {selectedFile && (

              <div className="prediction-upload-selected">

                <div className="prediction-upload-file-icon">

                  {uploadSuccess ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <FileCheck2 size={20} />
                  )}

                </div>


                <div className="prediction-upload-file-info">

                  <strong>
                    {selectedFile.name}
                  </strong>

                  <span>
                    PDF •{" "}
                    {(
                      selectedFile.size /
                      1024
                    ).toFixed(1)}{" "}
                    KB
                  </span>

                </div>


                {!isUploading && !uploadSuccess && (

                  <button
                    type="button"
                    onClick={removeFile}
                    aria-label="Remove selected PDF"
                  >
                    <X size={17} />
                  </button>

                )}

              </div>

            )}


            {/* =================================================
                SUCCESS
            ================================================= */}

            {uploadSuccess && (

              <div className="prediction-upload-success">

                <CheckCircle2 size={17} />

                <span>
                  Document uploaded successfully and is now
                  active for word prediction.
                </span>

              </div>

            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {uploadError && (

              <div className="prediction-upload-error">

                {uploadError}

              </div>

            )}


            {/* =================================================
                ACTIONS
            ================================================= */}

            {selectedFile && !uploadSuccess && (

              <div className="prediction-upload-actions">

                <button
                  type="button"
                  className="prediction-upload-cancel"
                  onClick={closePanel}
                  disabled={isUploading}
                >
                  Cancel
                </button>


                <button
                  type="button"
                  className="prediction-upload-submit"
                  onClick={handleUpload}
                  disabled={isUploading}
                >

                  {isUploading ? (
                    <>
                      <Loader2
                        size={16}
                        className="prediction-upload-spinner-icon"
                      />

                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />

                      Upload PDF
                    </>
                  )}

                </button>

              </div>

            )}


            {/* =================================================
                SUCCESS ACTION
            ================================================= */}

            {uploadSuccess && (

              <div className="prediction-upload-actions">

                <button
                  type="button"
                  className="prediction-upload-submit"
                  onClick={closePanel}
                >
                  Done
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </>
  );
}


export default PredictionHeader;