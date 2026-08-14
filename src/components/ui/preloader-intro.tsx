"use client";

import React, { useEffect, useState } from "react";
import { animate, stagger } from "animejs";
import { Terminal, Sparkles, Cpu, Layers, ShieldCheck, Zap } from "lucide-react";
import { AnimatedShinyText } from "./animated-shiny-text";
import { BorderBeam } from "./border-beam";

export function PreloaderIntro({ onComplete }: { onComplete?: () => void }) {
  const [counter, setCounter] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const statusMessages = [
    "INITIALIZING CORE ARCHITECTURE...",
    "COMPILING REACT 19 & NEXT.JS 16 SYSTEMS...",
    "CALIBRATING HARDWARE ACCELERATED GRAPHICS...",
    "PREPARING INTERACTIVE DESIGN SYSTEM...",
    "SYSTEM INITIALIZED // LAUNCHING EXPERIENCE...",
  ];

  useEffect(() => {
    // 1. Initial Word & Ring Spring Stagger Animations
    animate(".preloader-char", {
      translateY: [40, 0],
      opacity: [0, 1],
      rotate: [-6, 0],
      delay: stagger(35, { start: 100 }),
      duration: 1000,
      ease: "outElastic(1, .6)",
    });

    animate(".preloader-ring", {
      rotate: [0, 360],
      duration: 8000,
      repeat: -1,
      ease: "linear",
    });

    animate(".preloader-ring-reverse", {
      rotate: [360, 0],
      duration: 12000,
      repeat: -1,
      ease: "linear",
    });

    // 2. Smooth Non-Linear Counter Physics (0 to 100)
    const obj = { value: 0 };
    animate(obj, {
      value: 100,
      duration: 2500,
      ease: "easeInOutCubic",
      onUpdate: () => {
        const val = Math.floor(obj.value);
        setCounter(val);
        if (val < 25) setStatusIndex(0);
        else if (val < 50) setStatusIndex(1);
        else if (val < 75) setStatusIndex(2);
        else if (val < 98) setStatusIndex(3);
        else setStatusIndex(4);
      },
      onComplete: () => {
        // 3. Cinematic Dual-Curtain Split Reveal Exit
        animate(".preloader-curtain-top", {
          translateY: ["0%", "-100%"],
          duration: 900,
          ease: "outExpo",
        });

        animate(".preloader-curtain-bottom", {
          translateY: ["0%", "100%"],
          duration: 900,
          ease: "outExpo",
        });

        animate(".preloader-center-hub", {
          scale: [1, 1.15],
          opacity: [1, 0],
          duration: 600,
          ease: "outExpo",
          onComplete: () => {
            setIsVisible(false);
            if (onComplete) onComplete();
          },
        });
      },
    });
  }, [onComplete]);

  if (!isVisible) return null;

  const titleLetters = "SWAPNONEEL MONDAL".split("");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center select-none overflow-hidden pointer-events-auto">
      {/* Top Half Curtain */}
      <div className="preloader-curtain-top absolute inset-x-0 top-0 h-1/2 bg-[#08080c] border-b border-white/[0.08] z-10" />

      {/* Bottom Half Curtain */}
      <div className="preloader-curtain-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#08080c] border-t border-white/[0.08] z-10" />

      {/* Ambient Pulsing Glow Mesh */}
      <div className="ambient-glow bg-[#6366f1] w-[650px] h-[650px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[140px] z-20" />
      <div className="ambient-glow bg-[#38bdf8] w-[450px] h-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px] z-20" />

      {/* Central Floating HUD Console */}
      <div className="preloader-center-hub relative z-30 flex flex-col items-center justify-center max-w-xl w-[92%] p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] backdrop-blur-3xl bg-[#0e0e18]/80 border border-white/[0.15] shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_50px_rgba(99,102,241,0.25)]">
        {/* Magic UI Border Beam circling the console */}
        <BorderBeam size={160} duration={8} colorFrom="#6366f1" colorTo="#38bdf8" />

        {/* Top Specular Glare */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Futuristic Concentric HUD Rings */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 mb-8 flex items-center justify-center">
          {/* Outer Rotating Dotted Ring */}
          <div className="preloader-ring absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/40" />

          {/* Inner Reverse Rotating Ring */}
          <div className="preloader-ring-reverse absolute inset-3 rounded-full border border-cyan-400/30" />

          {/* Glowing Center Core */}
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-indigo-600/40 via-purple-600/30 to-cyan-500/20 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)]">
            <span className="text-3xl md:text-4xl font-black font-mono tracking-tighter bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent">
              {counter}%
            </span>
            <span className="text-[9px] font-mono font-bold text-indigo-300 uppercase tracking-widest mt-0.5">
              READY
            </span>
          </div>

          {/* Pulse Node */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-ping" />
        </div>

        {/* Kinetic Scramble Headline */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono font-semibold text-indigo-200 mb-3 backdrop-blur-md">
            <Sparkles size={13} className="text-cyan-400" />
            <AnimatedShinyText className="text-xs font-mono font-bold">
              ENGINEERING &amp; DESIGN PORTFOLIO // v2.0
            </AnimatedShinyText>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight flex justify-center gap-[1px]">
            {titleLetters.map((char, i) => (
              <span
                key={i}
                className="preloader-char inline-block opacity-0 bg-gradient-to-b from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent"
                style={{ width: char === " " ? "0.4em" : "auto" }}
              >
                {char}
              </span>
            ))}
          </h2>
        </div>

        {/* Dynamic System Terminal Status Log */}
        <div className="w-full mt-6 bg-black/40 border border-white/[0.08] rounded-2xl p-4 flex flex-col gap-2.5 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Terminal size={14} className="text-indigo-400" />
              STATUS:
            </span>
            <span className="text-cyan-300 font-bold font-mono animate-pulse">
              {statusMessages[statusIndex]}
            </span>
          </div>

          {/* High-Tech Glowing Progress Bar */}
          <div className="w-full h-2 bg-white/[0.08] rounded-full overflow-hidden p-0.5 border border-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-75 shadow-[0_0_15px_#6366f1]"
              style={{ width: `${counter}%` }}
            />
          </div>
        </div>

        {/* Footer Subtext */}
        <div className="mt-6 flex items-center justify-between w-full text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Cpu size={12} className="text-indigo-400" />
            IEM Kolkata CS 2024–Present
          </span>
          <span className="flex items-center gap-1.5">
            <Layers size={12} className="text-cyan-400" />
            Bespoke Liquid Glass Architecture
          </span>
        </div>
      </div>
    </div>
  );
}
