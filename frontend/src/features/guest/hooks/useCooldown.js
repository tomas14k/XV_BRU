import { useState, useEffect, useCallback, useRef } from "react";
import { COOLDOWN_SECONDS } from "../constants/guest";

const STORAGE_KEY = "brune_last_upload_ts";

/**
 * Returns remaining cooldown seconds and a function to start the cooldown.
 * Persists to sessionStorage so a page reload doesn't reset it.
 */
export function useCooldown() {
  const intervalRef = useRef(null);

  const getRemainingSeconds = () => {
    const last = sessionStorage.getItem(STORAGE_KEY);
    if (!last) return 0;
    const elapsed = Math.floor((Date.now() - Number(last)) / 1000);
    return Math.max(0, COOLDOWN_SECONDS - elapsed);
  };

  const [remaining, setRemaining] = useState(getRemainingSeconds);

  // Tick every second while cooldown is active
  useEffect(() => {
    if (remaining <= 0) return;

    intervalRef.current = setInterval(() => {
      const r = getRemainingSeconds();
      setRemaining(r);
      if (r <= 0) clearInterval(intervalRef.current);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [remaining]);

  const startCooldown = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, String(Date.now()));
    setRemaining(COOLDOWN_SECONDS);
  }, []);

  return { remaining, isCoolingDown: remaining > 0, startCooldown };
}