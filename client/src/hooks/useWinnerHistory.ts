/* =============================================================
   useWinnerHistory Hook — SpinPick Clone
   Tracks winner history for each wheel
   ============================================================= */

import { useState, useEffect } from "react";

export interface WinnerRecord {
  winner: string;
  wheelId: string;
  timestamp: number;
}

const HISTORY_KEY = "spinpick_history";
const MAX_HISTORY = 1000;

export function useWinnerHistory() {
  const [history, setHistory] = useState<WinnerRecord[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load history from storage:", error);
    }
    setLoaded(true);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      } catch (error) {
        console.error("Failed to save history to storage:", error);
      }
    }
  }, [history, loaded]);

  const addWinner = (winner: string, wheelId: string) => {
    const record: WinnerRecord = {
      winner,
      wheelId,
      timestamp: Date.now(),
    };
    setHistory((prev) => {
      const updated = [record, ...prev];
      // Keep only the last MAX_HISTORY records
      return updated.slice(0, MAX_HISTORY);
    });
  };

  const getWheelHistory = (wheelId: string) => {
    return history.filter((r) => r.wheelId === wheelId);
  };

  const getRecentWinners = (limit = 10) => {
    return history.slice(0, limit);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const clearWheelHistory = (wheelId: string) => {
    setHistory((prev) => prev.filter((r) => r.wheelId !== wheelId));
  };

  const getWinnerStats = (wheelId: string) => {
    const wheelHistory = getWheelHistory(wheelId);
    const stats: Record<string, number> = {};
    wheelHistory.forEach((record) => {
      stats[record.winner] = (stats[record.winner] || 0) + 1;
    });
    return stats;
  };

  return {
    history,
    loaded,
    addWinner,
    getWheelHistory,
    getRecentWinners,
    clearHistory,
    clearWheelHistory,
    getWinnerStats,
  };
}
