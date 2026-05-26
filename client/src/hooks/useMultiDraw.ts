/* =============================================================
   useMultiDraw Hook — SpinPick Clone
   Manages multi-draw state and operations with animations
   ============================================================= */

import { useState, useCallback } from "react";
import { DrawResult, selectMultipleWinners, validateMultiDraw } from "@/lib/multiDraw";

export function useMultiDraw() {
  const [drawResults, setDrawResults] = useState<DrawResult[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawCount, setDrawCount] = useState(3);

  const performMultiDraw = useCallback((entries: string[], count: number) => {
    const validation = validateMultiDraw(entries, count);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    setIsDrawing(true);
    setDrawCount(count);

    // Perform multi-draw immediately
    const results = selectMultipleWinners(entries, count);
    
    // Animate results display with staggered timing
    setTimeout(() => {
      setDrawResults(results);
      setIsDrawing(false);
    }, 500 + count * 600);

    return { success: true, results };
  }, []);

  const clearResults = useCallback(() => {
    setDrawResults([]);
  }, []);

  const getWinnersList = useCallback(() => {
    return drawResults.map((r) => r.winner);
  }, [drawResults]);

  const isValidDrawCount = useCallback((entries: string[], count: number) => {
    return validateMultiDraw(entries, count).valid;
  }, []);

  return {
    drawResults,
    isDrawing,
    drawCount,
    setDrawCount,
    performMultiDraw,
    clearResults,
    getWinnersList,
    isValidDrawCount,
  };
}
