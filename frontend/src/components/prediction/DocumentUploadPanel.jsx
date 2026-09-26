import { useRef, useState } from "react";
import {
  CheckCircle2,
  FileText,
  Upload,
  X,
} from "lucide-react";

import { uploadPredictionDocument } from "../../services/predictionUploadService";


function DocumentUploadPanel({
  onClose,
  onUploadSuccess,
}) {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);


  // =========================================================
  // FILE VALIDATION
  // =========================================================

  const validateFile = (file) => {
    if (!file) {
      return "Please select a PDF file.";
    }

    if (file.type !== "application/pdf") {
      return "Only PDF files are supported.";
    }

    const maxFileSize = 50 * 1024 * 1024;

    if (file.size > maxFileSize) {
      return "Maximum file size is 50MB.";
    }

    return "";
  };


  // =========================================================
  // SELECT FILE
  // =========================================================

  const handleFileSelect = (file) => {
    setError("");
    setSuccess(false);

    const validationError = validateFile(file);

    if (validationError) {
      setSelectedFile(null);
      setError(validationError);
      return;
    }

    setSelectedFile(file);
  };


  // =========================================================
  // FILE INPUT
  // =========================================================

  const handleBrowse = () => {
    if (loading) return;

    fileInputRef.current?.click();
  };


  const handleInputChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFileSelect(file);
    }

    event.target.value = "";
  };


  // =========================================================
  // DRAG & DROP
  // =========================================================

  const handleDragOver = (event) => {
    event.preventDefault();

    if (loading) return;

    setDragActive(true);
  };


  const handleDragLeave = (event) => {
    event.preventDefault();

    setDragActive(false);
  };


  const handleDrop = (event) => {
    event.preventDefault();

    setDragActive(false);

    if (loading) return;

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFileSelect(file);
    }
  };


  // =========================================================
  // REMOVE FILE
  // =========================================================

  const handleRemoveFile = () => {
    if (loading) return;

    setSelectedFile(null);
    setError("");
    setSuccess(false);
  };


  // =========================================================
  // UPLOAD
  // =========================================================

  const handleUpload = async () => {
    if (!selectedFile || loading) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result =
        await uploadPredictionDocument(
          selectedFile
        );

      setSuccess(true);

      onUploadSuccess?.(result);

    } catch (err) {
      setError(
        err?.detail ||
        err?.message ||
        "Unable to upload the document."
      );
    } finally {
      setLoading(false);
    }
  };


  // =========================================================
  // FORMAT FILE SIZE
  // =========================================================

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };


  return (
    <div
      className="prediction-upload-overlay"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !loading
        ) {
          onClose?.();
        }
      }}
    >

      <section className="prediction-upload-panel">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="prediction-upload-header">

          <div>
            <h2>
              Upload Document
            </h2>

            <p>
              Add a PDF to use as retrieval context
              for word prediction.
            </p>
          </div>

          <button
            type="button"
            className="prediction-upload-close"
            onClick={onClose}
            disabled={loading}
            aria-label="Close upload panel"
          >
            <X size={18} />
          </button>

        </div>


        {/* =================================================
            DROP ZONE
        ================================================= */}

        {!selectedFile && (

          <button
            type="button"
            className={`prediction-upload-dropzone ${
              dragActive
                ? "prediction-upload-dropzone-active"
                : ""
            }`}
            onClick={handleBrowse}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            disabled={loading}
          >

            <div className="prediction-upload-icon">

              <Upload size={22} />

            </div>

            <strong>
              Drag & drop your PDF here
            </strong>

            <span>
              or click to browse
            </span>

            <small>
              PDF only • Maximum 50MB
            </small>

          </button>

        )}


        {/* =================================================
            SELECTED FILE
        ================================================= */}

        {selectedFile && (

          <div className="prediction-upload-file">

            <div className="prediction-upload-file-icon">
              <FileText size={22} />
            </div>

            <div className="prediction-upload-file-info">

              <strong>
                {selectedFile.name}
              </strong>

              <span>
                {formatFileSize(
                  selectedFile.size
                )}
              </span>

            </div>

            {!loading && !success && (

              <button
                type="button"
                className="prediction-upload-file-remove"
                onClick={handleRemoveFile}
                aria-label="Remove selected file"
              >
                <X size={16} />
              </button>

            )}

          </div>

        )}


        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (

          <div className="prediction-upload-success">

            <CheckCircle2 size={17} />

            <span>
              Document uploaded successfully.
            </span>

          </div>

        )}


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="prediction-upload-error">

            <span>
              {error}
            </span>

          </div>

        )}


        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="prediction-upload-actions">

          <button
            type="button"
            className="prediction-upload-cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"
            className="prediction-upload-submit"
            onClick={handleUpload}
            disabled={
              !selectedFile ||
              loading ||
              success
            }
          >

            {loading ? (
              <>
                <span className="prediction-upload-spinner" />
                Processing...
              </>
            ) : success ? (
              <>
                <CheckCircle2 size={16} />
                Uploaded
              </>
            ) : (
              <>
                <Upload size={16} />
                Upload PDF
              </>
            )}

          </button>

        </div>


        {/* =================================================
            HIDDEN FILE INPUT
        ================================================= */}

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleInputChange}
          hidden
        />

      </section>

    </div>
  );
}

export default DocumentUploadPanel;