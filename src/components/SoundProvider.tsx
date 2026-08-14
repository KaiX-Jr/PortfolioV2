"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { spatialAudio } from "@/lib/sound-system";

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playTap: () => void;
  playClick: () => void;
  playChime: () => void;
  playHoverNote: (index?: number) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const lastPos = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_sound_enabled");
    if (saved !== null) {
      const isEnabled = saved === "true";
      setSoundEnabled(isEnabled);
      spatialAudio.setEnabled(isEnabled);
    }

    // Unlock browser AudioContext on first user interaction
    const unlockAudio = () => {
      spatialAudio.resumeContext();
    };

    window.addEventListener("pointerdown", unlockAudio, { passive: true });
    window.addEventListener("click", unlockAudio, { passive: true });
    window.addEventListener("touchstart", unlockAudio, { passive: true });
    window.addEventListener("keydown", unlockAudio, { passive: true });

    // Process Pointer or Touch Coordinates
    const processMovement = (clientX: number, clientY: number) => {
      if (!spatialAudio.enabled) return;

      const now = performance.now();
      const dt = Math.max(1, now - lastPos.current.time);
      const dx = clientX - lastPos.current.x;
      const dy = clientY - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = (distance / dt) * 10;

      lastPos.current = { x: clientX, y: clientY, time: now };

      const normalizedX = Math.max(0, Math.min(1, clientX / window.innerWidth));
      const normalizedY = Math.max(0, Math.min(1, clientY / window.innerHeight));

      spatialAudio.handleMouseMove(normalizedX, normalizedY, speed);
    };

    // 1. Mouse Event (Desktop)
    const handleMouseMove = (e: MouseEvent) => {
      processMovement(e.clientX, e.clientY);
    };

    // 2. Touch Events (Mobile Finger Drag)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        processMovement(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      spatialAudio.resumeContext();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        lastPos.current = { x: touch.clientX, y: touch.clientY, time: performance.now() };
        spatialAudio.playHoverChime(Math.floor(Math.random() * 5));
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    spatialAudio.setEnabled(nextState);
    localStorage.setItem("portfolio_sound_enabled", String(nextState));
    if (nextState) {
      spatialAudio.resumeContext();
      spatialAudio.playSuccessChime();
    }
  };

  const playTap = () => spatialAudio.playGlassTap();
  const playClick = () => spatialAudio.playMechanicalClick();
  const playChime = () => spatialAudio.playSuccessChime();
  const playHoverNote = (index: number = 0) => spatialAudio.playHoverChime(index);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playTap,
        playClick,
        playChime,
        playHoverNote,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    return {
      soundEnabled: true,
      toggleSound: () => {},
      playTap: () => {},
      playClick: () => {},
      playChime: () => {},
      playHoverNote: () => {},
    };
  }
  return context;
}
