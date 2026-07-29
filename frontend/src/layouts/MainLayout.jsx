import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

import "../styles/layout.css";

export default function MainLayout() {
    return (
        <div className="app-shell">

            {/* Simulated Desktop Window */}

            <div className="window-bar">

                <div className="window-left">

                    <div className="window-logo">
                        A
                    </div>

                    <span>
                        RAG AI Workspace
                    </span>

                </div>

                <div className="window-controls">

                    <button>—</button>

                    <button>□</button>

                    <button>✕</button>

                </div>

            </div>

            {/* Workspace */}

            <div className="workspace">

                {/* Sidebar */}

                <Sidebar />

                {/* Main */}

                <section className="content-area">

                    <Navbar />

                    <main className="page-content">

                        <Outlet />

                    </main>

                </section>

            </div>

        </div>
    );
}