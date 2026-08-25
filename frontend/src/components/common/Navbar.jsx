import { ChevronDown, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageInfo = {
  "/dashboard": {
    title: "Dashboard",
    subtitle:
      "Monitor your retrieval pipeline and explore your AI workspace.",
  },

  "/word-prediction": {
    title: "Word Prediction",
    subtitle:
      "Predict the most likely next words using your RAG pipeline.",
  },

  "/question-answer": {
    title: "Question Answering",
    subtitle:
      "Ask questions and retrieve answers from your knowledge base.",
  },

  "/summarization": {
    title: "Summarization",
    subtitle:
      "Upload a document and get an AI-generated summary.",
  },

  "/comparison": {
    title: "Comparison",
    subtitle:
      "Compare two documents and identify similarities and differences.",
  },

  "/retrieval-viewer": {
    title: "Retrieval Viewer",
    subtitle:
      "Inspect retrieved chunks, relevance scores, and sources for any query.",
  },

  "/upload-documents": {
    title: "Upload Documents",
    subtitle:
      "Add documents to your RAG knowledge base.",
  },

  "/settings": {
    title: "Settings",
    subtitle:
      "Configure your RAG AI Workspace.",
  },
};


export default function Navbar() {

  const location = useLocation();

  const current =
    pageInfo[location.pathname] ||
    pageInfo["/dashboard"];


  return (
    <header className="navbar">

      {/* =====================================================
          LEFT
      ===================================================== */}

      <div className="navbar-left">

        <div className="navbar-breadcrumb">

          <span>
            Dashboard
          </span>

          <span className="breadcrumb-separator">
            &gt;
          </span>

          <strong>
            {current.title}
          </strong>

        </div>


        <h1 className="page-title">
          {current.title}
        </h1>


        <p className="page-subtitle">
          {current.subtitle}
        </p>

      </div>


      {/* =====================================================
          RIGHT
      ===================================================== */}

      <div className="navbar-right">

        {/* Search */}

        <div className="search-wrapper">

          <Search
            size={18}
            className="search-icon"
          />

          <input
            type="text"
            placeholder="Search anything..."
          />

        </div>


        {/* Profile */}

        <div className="profile-card">

          <div className="avatar">
            GU
          </div>


          <div className="profile-details">

            <h4>
              Guest User
            </h4>

            <span>

              <span className="online-dot"></span>

              Online

            </span>

          </div>


          <ChevronDown size={17} />

        </div>

      </div>

    </header>
  );
}