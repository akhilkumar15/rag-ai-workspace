// frontend/src/services/api.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 30000,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      `➡️ ${config.method?.toUpperCase()} ${config.url}`
    );

    // Let Axios/browser automatically set:
    // multipart/form-data; boundary=...
    // when FormData is used.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );

    return Promise.reject(
      error.response?.data || {
        detail: "Unable to connect to the backend.",
      }
    );
  }
);

export default api;