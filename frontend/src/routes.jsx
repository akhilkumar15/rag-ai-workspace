import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import DashboardPage from "./pages/DashboardPage";
import WordPredictionPage from "./pages/WordPredictionPage";
import QuestionAnswerPage from "./pages/QuestionAnswerPage";
import SummarizationPage from "./pages/SummarizationPage";
import ComparisonPage from "./pages/ComparisonPage";
import RetrievalViewerPage from "./pages/RetrievalViewerPage";
import SettingsPage from "./pages/SettingsPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/word-prediction" element={<WordPredictionPage />} />
                <Route path="/question-answer" element={<QuestionAnswerPage />} />
                <Route path="/summarization" element={<SummarizationPage />} />
                <Route path="/comparison" element={<ComparisonPage />} />
                <Route path="/retrieval-viewer" element={<RetrievalViewerPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;