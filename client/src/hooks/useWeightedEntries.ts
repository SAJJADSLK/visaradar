/* =============================================================
   useWeightedEntries Hook — SpinPick Clone
   Manages weighted entries with probability calculations
   ============================================================= */

import { useState, useCallback } from "react";
import { WeightedEntry, selectWeightedRandom, calculateProbabilities, validateWeights } from "@/lib/weightedSelection";

export function useWeightedEntries(initialEntries: string[] = []) {
  const [weightedEntries, setWeightedEntries] = useState<WeightedEntry[]>(
    initialEntries.map((name) => ({ name, weight: 1 }))
  );

  const addEntry = useCallback((name: string, weight: number = 1) => {
    setWeightedEntries((prev) => {
      // Check if entry already exists
      if (prev.some((e) => e.name === name)) {
        return prev;
      }
      return [...prev, { name, weight: Math.max(0, weight) }];
    });
  }, []);

  const removeEntry = useCallback((name: string) => {
    setWeightedEntries((prev) => prev.filter((e) => e.name !== name));
  }, []);

  const updateWeight = useCallback((name: string, weight: number) => {
    setWeightedEntries((prev) =>
      prev.map((e) => (e.name === name ? { ...e, weight: Math.max(0, weight) } : e))
    );
  }, []);

  const selectRandom = useCallback(() => {
    return selectWeightedRandom(weightedEntries);
  }, [weightedEntries]);

  const getProbabilities = useCallback(() => {
    return calculateProbabilities(weightedEntries);
  }, [weightedEntries]);

  const isValid = useCallback(() => {
    return validateWeights(weightedEntries).valid;
  }, [weightedEntries]);

  const resetWeights = useCallback(() => {
    setWeightedEntries((prev) => prev.map((e) => ({ ...e, weight: 1 })));
  }, []);

  const setEntries = useCallback((entries: string[]) => {
    setWeightedEntries(entries.map((name) => ({ name, weight: 1 })));
  }, []);

  return {
    entries: weightedEntries,
    addEntry,
    removeEntry,
    updateWeight,
    selectRandom,
    getProbabilities,
    isValid,
    resetWeights,
    setEntries,
  };
}
