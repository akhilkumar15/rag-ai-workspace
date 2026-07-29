import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";

import "./styles/dashboard.css";

/* Global Styles */
import "./styles/variables.css";
import "./styles/theme.css";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                }}
            />

            <App />
        </BrowserRouter>
    </React.StrictMode>
);