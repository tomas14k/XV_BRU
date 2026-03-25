import React, { useEffect } from "react";
import { useParams } from "react-router";

import { WelcomeScreen } from "../components/WelcomeScreen";
import { UploadScreen } from "../components/UploadScreen";
import { SuccessScreen } from "../components/SuccessScreen";

import { usePhotoUpload } from "../hooks/usePhotoUpload";
import { useCooldown } from "../hooks/useCooldown";
import { SCREENS } from "../constants/guest";

// Inject Google Fonts once at the module level
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500;1,700&family=DM+Sans:wght@400;500;600;700&display=swap";
if (!document.querySelector(`link[href="${FONT_LINK}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_LINK;
    document.head.appendChild(link);
}

// Inject global resets + pulse animation
if (!document.getElementById("brune-guest-globals")) {
    const style = document.createElement("style");
    style.id = "brune-guest-globals";
    style.textContent = `
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; padding: 0; background: #08080f; }
    input::placeholder, textarea::placeholder { color: rgba(253,245,232,0.25); }
    input:focus, textarea:focus {
      border-color: rgba(232,176,106,0.5) !important;
      background: rgba(255,255,255,0.08) !important;
    }
    @keyframes pulse-dot {
      0%, 100% { opacity: 1; box-shadow: 0 0 6px #e8b06a; }
      50%       { opacity: 0.4; box-shadow: 0 0 2px #e8b06a; }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;
    document.head.appendChild(style);
}

/**
 * GuestPage — top-level page for the guest flow.
 * Route: /evento/:eventId
 *
 * Manages:
 *  - current screen (welcome → upload → success)
 *  - photo selection & upload state
 *  - cooldown enforcement
 *  - (optional) event data fetching
 */
export default function GuestPage() {
    const { eventId } = useParams();

    const [screen, setScreen] = React.useState(SCREENS.WELCOME);
    const [authorName, setAuthorName] = React.useState("");

    const {
        previewUrl,
        isUploading,
        uploadError,
        fileInputRef,
        handleFileChange: _handleFileChange,
        clearPhoto,
        uploadPhoto,
    } = usePhotoUpload();

    const { isCoolingDown, remaining, startCooldown } = useCooldown();

    // Whenever a file is selected (from WelcomeScreen or UploadScreen), move to upload view
    const handleFileChange = (e) => {
        _handleFileChange(e);
        // Small timeout to let the object URL resolve
        setTimeout(() => setScreen(SCREENS.UPLOAD), 50);
    };

    const handleChangePhoto = () => {
        clearPhoto();
        setScreen(SCREENS.WELCOME);
    };

    const handleSubmit = async ({ name, message }) => {
        setAuthorName(name);
        const ok = await uploadPhoto({ name, message, eventId });
        if (ok) {
            startCooldown();
            setScreen(SCREENS.SUCCESS);
        }
    };

    const handleBackFromSuccess = () => {
        clearPhoto();
        setScreen(SCREENS.WELCOME);
    };

    // Placeholder event data — replace with a real fetch / context / prop
    const eventData = {
        event_name: "Quince de Brune",
        subtitle: "Compartí tu foto y hacela parte de esta noche ✨",
    };

    /* ─── Render ──────────────────────────────────────────────────── */
    return (
        <>
            {screen === SCREENS.WELCOME && (
                <WelcomeScreen
                    eventData={eventData}
                    fileInputRef={fileInputRef}
                    handleFileChange={handleFileChange}
                    isCoolingDown={isCoolingDown}
                    remaining={remaining}
                />
            )}

            {screen === SCREENS.UPLOAD && previewUrl && (
                <UploadScreen
                    previewUrl={previewUrl}
                    isUploading={isUploading}
                    uploadError={uploadError}
                    eventId={eventId}
                    onSubmit={handleSubmit}
                    onChangePhoto={handleChangePhoto}
                    fileInputRef={fileInputRef}
                    handleFileChange={handleFileChange}
                />
            )}

            {screen === SCREENS.SUCCESS && (
                <SuccessScreen
                    authorName={authorName}
                    onBack={handleBackFromSuccess}
                />
            )}
        </>
    );
}