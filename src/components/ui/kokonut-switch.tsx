"use client";

import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

interface KokonutSwitchProps {
  className?: string;
}

export function KokonutSwitch({ className = "" }: KokonutSwitchProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle light and dark mode"
      className={cn(
        "relative flex h-8 w-15 cursor-pointer items-center rounded-full p-1 transition-all duration-500",
        "border border-white/15 backdrop-blur-xl shadow-inner",
        isDark
          ? "bg-[#0c0c16]/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
          : "bg-slate-200/80 border-slate-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {/* Track Background Ambient Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] pointer-events-none">
        <Sun
          size={12}
          className={cn(
            "transition-opacity duration-300",
            isDark ? "opacity-30 text-amber-300" : "opacity-0"
          )}
        />
        <Moon
          size={11}
          className={cn(
            "transition-opacity duration-300",
            isDark ? "opacity-0" : "opacity-40 text-indigo-600"
          )}
        />
      </div>

      {/* Animated Sliding Thumb */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className={cn(
          "relative z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-md",
          isDark
            ? "ml-auto bg-gradient-to-tr from-indigo-600 to-purple-600 text-cyan-200 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
            : "mr-auto bg-gradient-to-tr from-amber-400 to-orange-400 text-white shadow-[0_0_10px_rgba(251,191,36,0.5)]"
        )}
      >
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ rotate: -45, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 45, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <Moon size={12} /> : <Sun size={12} />}
        </motion.div>
      </motion.div>
    </button>
  );
}
