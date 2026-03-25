import React from "react";
//import { COOLDOWN_SECONDS } from "../../constants/guest";

/**
 * Circular countdown timer displayed when the upload cooldown is active.
 */
export function CooldownBadge({ remaining }) {
  const progress = remaining / 30;
  const circumference = 2 * Math.PI * 22; // r=22
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ position: "relative", width: 72, height: 72 }}>
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Track */}
          <circle
            cx="36" cy="36" r="22"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          {/* Progress */}
          <circle
            cx="36" cy="36" r="22"
            fill="none"
            stroke="#e8b06a"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 18,
            color: "#f0d5a0",
          }}
        >
          {remaining}
        </span>
      </div>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        color: "rgba(240,213,160,0.7)",
        textAlign: "center",
        margin: 0,
      }}>
        Podés subir otra foto en {remaining}s
      </p>
    </div>
  );
}