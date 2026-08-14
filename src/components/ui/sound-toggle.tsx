"use client";

import React from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/components/SoundProvider";

export function SoundToggle() {
  const { soundEnabled, toggleSound, playClick } = useSound();

  const handleClick = () => {
    playClick();
    toggleSound();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      aria-label={soundEnabled ? "Mute UI Sound Effects" : "Enable UI Sound Effects"}
      title={soundEnabled ? "UI Audio: ON (Click to mute)" : "UI Audio: MUTED (Click to unmute)"}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-theme-sub border text-theme-primary hover:border-emerald-500/40 text-xs font-mono font-semibold transition-colors cursor-pointer shadow-sm"
    >
      {soundEnabled ? (
        <>
          <Volume2 size={13} className="text-emerald-500" />
          {/* Animated EQ soundwave bars */}
          <div className="flex items-center gap-0.5 h-3">
            <motion.span
              animate={{ height: ["30%", "100%", "40%", "80%", "30%"] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              className="w-[2px] bg-emerald-500 rounded-full"
            />
            <motion.span
              animate={{ height: ["80%", "30%", "100%", "50%", "80%"] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.15 }}
              className="w-[2px] bg-teal-400 rounded-full"
            />
            <motion.span
              animate={{ height: ["40%", "90%", "30%", "100%", "40%"] }}
              transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut", delay: 0.3 }}
              className="w-[2px] bg-indigo-400 rounded-full"
            />
          </div>
        </>
      ) : (
        <>
          <VolumeX size={13} className="text-theme-muted" />
          <span className="text-[10px] text-theme-muted font-mono">MUTED</span>
        </>
      )}
    </motion.button>
  );
}
