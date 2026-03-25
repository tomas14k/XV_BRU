import React, { useState } from "react";
import { CharacterCount } from "./CharacterCount";
import { MAX_MESSAGE_LENGTH, MAX_NAME_LENGTH } from "../constants/guest";
import { RefreshCw, SendIcon,AlertCircleIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";


export function UploadScreen({
  previewUrl,
  isUploading,
  uploadError,
  eventId,
  onSubmit,
  onChangePhoto,
  fileInputRef,
  handleFileChange,
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [photoExpanded, setPhotoExpanded] = useState(false);

  const handleSubmit = () => {
    onSubmit({ name, message, eventId });
  };

  return (
    <div className="min-h-dvh bg-[#08080f] flex flex-col relative overflow-hidden font-sans antialiased">
      
      {/* bg gradient */}
      <div
        className="fixed top-0 left-0 right-0 h-75 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 0%, rgba(200,120,50,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-5 pb-10 overflow-y-auto">

        {/* top bar */}
        <div className="flex items-center justify-between px-5 pt-4 sticky top-0 z-10 bg-[#08080f]/85 backdrop-blur-md">
          <button
            onClick={onChangePhoto}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#fdf5e8]"
          >
            volver
          </button>

          <span
            className="text-[22px] italic font-semibold text-[#fdf5e8]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Tu foto
          </span>

          <div className="w-10" />
        </div>

        {/* photo */}
        <div className="flex flex-col items-center gap-2 px-5">
          <div
            onClick={() => setPhotoExpanded((v) => !v)}
            className={`w-full rounded-[20px] overflow-hidden relative border border-[#e8b06a33] shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_0_1px_rgba(232,176,106,0.1)] cursor-pointer transition-all duration-300 ${
              photoExpanded ? "h-105" : "h-70"
            }`}
          >
            <img
              src={previewUrl}
              alt="Vista previa"
              className="w-full h-full object-cover block"
              draggable={false}
            />

            {!photoExpanded && (
              <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                <span className="text-[11px] text-white/70">
                  Ver completa
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onChangePhoto}
            className="flex items-center gap-1 text-[13px] text-[#e8b06ab3] underline underline-offset-[3px]"
          >
            <RefreshCw />
            <span>Cambiar foto</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* fields */}
        <div className="flex flex-col gap-4 px-5">

          {/* name */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="guest-name"
                className="text-[13px] font-semibold text-[#fdf5e8b3] uppercase tracking-wide"
              >
                Tu nombre
              </label>
              <div className="text-[10px] text-[#e8b06a80] bg-[#e8b06a14] border border-[#e8b06a26] rounded px-2 py-px uppercase tracking-wider">
                opcional
              </div>
            </div>

            <input
              id="guest-name"
              type="text"
              value={name}
              maxLength={MAX_NAME_LENGTH}
              onChange={(e) => setName(e.target.value)}
              placeholder="¿Cómo te llamás?"
              autoComplete="given-name"
              className="w-full bg-white/5 border border-[#e8b06a30] rounded-xl text-[#fdf5e8] text-[15px] px-4 py-3 outline-none focus:border-[#e8b06a]"
            />

            <div className="flex justify-end">
              <CharacterCount current={name.length} max={MAX_NAME_LENGTH} />
            </div>
          </div>

          {/* message */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="guest-message"
                className="text-[13px] font-semibold text-[#fdf5e8b3] uppercase tracking-wide"
              >
                Mensaje
              </label>
              <div className="text-[10px] text-[#e8b06a80] bg-[#e8b06a14] border border-[#e8b06a26] rounded px-2 py-px uppercase tracking-wider">
                opcional
              </div>
            </div>

            <textarea
              id="guest-message"
              value={message}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Dejá un mensaje para la pantalla... 🎉"
              rows={3}
              className="w-full bg-white/5 border border-[#e8b06a30] rounded-xl text-[#fdf5e8] text-[15px] px-4 py-3 outline-none resize-none leading-relaxed focus:border-[#e8b06a]"
            />

            <div className="flex justify-end">
              <CharacterCount
                current={message.length}
                max={MAX_MESSAGE_LENGTH}
              />
            </div>
          </div>
        </div>

        {/* preview */}
        {(name.trim() || message.trim()) && (
          <div className="flex flex-col gap-2 px-5">
            <span className="text-[11px] text-[#e8b06a80] uppercase tracking-wider font-semibold">
              Así aparecerá en pantalla
            </span>

            <div className="rounded-xl overflow-hidden border border-[#e8b06a33] bg-white/5">
              <div className="p-4 flex flex-col gap-1">
                {name.trim() && (
                  <p
                    className="text-[18px] text-[#e8b06a] italic font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {name}
                  </p>
                )}
                {message.trim() && (
                  <p className="text-[14px] text-[#fdf5e8b3] leading-relaxed">
                    "{message}"
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* error */}
        {uploadError && (
          <div className="mx-5 flex items-center gap-2 px-3 py-3 rounded-xl bg-red-400/10 border border-red-400/30 text-red-300 text-[13px]">
            <AlertCircleIcon />
            <span>{uploadError}</span>
          </div>
        )}

        {/* submit */}
        <div className="px-5 flex flex-col items-center gap-2">
          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-[16px] transition ${
              isUploading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            style={{
              background:
                "linear-gradient(135deg, #e8a030 0%, #c97020 100%)",
              color: "#1a0e00",
              boxShadow: "0 8px 32px rgba(232,160,48,0.35)",
            }}
          >
            {isUploading ? (
              <>
                <Spinner />
                <span>Enviando…</span>
              </>
            ) : (
              <>
                <SendIcon />
                <span>Enviar foto</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-[#fdf5e847] text-center">
            La foto pasará por moderación antes de aparecer en pantalla
          </p>
        </div>
      </div>
    </div>
  );
}