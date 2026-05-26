/* =============================================================
   WeightedEntryEditor Component — SpinPick Clone
   UI for editing entry weights and viewing probabilities
   ============================================================= */

import { WeightedEntry, calculateProbabilities } from "@/lib/weightedSelection";
import { Trash2, RotateCcw } from "lucide-react";

interface WeightedEntryEditorProps {
  entries: WeightedEntry[];
  onWeightChange: (name: string, weight: number) => void;
  onRemove: (name: string) => void;
  onResetWeights: () => void;
  wheelColors: string[];
}

export default function WeightedEntryEditor({
  entries,
  onWeightChange,
  onRemove,
  onResetWeights,
  wheelColors,
}: WeightedEntryEditorProps) {
  const probabilities = calculateProbabilities(entries);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Weights & Probabilities</p>
        <button
          onClick={onResetWeights}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-purple-600 transition-colors px-2 py-1 rounded-lg hover:bg-purple-50"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {entries.map((entry, i) => {
          const probability = probabilities[entry.name] || 0;
          return (
            <div key={entry.name} className="bg-gray-50 rounded-xl p-3 hover:bg-purple-50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: wheelColors[i % wheelColors.length] }}
                />
                <span className="flex-1 text-sm font-medium text-gray-700">{entry.name}</span>
                <button
                  onClick={() => onRemove(entry.name)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={entry.weight}
                  onChange={(e) => onWeightChange(entry.name, parseFloat(e.target.value) || 0)}
                  className="w-16 px-2 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
                <span className="text-xs text-gray-500 font-medium">weight</span>
                <span className="ml-auto text-xs font-bold text-purple-600">{probability.toFixed(1)}%</span>
              </div>

              {/* Probability bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-200"
                  style={{ width: `${probability}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {entries.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-6">No entries yet. Add some to set weights!</p>
      )}

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
        <p className="text-xs text-blue-700 leading-relaxed">
          <strong>How weights work:</strong> Higher weight = higher chance of winning. Default weight is 1. 
          Set weight to 2 for 2x probability, 0.5 for half probability, etc.
        </p>
      </div>
    </div>
  );
}
