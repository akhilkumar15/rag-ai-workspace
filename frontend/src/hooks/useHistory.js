import { useCallback, useEffect, useState } from "react";

const MAX_HISTORY_ITEMS = 20;

function useHistory(storageKey) {
  const [history, setHistory] = useState([]);

  // ---------------------------------------------------------
  // LOAD HISTORY
  // ---------------------------------------------------------

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(storageKey);

      if (!storedHistory) {
        setHistory([]);
        return;
      }

      const parsedHistory = JSON.parse(storedHistory);

      if (Array.isArray(parsedHistory)) {
        setHistory(parsedHistory);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Failed to load history:", error);
      setHistory([]);
    }
  }, [storageKey]);

  // ---------------------------------------------------------
  // SAVE HISTORY
  // ---------------------------------------------------------

  const saveHistory = useCallback(
    (item) => {
      if (!item) return;

      setHistory((previousHistory) => {
        const newItem = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...item,
        };

        const updatedHistory = [
          newItem,
          ...previousHistory,
        ].slice(0, MAX_HISTORY_ITEMS);

        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify(updatedHistory)
          );
        } catch (error) {
          console.error("Failed to save history:", error);
        }

        return updatedHistory;
      });
    },
    [storageKey]
  );

  // ---------------------------------------------------------
  // DELETE ONE HISTORY ITEM
  // ---------------------------------------------------------

  const removeHistoryItem = useCallback(
    (id) => {
      setHistory((previousHistory) => {
        const updatedHistory = previousHistory.filter(
          (item) => item.id !== id
        );

        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify(updatedHistory)
          );
        } catch (error) {
          console.error("Failed to update history:", error);
        }

        return updatedHistory;
      });
    },
    [storageKey]
  );

  // ---------------------------------------------------------
  // CLEAR HISTORY
  // ---------------------------------------------------------

  const clearHistory = useCallback(() => {
    setHistory([]);

    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  }, [storageKey]);

  return {
    history,
    saveHistory,
    removeHistoryItem,
    clearHistory,
  };
}

export default useHistory;