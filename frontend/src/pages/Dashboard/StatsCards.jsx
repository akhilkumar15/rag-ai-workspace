import {
  FileText,
  BrainCircuit,
  BookOpen,
  Server,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    icon: FileText,
    title: "DOCUMENTS INDEXED",
    value: "20,000",
    subtitle: "+ 1,250 this week",
    accent: "blue",
  },
  {
    icon: BrainCircuit,
    title: "PREDICTION ENGINE",
    value: "Ready",
    subtitle: "● operational, avg 340ms",
    accent: "green",
  },
  {
    icon: BookOpen,
    title: "KNOWLEDGE BASE",
    value: "Wikipedia",
    subtitle: "last sync • Jul 2026",
    accent: "orange",
  },
  {
    icon: Server,
    title: "BACKEND STATUS",
    value: "Connected",
    subtitle: "● FastAPI online",
    accent: "purple",
  },
];

export default function StatsCards() {
  return (
    <section className="stats-grid">
      {stats.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`stat-card ${card.accent}`}
          >
            <div className="stat-top">
              <div className="stat-icon">
                <Icon size={22} />
              </div>

              <TrendingUp
                size={18}
                className="trend-icon"
              />
            </div>

            <p className="stat-title">
              {card.title}
            </p>

            <h2 className="stat-value">
              {card.value}
            </h2>

            <span className="stat-subtitle">
              {card.subtitle}
            </span>
          </div>
        );
      })}
    </section>
  );
}