import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

import "../styles/layout.css";

export default function MainLayout() {
    return (
        <div className="app-shell">

            <div className="workspace">

                {/* Sidebar */}

                <Sidebar />


                {/* Main Content */}

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