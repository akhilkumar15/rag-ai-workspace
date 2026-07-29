import { useNavigate } from "react-router-dom";
import {
  FileText,
  Database,
  Search,
  BrainCircuit,
  BadgeCheck,
  CalendarDays,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "PDF INTAKE",
    path: "/retrieval-viewer",
  },
  {
    icon: Database,
    title: "FAISS INDEX",
    path: "/retrieval-viewer",
  },
  {
    icon: Search,
    title: "TOP-K CHUNKS",
    path: "/retrieval-viewer",
  },
  {
    icon: BrainCircuit,
    title: "OLLAMA LLM",
    path: "/word-prediction",
  },
  {
    icon: BadgeCheck,
    title: "CITED ANSWER",
    path: "/question-answer",
  },
];

export default function WelcomeHero() {
  const navigate = useNavigate();

  return (
    <section className="welcome-hero">

      <div className="welcome-content">

        <div className="welcome-left">

          <h1 className="welcome-title">
            Welcome back
          </h1>

          <p className="welcome-subtitle">
            Your index is current and the retrieval pipeline is warm —
            pick up where a query left off.
          </p>

        </div>

        <div className="welcome-divider" />

        <div className="welcome-date">

          <CalendarDays size={18} />

          <div>
            {/* TODO: Replace with live date/time from Date() or backend */}
            
            <p className="date-label">
              TUE, 28 JUL 2026
            </p>

            <h3>03:45 PM IST</h3>

          </div>

        </div>

      </div>

      <div className="welcome-features">

        {features.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              type="button"
              className="feature-card"
              onClick={() => navigate(item.path)}
              aria-label={item.title}
            >
              <div className="feature-icon">
                <Icon size={24} />
              </div>

              <span>{item.title}</span>
            </button>
          );
        })}

      </div>

    </section>
  );
}