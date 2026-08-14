"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Sparkles, Menu, X, FileDown, ArrowUpRight, Radio } from "lucide-react";
import { KokonutSwitch } from "@/components/ui/kokonut-switch";
import { SoundToggle } from "@/components/ui/sound-toggle";
import { useSound } from "@/components/SoundProvider";

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { playTap, playClick, playHoverNote } = useSound();

  const navRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springX = useSpring(mouseX, { stiffness: 220, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-500);
    mouseY.set(-500);
    setHoveredIndex(null);
  };

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Resume", href: "#resume" },
    { name: "Stack", href: "#stack" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-5xl">
      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-theme-card backdrop-blur-2xl border shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300"
      >
        {/* Top Specular Line */}
        <div className="pointer-events-none absolute inset-x-6 sm:inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 dark:via-white/40 to-transparent z-30" />

        {/* Dynamic Specular Lens Spotlight following cursor on Navbar */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                220px circle at ${springX}px ${springY}px,
                rgba(16, 185, 129, 0.18) 0%,
                rgba(99, 102, 241, 0.08) 45%,
                transparent 80%
              )
            `,
          }}
        />

        {/* Left: Brand Identity & Live Pulse Beacon */}
        <a
          href="#"
          onClick={() => playClick()}
          className="relative z-20 flex items-center gap-2 sm:gap-2.5 group/logo py-0.5 shrink-0"
        >
          <div className="relative flex items-center justify-center shrink-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981] group-hover/logo:scale-125 transition-transform" />
            <span className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-400/40 animate-ping" />
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-xs sm:text-sm tracking-tight text-theme-primary group-hover/logo:text-emerald-500 transition-colors">
              Swapnoneel
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-theme-muted tracking-wider uppercase -mt-0.5 flex items-center gap-0.5 sm:gap-1">
              <Radio size={8} className="text-emerald-500" /> IEM Kolkata
            </span>
          </div>
        </a>

        {/* Center: Interactive Sliding Liquid Dock Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 relative z-20 bg-theme-sub/60 p-1 rounded-full border border-slate-200/60 dark:border-white/[0.06] backdrop-blur-md">
          {navLinks.map((link, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  playHoverNote(idx);
                }}
                onClick={() => playClick()}
                className="relative px-3.5 py-1.5 text-xs font-semibold text-theme-secondary hover:text-theme-primary transition-colors duration-200"
              >
                {/* Floating spring indicator */}
                {isHovered && (
                  <motion.span
                    layoutId="navbar-hover-indicator"
                    className="absolute inset-0 rounded-full bg-white dark:bg-white/[0.12] border border-slate-200 dark:border-white/20 shadow-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right: High-Vibe Action Cluster (Desktop) */}
        <div className="hidden md:flex items-center gap-2 relative z-20">
          <SoundToggle />
          <KokonutSwitch />

          {/* Direct Resume Download Link */}
          <motion.a
            href="/Swapnoneel_Mondal_Resume.pdf"
            download="Swapnoneel_Mondal_Resume.pdf"
            target="_blank"
            onClick={() => playClick()}
            onMouseEnter={() => playTap()}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="group/cv relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-theme-sub border hover:border-emerald-500/50 text-xs font-mono font-bold text-theme-primary shadow-sm overflow-hidden transition-all duration-300 cursor-pointer"
            title="Download Official Resume PDF"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/15 dark:via-white/15 to-transparent -translate-x-full group-hover/cv:translate-x-full transition-transform duration-700" />
            <FileDown size={13} className="text-emerald-500 group-hover/cv:scale-110 transition-transform" />
            <span>CV</span>
          </motion.a>

          {/* High-Energy 'Let's Connect' Magnetic Neon Button */}
          <motion.a
            href="#contact"
            onClick={() => playClick()}
            onMouseEnter={() => playTap()}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="relative group/hire flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_70%)] opacity-0 group-hover/hire:opacity-100 transition-opacity" />
            <Sparkles size={13} className="text-cyan-200 animate-spin-around" />
            <span>Let&apos;s Talk</span>
            <ArrowUpRight size={13} className="group-hover/hire:translate-x-0.5 group-hover/hire:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>

        {/* Mobile Controls (Sound + Theme + Hamburger Menu) */}
        <div className="flex md:hidden items-center gap-1.5 relative z-20">
          <SoundToggle />
          <KokonutSwitch />
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-full bg-theme-sub border text-theme-primary hover:text-emerald-500 transition-colors cursor-pointer active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 p-4 rounded-3xl bg-theme-card backdrop-blur-2xl border shadow-2xl flex flex-col gap-2"
          >
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                }}
                onMouseEnter={() => playHoverNote(idx)}
                className="text-xs font-semibold text-theme-secondary hover:text-theme-primary py-2.5 px-3.5 rounded-2xl hover:bg-theme-sub active:bg-theme-sub transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight size={14} className="text-theme-muted" />
              </a>
            ))}

            <div className="flex gap-2 pt-2 mt-1 border-t border-slate-200 dark:border-white/10">
              <a
                href="/Swapnoneel_Mondal_Resume.pdf"
                download="Swapnoneel_Mondal_Resume.pdf"
                target="_blank"
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 text-center py-2.5 rounded-2xl bg-theme-sub text-theme-primary font-mono text-xs font-bold border flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <FileDown size={14} className="text-emerald-500" />
                <span>Resume PDF</span>
              </a>
              <a
                href="#contact"
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 text-center py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <Sparkles size={14} />
                <span>Let&apos;s Talk</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
