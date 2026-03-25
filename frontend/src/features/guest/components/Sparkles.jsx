import React, { useMemo } from "react";

/**
 * Decorative floating sparkles for the welcome screen.
 * Pure CSS animations — zero JS overhead after mount.
 */
export function Sparkles({ count = 18 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 90}%`,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes sparkle-float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: var(--sp-op); }
          50% { transform: translateY(-14px) scale(1.3); opacity: 1; }
        }
        @keyframes sparkle-twinkle {
          0%, 100% { opacity: var(--sp-op); }
          40% { opacity: 0.05; }
          60% { opacity: 1; }
        }
      `}</style>

      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.id % 3 === 0
              ? "#e8b06a"
              : p.id % 3 === 1
              ? "#f0d5a0"
              : "#fde68a",
            "--sp-op": p.opacity,
            animation: `${
              p.id % 2 === 0 ? "sparkle-float" : "sparkle-twinkle"
            } ${p.duration}s ${p.delay}s ease-in-out infinite`,
            boxShadow: `0 0 ${p.size * 2}px ${p.size}px ${
              p.id % 3 === 0 ? "#e8b06a66" : "#fde68a44"
            }`,
          }}
        />
      ))}
    </div>
  );
}