import { useState } from "react";
import { summarizeDocument } from "../services/summaryService";

function useSummary() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectFile = (selectedFile) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };

  const summarize = async () => {
    if (!file) {
      setError("Please select a document first.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await summarizeDocument(file);

      setResult(data);

      return data;
    } catch (err) {
      console.error("Summarization Error:", err);

      setError(
        err?.detail ||
        err?.message ||
        "Unable to summarize the document."
      );

      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return {
    file,
    result,
    loading,
    error,
    selectFile,
    summarize,
    clear,
  };
}

export default useSummary;