/* =============================================================
   WheelsPage — My Wheels Dashboard
   Display saved wheels with spinning animation on hover
   ============================================================= */

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Trash2, Play, Edit2 } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

interface SavedWheel {
  id: string;
  title: string;
  entries: string[];
  colors: string[];
  createdAt: string;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, end);
  const e = polarToCartesian(cx, cy, r, start);
  const large = end - start <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y} Z`;
}

export default function WheelsPage() {
  const [wheels, setWheels] = useState<SavedWheel[]>([]);
  const [, navigate] = useLocation();
  const [hoveringId, setHoveringId] = useState<string | null>(null);
  const [wheelRotations, setWheelRotations] = useState<Record<string, number>>({});

  useEffect(() => {
    // Load wheels from localStorage
    try {
      const stored = localStorage.getItem("spinpick_wheels");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWheels(parsed);
        } else {
          console.warn("Invalid wheels data format");
          setWheels([]);
        }
      }
    } catch (error) {
      console.error("Failed to load wheels from storage:", error);
      toast.error("Failed to load wheels");
      setWheels([]);
    }
  }, []);

  // Continuous rotation animation on hover
  useEffect(() => {
    if (!hoveringId) return;

    const interval = setInterval(() => {
      setWheelRotations((prev) => ({
        ...prev,
        [hoveringId]: (prev[hoveringId] || 0) + 8,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, [hoveringId]);

  const handleEdit = (wheel: SavedWheel) => {
    try {
      const wheelData = btoa(JSON.stringify({ title: wheel.title, entries: wheel.entries }));
      navigate(`/wheel/new?wheel=${wheelData}`);
    } catch (error) {
      console.error("Error navigating to edit:", error);
      toast.error("Failed to open wheel editor");
    }
  };

  const handleDelete = (wheelId: string) => {
    try {
      setWheels((prev) => prev.filter((w) => w.id !== wheelId));
      const stored = localStorage.getItem("spinpick_wheels");
      if (stored) {
        const allWheels = JSON.parse(stored);
        const updated = allWheels.filter((w: SavedWheel) => w.id !== wheelId);
        localStorage.setItem("spinpick_wheels", JSON.stringify(updated));
      }
      toast.success("Wheel deleted!");
    } catch (error) {
      console.error("Error deleting wheel:", error);
      toast.error("Failed to delete wheel");
    }
  };

  const handleCreateNew = () => {
    try {
      navigate("/wheel/new");
    } catch (error) {
      console.error("Error navigating to create:", error);
      toast.error("Failed to open wheel creator");
    }
  };

  if (wheels.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1
            className="text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            No Wheels Yet
          </h1>
          <p className="text-gray-600 mb-8 text-lg">Create your first wheel to get started!</p>
          <button
            onClick={handleCreateNew}
            className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg transition-all active:scale-95"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Create a Wheel
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1
            className="text-3xl font-bold text-gray-900"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            My Wheels
          </h1>
          <button
            onClick={handleCreateNew}
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all active:scale-95"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            + New Wheel
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wheels.map((wheel) => {
            const size = 220;
            const cx = size / 2;
            const cy = size / 2;
            const outerR = size / 2 - 4;
            const innerR = size * 0.2;
            const segAngle = wheel.entries.length > 0 ? 360 / wheel.entries.length : 360;
            const rotation = wheelRotations[wheel.id] || 0;
            const isHovering = hoveringId === wheel.id;

            return (
              <div
                key={wheel.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Wheel Preview */}
                <div
                  className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center gap-4 cursor-pointer relative overflow-hidden"
                  onMouseEnter={() => setHoveringId(wheel.id)}
                  onMouseLeave={() => setHoveringId(null)}
                >
                  {/* Hover glow effect */}
                  {isHovering && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-blue-200/20 pointer-events-none" />
                  )}

                  <div className="relative z-10">
                    <div
                      className="absolute z-10"
                      style={{
                        top: -2,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: "14px solid #7c3aed",
                        transition: "filter 0.3s ease",
                        filter: isHovering ? "drop-shadow(0 4px 12px rgba(124,58,237,0.6))" : "drop-shadow(0 2px 6px rgba(124,58,237,0.3))",
                      }}
                    />
                    <svg
                      width={size}
                      height={size}
                      viewBox={`0 0 ${size} ${size}`}
                      className="drop-shadow-lg transition-all duration-300"
                      style={{
                        filter: isHovering ? "drop-shadow(0 8px 20px rgba(124,58,237,0.4))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                      }}
                    >
                      <g
                        style={{
                          transformOrigin: `${cx}px ${cy}px`,
                          transform: `rotate(${rotation}deg)`,
                          transition: isHovering ? "none" : "transform 0.3s ease-out",
                        }}
                      >
                        {wheel.entries.map((entry, i) => {
                          const start = i * segAngle;
                          const end = start + segAngle;
                          const mid = start + segAngle / 2;
                          const textR = outerR * 0.65;
                          const textPos = polarToCartesian(cx, cy, textR, mid);
                          const color = wheel.colors[i % wheel.colors.length];
                          return (
                            <g key={i}>
                              <path
                                d={describeArc(cx, cy, outerR, start, end)}
                                fill={color}
                                stroke="white"
                                strokeWidth="2"
                              />
                              {wheel.entries.length <= 12 && (
                                <text
                                  x={textPos.x}
                                  y={textPos.y}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  fontSize={Math.max(7, Math.min(10, 100 / wheel.entries.length))}
                                  fontWeight="600"
                                  fontFamily="'Plus Jakarta Sans', sans-serif"
                                  fill="white"
                                  transform={`rotate(${mid}, ${textPos.x}, ${textPos.y})`}
                                  style={{ userSelect: "none" }}
                                >
                                  {entry.length > 8 ? entry.slice(0, 7) + "…" : entry}
                                </text>
                              )}
                            </g>
                          );
                        })}
                        <circle cx={cx} cy={cy} r={innerR} fill="white" />
                      </g>
                      <circle cx={cx} cy={cy} r={innerR - 1} fill="white" stroke="#e5e7eb" strokeWidth="1" />
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={14}
                        fontWeight="700"
                        fontFamily="'Plus Jakarta Sans', sans-serif"
                        fill="#7c3aed"
                        style={{ userSelect: "none" }}
                      >
                        {isHovering ? "↻" : "Spin"}
                      </text>
                    </svg>
                  </div>

                  {/* Hover hint */}
                  <div className="flex items-center gap-2 text-xs text-gray-600 group-hover:text-purple-600 transition-colors opacity-0 group-hover:opacity-100 duration-300">
                    <Play size={12} fill="currentColor" />
                    Hover to spin
                  </div>
                </div>

                {/* Wheel Info */}
                <div className="p-4 border-t border-gray-100">
                  <h3
                    className="font-bold text-gray-900 mb-1 truncate"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {wheel.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    {wheel.entries.length} entries • {new Date(wheel.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(wheel)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors active:scale-95"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(wheel.id)}
                      className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors active:scale-95"
                      title="Delete wheel"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
