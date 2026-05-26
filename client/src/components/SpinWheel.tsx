/* =============================================================
   SpinWheel Component — SpinPick Clone
   FIXED: Corrected winner selection logic to ensure accurate results
   Renders a colorful segmented wheel with a white center and
   optional spin animation triggered by clicking the center button.
   ============================================================= */

import { useState, useRef } from "react";

interface SpinWheelProps {
  size?: number;
  interactive?: boolean;
  entries?: string[];
  onResult?: (winner: string) => void;
}

const DEFAULT_SEGMENTS = [
  { color: "#22d3ee", label: "Option 1" },   // cyan
  { color: "#f97316", label: "Option 2" },   // orange
  { color: "#a855f7", label: "Option 3" },   // purple
  { color: "#22c55e", label: "Option 4" },   // green
  { color: "#ec4899", label: "Option 5" },   // pink
  { color: "#3b82f6", label: "Option 6" },   // blue
  { color: "#eab308", label: "Option 7" },   // yellow
  { color: "#ef4444", label: "Option 8" },   // red
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

export default function SpinWheel({ 
  size = 220, 
  interactive = true, 
  entries,
  onResult 
}: SpinWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<SVGGElement>(null);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 4;
  const innerR = size * 0.22;
  
  const segments = entries && entries.length > 0 
    ? entries.map((label, i) => ({
        color: DEFAULT_SEGMENTS[i % DEFAULT_SEGMENTS.length].color,
        label,
      }))
    : DEFAULT_SEGMENTS;

  const segmentAngle = 360 / segments.length;

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const extraSpins = 5 + Math.floor(Math.random() * 5);
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + extraSpins * 360 + randomAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      
      // FIXED: Correct winner selection logic
      // The pointer is at the top (12 o'clock = 0 degrees in visual space)
      // We need to find which segment is at the pointer position
      // Normalize the rotation to 0-360 range
      const normalizedRotation = ((totalRotation % 360) + 360) % 360;
      
      // The pointer points to 0 degrees (top), so we need to find which segment
      // is at position 0 after the wheel rotates
      // If wheel rotates by X degrees, segment at position (360 - X) is now at pointer
      const pointerSegmentIndex = Math.floor(((360 - normalizedRotation) % 360) / segmentAngle) % segments.length;
      
      const winner = segments[pointerSegmentIndex].label;
      setResult(winner);
      onResult?.(winner);
    }, 3200);
  };

  return (
    <div className="relative inline-flex flex-col items-center gap-3">
      {/* Pointer triangle at top */}
      <div
        className="absolute z-10"
        style={{
          top: -2,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderTop: "18px solid #5b35e8",
          filter: "drop-shadow(0 2px 4px rgba(91,53,232,0.4))",
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-xl"
        style={{ cursor: interactive ? "pointer" : "default" }}
        onClick={interactive ? handleSpin : undefined}
      >
        <g
          ref={wheelRef}
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 3.2s cubic-bezier(0.17, 0.67, 0.12, 1)"
              : "none",
          }}
        >
          {segments.map((seg, i) => {
            const startAngle = i * segmentAngle;
            const endAngle = startAngle + segmentAngle;
            return (
              <path
                key={i}
                d={describeArc(cx, cy, outerR, startAngle, endAngle)}
                fill={seg.color}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          {/* Inner white circle */}
          <circle cx={cx} cy={cy} r={innerR} fill="white" />
        </g>

        {/* Center button overlay (static, not rotating) */}
        <circle
          cx={cx}
          cy={cy}
          r={innerR - 2}
          fill="white"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          style={{ cursor: interactive ? "pointer" : "default" }}
          onClick={interactive ? handleSpin : undefined}
        />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.075}
          fontWeight="700"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fill={spinning ? "#a855f7" : "#5b35e8"}
          style={{ cursor: interactive ? "pointer" : "default", userSelect: "none" }}
          onClick={interactive ? handleSpin : undefined}
        >
          {spinning ? "..." : result ? "Again!" : "Spin!"}
        </text>
      </svg>

      {result && !spinning && (
        <div className="animate-fade-up bg-white border border-purple-200 rounded-xl px-5 py-2.5 shadow-md text-center">
          <p className="text-xs text-purple-500 font-semibold uppercase tracking-wider mb-0.5">Result</p>
          <p className="text-base font-bold text-gray-800">{result}</p>
        </div>
      )}
    </div>
  );
}
