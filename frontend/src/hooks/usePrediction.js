// frontend/src/hooks/usePrediction.js

import { useState } from "react";
import api from "../services/api";

const usePrediction = () => {
  const [predictions, setPredictions] = useState([]);
  const [context, setContext] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = async (text) => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      setError(null);

      console.log("================================");
      console.log("Sending Request...");
      console.log("Input:", text);

      const response = await api.post("/word-predict", {
        text,
      });

      console.log("Request Successful");
      console.log("Full Response:", response);
      console.log("Response Data:", response.data);

      setPredictions(response.data.predictions || []);
      setContext([]);

    } catch (err) {

      console.error("================================");
      console.error("Prediction Error");
      console.error("Complete Error:", err);

      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Response:", err.response.data);
      }

      setPredictions([]);
      setContext([]);

      setError(
        err.detail ||
        err.message ||
        "Prediction failed."
      );

    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPredictions([]);
    setContext([]);
    setError(null);
  };

  return {
    predictions,
    context,
    loading,
    error,
    predict,
    reset,
  };
};

export default usePrediction;