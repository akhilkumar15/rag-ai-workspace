import { ChevronDown, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageInfo = {
  "/dashboard": "Dashboard",
  "/word-prediction": "Word Prediction",
  "/question-answer": "Question Answering",
  "/summarization": "Summarization",
  "/comparison": "Comparison",
  "/retrieval-viewer": "Retrieval Viewer",
  "/settings": "Settings",
};

export default function Navbar() {
  const location = useLocation();

  const currentTitle =
    pageInfo[location.pathname] || pageInfo["/dashboard"];

  return (
    <header className="navbar">

      {/* =====================================================
          LEFT — BREADCRUMB
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
            {currentTitle}
          </strong>

        </div>

      </div>


      {/* =====================================================
          RIGHT — SEARCH + PROFILE
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

          <span className="search-shortcut">
            
          </span>

        </div>


        {/* Profile */}

        <div className="profile-card">

          <div className="avatar">
            GU
          </div>


          <div className="profile-details">

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