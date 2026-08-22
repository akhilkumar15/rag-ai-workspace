import { useState } from "react";
import { askQuestion } from "../services/qaService";

function useQA() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ask = async (text) => {
    const value = text.trim();

    if (!value) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await askQuestion(value);

      setQuestion(value);
      setResult(data);

      return data;
    } catch (err) {
      console.error("QA Error:", err);

      setError(
        err?.detail ||
        err?.message ||
        "Unable to get an answer."
      );

      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setQuestion("");
    setResult(null);
    setError(null);
  };

  return {
    question,
    result,
    loading,
    error,
    ask,
    clear,
  };
}

export default useQA;