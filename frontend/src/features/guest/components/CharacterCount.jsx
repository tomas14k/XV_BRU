
import React from "react";
 
export function CharacterCount({ current, max }) {
  const nearLimit = current > max * 0.8;
  const atLimit = current >= max;
  return (
    <span
      style={{
        fontSize: 11,
        color: atLimit
          ? "#f87171"
          : nearLimit
          ? "#fbbf24"
          : "rgba(253,245,232,0.3)",
        fontFamily: "'DM Sans', sans-serif",
        transition: "color 0.2s",
      }}
    >
      {current}/{max}
    </span>
  );
}
 