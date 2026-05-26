/* =============================================================
   ThemeSelector Component — SpinPick Clone
   Allows users to select custom color themes for their wheels
   ============================================================= */

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface Theme {
  name: string;
  colors: string[];
}

const PREDEFINED_THEMES: Theme[] = [
  {
    name: "Rainbow",
    colors: ["#22d3ee", "#f97316", "#a855f7", "#22c55e", "#ec4899", "#3b82f6", "#eab308", "#ef4444"],
  },
  {
    name: "Ocean",
    colors: ["#0369a1", "#0ea5e9", "#06b6d4", "#14b8a6", "#10b981", "#059669", "#047857", "#065f46"],
  },
  {
    name: "Sunset",
    colors: ["#fbbf24", "#f97316", "#ea580c", "#dc2626", "#991b1b", "#7c2d12", "#5a1a0a", "#3f0f0f"],
  },
  {
    name: "Forest",
    colors: ["#22c55e", "#16a34a", "#15803d", "#166534", "#14532d", "#0f3817", "#0d2818", "#051e16"],
  },
  {
    name: "Neon",
    colors: ["#ec4899", "#f97316", "#eab308", "#22d3ee", "#a855f7", "#06b6d4", "#10b981", "#f43f5e"],
  },
  {
    name: "Pastel",
    colors: ["#fce7f3", "#fce4ec", "#f3e5f5", "#e0f2fe", "#dbeafe", "#ddd6fe", "#dbeafe", "#dcfce7"],
  },
];

interface ThemeSelectorProps {
  onThemeSelect?: (theme: Theme) => void;
  currentTheme?: Theme;
}

export default function ThemeSelector({ onThemeSelect, currentTheme }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectTheme = (theme: Theme) => {
    onThemeSelect?.(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-purple-300 hover:text-purple-700 shadow-sm transition-all active:scale-95"
      >
        <div className="flex gap-1">
          {(currentTheme?.colors || PREDEFINED_THEMES[0].colors).slice(0, 4).map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-20 bg-white rounded-xl border border-gray-200 shadow-lg p-3 min-w-max">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Themes
          </p>
          <div className="space-y-2">
            {PREDEFINED_THEMES.map((theme) => (
              <button
                key={theme.name}
                onClick={() => handleSelectTheme(theme)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex gap-1.5">
                  {theme.colors.slice(0, 6).map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
