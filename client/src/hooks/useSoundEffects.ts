/* =============================================================
   useSoundEffects Hook — SpinPick Clone
   Manages sound effects preferences and playback
   ============================================================= */

import { useState, useEffect } from "react";
import { soundEffects } from "@/lib/soundEffects";

const SOUND_PREFERENCE_KEY = "spinpick_sound_enabled";

export function useSoundEffects() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load sound preference from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SOUND_PREFERENCE_KEY);
      if (stored !== null) {
        const enabled = JSON.parse(stored);
        setSoundEnabled(enabled);
        soundEffects.setEnabled(enabled);
      }
    } catch (error) {
      console.error("Failed to load sound preference:", error);
    }
  }, []);

  // Update sound effects when preference changes
  useEffect(() => {
    soundEffects.setEnabled(soundEnabled);
    try {
      localStorage.setItem(SOUND_PREFERENCE_KEY, JSON.stringify(soundEnabled));
    } catch (error) {
      console.error("Failed to save sound preference:", error);
    }
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const playTick = () => {
    soundEffects.playTick();
  };

  const playFanfare = () => {
    soundEffects.playFanfare();
  };

  const playSpinTicks = (durationMs?: number) => {
    soundEffects.playSpinTicks(durationMs);
  };

  return {
    soundEnabled,
    toggleSound,
    playTick,
    playFanfare,
    playSpinTicks,
  };
}
