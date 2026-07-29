import { Bell, ChevronDown, Search } from "lucide-react";

export default function Navbar() {
    return (
        <header className="navbar">

            <div className="navbar-left">

                <div>

                    <h1 className="page-title">
                        Dashboard
                    </h1>

                    <p className="page-subtitle">
                        Monitor your retrieval pipeline and explore your AI workspace.
                    </p>

                </div>

            </div>

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

                    <div className="shortcut-key">
                        Ctrl K
                    </div>

                </div>

                {/* Notification */}

                <button className="notification-button">

                    <Bell size={20} />

                    <span className="notification-dot"></span>

                </button>

                {/* Profile */}

                <div className="profile-card">

                    <div className="avatar">
                        GU
                    </div>

                    <div className="profile-details">

                        <h4>
                            Guest User
                        </h4>

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