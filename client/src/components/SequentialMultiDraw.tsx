/* =============================================================
   SequentialMultiDraw Component — SpinPick Clone
   Displays multi-draw with sequential wheel animations
   ============================================================= */

import { useState, useEffect } from "react";
import { DrawResult } from "@/lib/multiDraw";

interface SequentialMultiDrawProps {
  results: DrawResult[];
  entries: string[];
  isAnimating: boolean;
  wheelColors: string[];
}

export default function SequentialMultiDraw({
  results,
  entries,
  isAnimating,
  wheelColors,
}: SequentialMultiDrawProps) {
  const [animatingIndex, setAnimatingIndex] = useState(-1);

  useEffect(() => {
    if (!isAnimating || results.length === 0) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < results.length) {
        setAnimatingIndex(currentIndex);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [isAnimating, results]);

  if (results.length === 0) return null;

  return (
    <div className="mt-8 space-y-3">
      <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        🏆 Draw Results ({results.length})
      </h3>
      
      <div className="space-y-2">
        {results.map((result, idx) => {
          const isAnimating_ = animatingIndex >= idx;
          const medals = ["🥇", "🥈", "🥉", "⭐"];
          const medal = medals[idx] || "✨";
          
          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300 ${
                isAnimating_
                  ? "bg-purple-50 border-purple-300 scale-100 opacity-100"
                  : "bg-gray-50 border-gray-200 scale-95 opacity-60"
              }`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold text-sm">
                {result.position}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{result.winner}</p>
                <p className="text-xs text-gray-500">
                  {new Date(result.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <span className="text-2xl">{medal}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
