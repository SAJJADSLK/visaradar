/* =============================================================
   MultiDrawResults Component — SpinPick Clone
   Display multi-draw results with animation
   ============================================================= */

import { DrawResult } from "@/lib/multiDraw";
import { Copy, Check, Download, Trash2 } from "lucide-react";
import { useState } from "react";

interface MultiDrawResultsProps {
  results: DrawResult[];
  onCopy?: () => void;
  onExport?: () => void;
  onClear?: () => void;
  wheelColors?: string[];
}

export default function MultiDrawResults({
  results,
  onCopy,
  onExport,
  onClear,
  wheelColors = [],
}: MultiDrawResultsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = results.map((r) => `${r.position}. ${r.winner}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.();
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-5">
        <h3
          className="text-lg font-bold text-gray-900"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          🏆 Draw Results ({results.length})
        </h3>
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="Clear results"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Results list */}
      <div className="space-y-2 mb-5">
        {results.map((result, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 hover:shadow-md transition-all animate-fade-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {/* Position badge */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
              style={{
                backgroundColor: wheelColors[i % wheelColors.length] || "#7c3aed",
              }}
            >
              {result.position}
            </div>

            {/* Winner name */}
            <div className="flex-1">
              <p
                className="font-bold text-gray-900"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {result.winner}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(result.timestamp).toLocaleTimeString()}
              </p>
            </div>

            {/* Medal emoji */}
            <span className="text-lg">
              {result.position === 1 && "🥇"}
              {result.position === 2 && "🥈"}
              {result.position === 3 && "🥉"}
              {result.position > 3 && "⭐"}
            </span>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all active:scale-95"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy Results"}
        </button>
        <button
          onClick={onExport}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
        >
          <Download size={16} />
          Export
        </button>
      </div>
    </div>
  );
}
