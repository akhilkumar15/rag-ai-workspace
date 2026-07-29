import {
  Zap,
  Atom,
  Database,
  BrainCircuit,
  BookOpen,
  Link2,
  ArrowRight,
} from "lucide-react";

const technologies = [
  {
    icon: Zap,
    title: "FastAPI",
    subtitle: "backend",
  },
  {
    icon: Atom,
    title: "React",
    subtitle: "frontend",
  },
  {
    icon: Database,
    title: "FAISS",
    subtitle: "vector store",
  },
  {
    icon: BrainCircuit,
    title: "Ollama",
    subtitle: "local LLM",
  },
  {
    icon: BookOpen,
    title: "Wikipedia",
    subtitle: "knowledge source",
  },
  {
    icon: Link2,
    title: "LangChain",
    subtitle: "orchestration",
  },
];

export default function ProjectOverview() {
  return (
    <section className="project-overview">

      <div className="overview-header">

        <div>
          <h2>Project overview</h2>

          <p>
            A local-first RAG pipeline: PDFs are chunked, embedded,
            and served through a FastAPI backend to a React front end.
          </p>
        </div>

        <button className="architecture-btn">
          View architecture
          <ArrowRight size={16} />
        </button>

      </div>

      <div className="technology-grid">

        {technologies.map((tech) => {
          const Icon = tech.icon;

          return (
            <div
              key={tech.title}
              className="technology-card"
            >

              <div className="technology-icon">
                <Icon size={22} />
              </div>

              <div>

                <h4>{tech.title}</h4>

                <span>{tech.subtitle}</span>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}