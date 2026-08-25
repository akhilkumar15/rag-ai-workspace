import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Wand2,
  MessageCircleQuestion,
  FileText,
  Scale,
  Search,
  Settings,
  Activity,
} from "lucide-react";


const workspace = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Word Prediction",
    path: "/word-prediction",
    icon: Wand2,
  },
  {
    name: "Question Answering",
    path: "/question-answer",
    icon: MessageCircleQuestion,
  },
  {
    name: "Summarization",
    path: "/summarization",
    icon: FileText,
  },
  {
    name: "Comparison",
    path: "/comparison",
    icon: Scale,
  },
  {
    name: "Retrieval Viewer",
    path: "/retrieval-viewer",
    icon: Search,
  },
  {
    name: "Upload Documents",
    path: "/upload-documents",
    icon: FileText,
  },
];


export default function Sidebar() {

  return (

    <aside className="sidebar">

      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="sidebar-logo">

        <div className="logo-icon">
          A
        </div>

        <div>

          <h2>
            RAG AI Workspace
          </h2>

          <p>
            Retrieval-Augmented
            <br />
            AI Workspace
          </p>

        </div>

      </div>


      {/* =====================================================
          WORKSPACE
      ===================================================== */}

      <div className="sidebar-section">

        <span className="sidebar-heading">
          WORKSPACE
        </span>


        {workspace.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >

              <Icon size={18} />

              <span>
                {item.name}
              </span>

            </NavLink>

          );

        })}

      </div>


      {/* =====================================================
          SYSTEM
      ===================================================== */}

      <div className="sidebar-section">

        <span className="sidebar-heading">
          SYSTEM
        </span>


        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >

          <Settings size={18} />

          <span>
            Settings
          </span>

        </NavLink>

      </div>


      {/* =====================================================
          BACKEND STATUS
      ===================================================== */}

      <div className="sidebar-footer">

        <div className="backend-title">

          <Activity
            size={15}
            className="backend-icon"
          />

          <span>
            Backend connected
          </span>

        </div>


        <small>
          FastAPI + FAISS
        </small>


        <p>
          All systems operational
        </p>


        <span className="backend-version">
          v1.0.0
        </span>

      </div>

    </aside>

  );

}