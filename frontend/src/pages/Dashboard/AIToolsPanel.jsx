import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  MessageCircle,
  FileText,
  Scale,
  Search,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    id: "01",
    icon: BrainCircuit,
    title: "Word Prediction",
    path: "/word-prediction",
    description:
      "Predicts the next likely word using retrieved context, so you can see how grounding changes a completion in real time.",
    tag: "RAG + context",
  },
  {
    id: "02",
    icon: MessageCircle,
    title: "Question Answering",
    path: "/question-answer",
    description:
      "Ask a question in plain language and get an answer pulled straight from your indexed PDFs, with the source chunk attached.",
    tag: "source-cited",
  },
  {
    id: "03",
    icon: FileText,
    title: "Summarization",
    path: "/summarization",
    description:
      "Condenses long documents into a short brief, holding on to the details that would matter to someone skimming for the first time.",
    tag: "~4s / doc",
  },
  {
    id: "04",
    icon: Scale,
    title: "Comparison",
    path: "/comparison",
    description:
      "Places two documents side by side and surfaces where they actually agree, contradict, or diverge in wording and meaning.",
    tag: "2-doc diff",
  },
  {
    id: "05",
    icon: Search,
    title: "Retrieval Viewer",
    path: "/retrieval-viewer",
    description:
      "Opens the hood on a query — every chunk that was retrieved, its similarity score, and which page it came from.",
    tag: "similarity scores",
  },
];

export default function AIToolsPanel() {
  const navigate = useNavigate();

  return (
    <section className="tools-section">

      <div className="tools-header">
        <div>
          <h2>AI Tools</h2>
          <p>Five ways to work with what's been indexed</p>
        </div>
      </div>

      <div className="tools-list">

        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <div
              key={tool.id}
              className="tool-row"
            >
              <div className="tool-number">
                {tool.id}
              </div>

              <div className="tool-icon">
                <Icon size={20} />
              </div>

              <div className="tool-content">
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
              </div>

              <div className="tool-tag">
                {tool.tag}
              </div>

              <button
                type="button"
                className="tool-button"
                onClick={() => navigate(tool.path)}
                aria-label={`Open ${tool.title}`}
              >
                Open
                <ArrowRight size={16} />
              </button>

            </div>
          );
        })}

      </div>

    </section>
  );
}