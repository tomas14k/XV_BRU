import React, { useEffect, useState } from "react";
import { COOLDOWN_SECONDS } from "../constants/guest.js";

export function SuccessScreen({ authorName, onBack }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-dvh bg-[#08080f] flex flex-col items-center justify-center px-7 py-10 relative font-sans antialiased">
      
      <div className="flex flex-col items-center gap-5 max-w-90 w-full text-center animate-[fade-up_0.5s_ease-out_both]">

        {/* icon */}
        <div className="mb-2">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            className="drop-shadow-[0_0_16px_rgba(232,176,106,0.4)]"
          >
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="rgba(232,176,106,0.2)"
              strokeWidth="3"
            />

            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="#e8b06a"
              strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 36}`}
              strokeLinecap="round"
              className="origin-center -rotate-90 animate-[draw-circle_0.7s_ease-out_forwards]"
            />

            <polyline
              points="24,40 36,52 58,28"
              stroke="#e8b06a"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-[draw-check_0.4s_0.5s_ease-out_both]"
              style={{
                strokeDasharray: 50,
              }}
            />
          </svg>
        </div>

        {/* title */}
        <h1
          className="text-[36px] font-bold italic text-[#fdf5e8] leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {authorName
            ? `¡Gracias, ${authorName.split(" ")[0]}!`
            : "¡Foto enviada!"}
        </h1>

        {/* subtitle */}
        <p className="text-[15px] leading-relaxed text-[#fdf5e88c]">
          Tu foto está siendo revisada y aparecerá en pantalla en unos segundos ✨
        </p>

        {/* cooldown */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#e8b06a12] border border-[#e8b06a30] w-full">
          <span className="text-[18px]">⏳</span>
          <p className="text-[13px] text-[#fdf5e899] text-left leading-relaxed">
            Podés subir otra foto en{" "}
            <strong className="text-[#e8b06a]">
              {COOLDOWN_SECONDS} segundos
            </strong>
          </p>
        </div>

        {/* button */}
        <button
          onClick={onBack}
          className="mt-2 px-8 py-3 rounded-xl border border-[#e8b06a4d] text-[#e8b06a] font-semibold text-[15px]"
        >
          Volver al inicio
        </button>
      </div>

      {/* footer */}
      <p className="absolute bottom-7 text-[11px] text-white/20 tracking-wider uppercase">
        Analizando foto{dots}
      </p>

      {/* animations */}
      <style>{`
        @keyframes draw-circle {
          from { stroke-dashoffset: ${2 * Math.PI * 36}; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes draw-check {
          from { stroke-dashoffset: 50; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}