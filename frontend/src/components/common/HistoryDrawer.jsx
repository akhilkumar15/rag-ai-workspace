import {
  Clock3,
  X,
  Trash2,
  ArrowRight,
  History as HistoryIcon,
} from "lucide-react";

function HistoryDrawer({
  open,
  onClose,
  title,
  subtitle,
  items = [],
  onSelect,
  onClear,
}) {
  if (!open) {
    return null;
  }

  return (
    <>
      {/* -----------------------------------------------------
          BACKDROP
      ----------------------------------------------------- */}

      <div
        className="qa-history-backdrop"
        onClick={onClose}
      />

      {/* -----------------------------------------------------
          DRAWER
      ----------------------------------------------------- */}

      <aside
        className="qa-history-drawer open"
        aria-label={`${title} history`}
      >

        {/* ---------------------------------------------------
            HEADER
        --------------------------------------------------- */}

        <div className="qa-history-drawer-header">

          <div>
            <div className="qa-history-title">

              <Clock3 size={18} />

              <h2>
                {title}
              </h2>

            </div>

            <p>
              {subtitle || "Your previous activity"}
            </p>
          </div>


          <button
            type="button"
            className="qa-history-close"
            onClick={onClose}
            aria-label="Close history"
          >
            <X size={18} />
          </button>

        </div>


        {/* ---------------------------------------------------
            HISTORY LIST
        --------------------------------------------------- */}

        <div className="qa-history-list">

          {items.length === 0 ? (

            <div className="qa-history-empty">

              <HistoryIcon size={34} />

              <h3>
                No history yet
              </h3>

              <p>
                Your previous activity will appear here.
              </p>

            </div>

          ) : (

            items.map((item) => (

              <button
                type="button"
                className="qa-history-item"
                key={item.id}
                onClick={() => onSelect?.(item)}
              >

                <div className="qa-history-item-content">

                  <span className="qa-history-question">
                    {item.title || item.query || item.text}
                  </span>

                  <span className="qa-history-time">
                    {formatHistoryTime(item.timestamp)}
                  </span>

                </div>

                <ArrowRight size={16} />

              </button>

            ))

          )}

        </div>


        {/* ---------------------------------------------------
            FOOTER
        --------------------------------------------------- */}

        {items.length > 0 && (

          <div className="qa-history-drawer-footer">

            <button
              type="button"
              className="qa-clear-history-button"
              onClick={onClear}
            >

              <Trash2 size={15} />

              <span>
                Clear History
              </span>

            </button>

          </div>

        )}

      </aside>
    </>
  );
}


// ---------------------------------------------------------
// TIME FORMATTER
// ---------------------------------------------------------

function formatHistoryTime(timestamp) {
  if (!timestamp) {
    return "";
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();

  const difference =
    Math.floor((now.getTime() - date.getTime()) / 1000);

  if (difference < 60) {
    return "Just now";
  }

  if (difference < 3600) {
    const minutes = Math.floor(difference / 60);

    return `${minutes} ${
      minutes === 1 ? "minute" : "minutes"
    } ago`;
  }

  if (difference < 86400) {
    const hours = Math.floor(difference / 3600);

    return `${hours} ${
      hours === 1 ? "hour" : "hours"
    } ago`;
  }

  if (difference < 604800) {
    const days = Math.floor(difference / 86400);

    return `${days} ${
      days === 1 ? "day" : "days"
    } ago`;
  }

  return date.toLocaleDateString();
}

export default HistoryDrawer;