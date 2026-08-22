import {
  Settings,
  RotateCcw,
  Save,
  ChevronDown,
  Trash2,
  RefreshCw,
  Download,
  Upload,
  Server,
  Database,
  Brain,
  Network,
  Bell,
  Search,
  Shield,
  HardDrive,
  Cpu,
} from "lucide-react";



function SettingsPage() {
  return (
    <div className="settings-page">

      {/* ================= HEADER ================= */}
      <div className="settings-page-header">

        <div className="settings-title-section">
          <div className="settings-title-icon">
            <Settings size={30} />
          </div>

          <div>
            <h1>Settings</h1>
            <p>
              Configure the system preferences, models, and application behavior.
            </p>
          </div>
        </div>

        <div className="settings-header-actions">
          <button className="settings-reset-button">
            <RotateCcw size={16} />
            Reset to Defaults
          </button>

          <button className="settings-save-button">
            <Save size={16} />
            Save Changes
          </button>
        </div>

      </div>


      {/* ================= TABS ================= */}

      <div className="settings-tabs">
        <button className="settings-tab active">General</button>
        <button className="settings-tab">Models</button>
        <button className="settings-tab">Retrieval</button>
        <button className="settings-tab">LLM</button>
        <button className="settings-tab">UI / Display</button>
        <button className="settings-tab">Advanced</button>
      </div>


      {/* ================= MAIN GRID ================= */}

      <div className="settings-content-grid">

        {/* ================= LEFT COLUMN ================= */}

        <div className="settings-left-column">

          {/* GENERAL SETTINGS */}

          <div className="settings-card">

            <div className="settings-card-header">
              <h2>General Settings</h2>
            </div>

            <div className="settings-form">

              <div className="settings-form-row">
                <label>Application Name</label>

                <input
                  type="text"
                  defaultValue="RAG AI Workspace"
                />
              </div>


              <div className="settings-form-row">
                <label>Application Description</label>

                <textarea
                  defaultValue="Retrieval-Augmented AI Workspace for intelligent information retrieval and analysis."
                />
              </div>


              <div className="settings-form-row">
                <label>Language</label>

                <div className="settings-select-wrapper">
                  <select defaultValue="English">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Telugu</option>
                  </select>

                  <ChevronDown size={16} />
                </div>
              </div>


              <div className="settings-form-row">
                <label>Timezone</label>

                <div className="settings-select-wrapper">
                  <select defaultValue="(UTC+05:30) Asia/Kolkata">
                    <option>(UTC+05:30) Asia/Kolkata</option>
                    <option>(UTC+00:00) UTC</option>
                    <option>(UTC-05:00) America/New_York</option>
                  </select>

                  <ChevronDown size={16} />
                </div>
              </div>


              <div className="settings-form-row">
                <label>Items per page</label>

                <div className="settings-select-wrapper">
                  <select defaultValue="10">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                  </select>

                  <ChevronDown size={16} />
                </div>
              </div>


              <div className="settings-toggle-row">
                <div>
                  <strong>Enable dark mode</strong>
                </div>

                <label className="settings-switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>


              <div className="settings-toggle-row">

                <div>
                  <strong>Enable telemetry</strong>
                  <small>
                    Help improve the product by sending anonymous usage data.
                  </small>
                </div>

                <label className="settings-switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>

              </div>


              <div className="settings-toggle-row">

                <div>
                  <strong>Auto save</strong>
                  <small>
                    Automatically save your work and preferences.
                  </small>
                </div>

                <label className="settings-switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>

              </div>

            </div>

          </div>


          {/* SYSTEM STATUS */}

          <div className="settings-card">

            <div className="settings-card-header">
              <h2>System Status</h2>
            </div>

            <div className="system-status-grid">

              <div className="system-status-card">
                <div className="system-status-icon green">
                  <Server size={21} />
                </div>

                <div>
                  <strong>Backend</strong>
                  <span className="status-online">
                    ● Connected
                  </span>
                </div>
              </div>


              <div className="system-status-card">
                <div className="system-status-icon blue">
                  <Database size={21} />
                </div>

                <div>
                  <strong>Vector Database</strong>
                  <span className="status-online">
                    ● FAISS
                  </span>
                </div>
              </div>


              <div className="system-status-card">
                <div className="system-status-icon purple">
                  <Brain size={21} />
                </div>

                <div>
                  <strong>LLM Service</strong>
                  <span className="status-online">
                    ● llama3
                  </span>
                </div>
              </div>


              <div className="system-status-card">
                <div className="system-status-icon orange">
                  <Network size={21} />
                </div>

                <div>
                  <strong>Embedding Model</strong>
                  <span className="status-online">
                    ● all-MiniLM-L6-v2
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>


        {/* ================= RIGHT COLUMN ================= */}

        <div className="settings-right-column">

          {/* SYSTEM PREFERENCES */}

          <div className="settings-card">

            <div className="settings-card-header">
              <h2>System Preferences</h2>
            </div>


            <div className="preference-list">

              <div className="preference-row">
                <div>
                  <strong>Show source details by default</strong>
                  <small>Display source information in results.</small>
                </div>

                <label className="settings-switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>


              <div className="preference-row">
                <div>
                  <strong>Enable query suggestions</strong>
                  <small>Show suggested queries while typing.</small>
                </div>

                <label className="settings-switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>


              <div className="preference-row">
                <div>
                  <strong>Enable query history</strong>
                  <small>Save and show your recent queries.</small>
                </div>

                <label className="settings-switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>


              <div className="preference-row">
                <div>
                  <strong>Confirm before clearing data</strong>
                  <small>Ask for confirmation before clearing any data.</small>
                </div>

                <label className="settings-switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>


              <div className="preference-row">
                <div>
                  <strong>Notifications</strong>
                  <small>Enable system notifications.</small>
                </div>

                <label className="settings-switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>

            </div>

          </div>


          {/* DATA MANAGEMENT */}

          <div className="settings-card">

            <div className="settings-card-header">
              <h2>Data Management</h2>
            </div>


            <div className="management-list">

              <div className="management-row">

                <div>
                  <strong>Clear Query History</strong>
                  <small>Remove all saved queries from the system.</small>
                </div>

                <button className="management-danger">
                  <Trash2 size={15} />
                  Clear
                </button>

              </div>


              <div className="management-row">

                <div>
                  <strong>Clear Cached Results</strong>
                  <small>Remove all cached retrieval results.</small>
                </div>

                <button className="management-danger">
                  <Trash2 size={15} />
                  Clear
                </button>

              </div>


              <div className="management-row">

                <div>
                  <strong>Rebuild Vector Index</strong>
                  <small>Rebuild the FAISS index from processed data.</small>
                </div>

                <button className="management-warning">
                  <RefreshCw size={15} />
                  Rebuild
                </button>

              </div>


              <div className="management-row">

                <div>
                  <strong>Export Settings</strong>
                  <small>Download your current settings as a JSON file.</small>
                </div>

                <button className="management-export">
                  <Download size={15} />
                  Export
                </button>

              </div>


              <div className="management-row">

                <div>
                  <strong>Import Settings</strong>
                  <small>Import settings from a previously exported file.</small>
                </div>

                <button className="management-import">
                  <Upload size={15} />
                  Import
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================= FOOTER TIP ================= */}

      <div className="settings-tip">
        <Shield size={17} />

        <span>
          Changes are applied immediately for most settings. Some changes may
          require rebuilding the index or restarting the service.
        </span>
      </div>

    </div>
  );
}

export default SettingsPage;