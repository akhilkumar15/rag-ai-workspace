import { useState } from "react";
import { compareDocuments } from "../services/comparisonService";

function useComparison() {
  const [documentA, setDocumentA] = useState("");
  const [documentB, setDocumentB] = useState("");

  const [documentAFile, setDocumentAFile] = useState(null);
  const [documentBFile, setDocumentBFile] = useState(null);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const compare = async () => {
    const hasDocumentA =
      documentAFile || documentA.trim();

    const hasDocumentB =
      documentBFile || documentB.trim();

    if (!hasDocumentA || !hasDocumentB) {
      setError(
        "Please provide both Document A and Document B."
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await compareDocuments({
        documentA,
        documentB,
        documentAFile,
        documentBFile,
      });

      setResult(data);

      return data;

    } catch (err) {
      console.error("Comparison Error:", err);

      setError(
        err?.response?.data?.detail ||
        err?.detail ||
        err?.message ||
        "Unable to compare the documents."
      );

      setResult(null);

    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setDocumentA("");
    setDocumentB("");

    setDocumentAFile(null);
    setDocumentBFile(null);

    setResult(null);
    setError(null);
  };

  return {
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
  };
}

export default useComparison;