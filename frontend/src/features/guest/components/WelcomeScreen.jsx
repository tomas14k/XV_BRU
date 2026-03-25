import React from "react";
import { Sparkles } from "./Sparkles.jsx";
import { CooldownBadge } from "./CoolDownBadge.jsx";

export function WelcomeScreen({
    eventData,
    onPhotoSelected,
    fileInputRef,
    handleFileChange,
    isCoolingDown,
    remaining,
}) {
    return (
        <div className="relative min-h-dvh bg-[#08080f] flex flex-col items-center justify-center overflow-hidden font-sans antialiased">

            {/* blobs */}
            <div
                className="absolute -top-20 -right-20 w-[320px] h-80 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(200,120,60,0.18) 0%, transparent 70%)",
                }}
            />

            <div
                className="absolute -bottom-24 -left-16 w-70 h-70 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(150,80,200,0.12) 0%, transparent 70%)",
                }}
            />

            <Sparkles count={20} />

            {/* content */}
            <div className="relative z-10 flex flex-col items-center px-7 gap-5 w-full max-w-100 text-center">



                {/* title */}
                <h1
                    className="text-[clamp(38px,11vw,52px)] font-bold italic leading-tight text-[#fdf5e8]"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        textShadow: "0 0 40px rgba(232,176,106,0.25)",
                        letterSpacing: "-0.01em",
                    }}
                >
                    {eventData?.event_name ?? "Bienvenido"}
                </h1>

                {/* divider */}
                <div className="flex items-center gap-2 w-[60%]">
                    <span
                        className="flex-1 h-px"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, rgba(232,176,106,0.4), transparent)",
                        }}
                    />
                    <span className="text-[#e8b06a] text-[11px]">✦</span>
                    <span
                        className="flex-1 h-px"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, rgba(232,176,106,0.4), transparent)",
                        }}
                    />
                </div>

                {/* subtitle */}
                <p className="text-[15px] leading-relaxed text-[#fdf5e88c] max-w-70">
                    {eventData?.subtitle ??
                        "Compartí tu foto y hacela parte de la noche ✨"}
                </p>

                {/* CTA */}
                <div className="mt-4 flex flex-col items-center gap-3 w-full">
                    {isCoolingDown ? (
                        <CooldownBadge remaining={remaining} />
                    ) : (
                        <>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                aria-label="Seleccionar foto"
                            />

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full max-w-[320px] flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-[16px] tracking-wide transition active:scale-95"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #e8a030 0%, #c97020 100%)",
                                    color: "#1a0e00",
                                    boxShadow:
                                        "0 8px 32px rgba(232,160,48,0.35), 0 2px 8px rgba(0,0,0,0.4)",
                                }}
                            >
                                <CameraIcon />
                                <span>Subir mi foto</span>
                            </button>

                            <p className="text-[12px] text-[#fdf5e859]">
                                Podés usar la cámara o elegir de tu galería
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* footer */}
            <footer className="absolute bottom-5 w-full text-center">
                <p className="text-[11px] text-white/15 tracking-widest uppercase">
                    Brune · {new Date().getFullYear()}
                </p>
            </footer>
        </div>
    );
}

/* icon */
function CameraIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
        >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    );
}