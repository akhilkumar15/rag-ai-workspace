import WelcomeHero from "./WelcomeHero";
import StatsCards from "./StatsCards";
import AIToolsPanel from "./AIToolsPanel";
import ProjectOverview from "./ProjectOverview";

import "../../styles/dashboard.css";

export default function DashboardPage() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-container">

        {/* Welcome Section */}
        <WelcomeHero />

        {/* Statistics */}
        <StatsCards />

        {/* AI Tools */}
        <AIToolsPanel />

        {/* Project Overview */}
        <ProjectOverview />

      </div>
    </main>
  );
}