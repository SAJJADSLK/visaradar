/* =============================================================
   useWheelStorage Hook — SpinPick Clone
   Manages local storage persistence for wheel configurations
   ============================================================= */

import { useState, useEffect } from "react";

export interface WheelData {
  id: string;
  title: string;
  entries: string[];
  color?: string;
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "spinpick_wheels";

export function useWheelStorage() {
  const [wheels, setWheels] = useState<WheelData[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load wheels from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setWheels(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load wheels from storage:", error);
    }
    setLoaded(true);
  }, []);

  // Save wheels to localStorage whenever they change
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wheels));
      } catch (error) {
        console.error("Failed to save wheels to storage:", error);
      }
    }
  }, [wheels, loaded]);

  const saveWheel = (title: string, entries: string[]) => {
    const id = Date.now().toString();
    const newWheel: WheelData = {
      id,
      title,
      entries,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setWheels((prev) => [newWheel, ...prev]);
    return id;
  };

  const updateWheel = (id: string, title: string, entries: string[]) => {
    setWheels((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, title, entries, updatedAt: Date.now() }
          : w
      )
    );
  };

  const deleteWheel = (id: string) => {
    setWheels((prev) => prev.filter((w) => w.id !== id));
  };

  const getWheel = (id: string) => {
    return wheels.find((w) => w.id === id);
  };

  const getAllWheels = () => {
    return wheels;
  };

  const clearAllWheels = () => {
    setWheels([]);
  };

  return {
    wheels,
    loaded,
    saveWheel,
    updateWheel,
    deleteWheel,
    getWheel,
    getAllWheels,
    clearAllWheels,
  };
}
