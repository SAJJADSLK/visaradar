/* =============================================================
   WinnerCelebration — Confetti & celebration animations
   Displays when a winner is announced
   ============================================================= */

import { useEffect, useState } from "react";

interface Confetti {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

export function WinnerCelebration() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const colors = [
      "#7c3aed", // Purple
      "#4f46e5", // Indigo
      "#f97316", // Orange
      "#06b6d4", // Cyan
      "#ec4899", // Pink
      "#10b981", // Green
      "#f59e0b", // Amber
      "#8b5cf6", // Violet
    ];

    const newConfetti: Confetti[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 2 + Math.random() * 1,
      size: 4 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setConfetti(newConfetti);

    // Clear confetti after animation completes
    const timer = setTimeout(() => setConfetti([]), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Celebration overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Confetti pieces */}
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${piece.left}%`,
              top: "-10px",
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              animation: `fall ${piece.duration}s linear ${piece.delay}s forwards`,
              opacity: 0.8,
            }}
          />
        ))}

        {/* Celebration text - floating up */}
        <div
          className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            animation: "float-up 2s ease-out forwards",
          }}
        >
          <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 drop-shadow-lg">
            🎉
          </div>
        </div>

        {/* Celebration stars */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle 1.5s ease-in-out ${Math.random() * 0.5}s forwards`,
              opacity: 0,
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotateZ(360deg);
            opacity: 0;
          }
        }

        @keyframes float-up {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -150%) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -250%) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse-bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </>
  );
}

export default WinnerCelebration;
