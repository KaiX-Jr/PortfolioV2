"use client";

import HeroCanvas from "./HeroCanvas";
import { ArrowDown, Code2, Sparkles, Terminal } from "lucide-react";
import { Strands } from "@/components/ui/strands";
import { ShinyText } from "@/components/ui/shiny-text";
import { BlurText } from "@/components/ui/blur-text";
import { GradientText } from "@/components/ui/gradient-text";
import { useSound } from "@/components/SoundProvider";

export default function Hero() {
  const { playClick, playTap } = useSound();

  return (
    <section className="min-h-[78vh] sm:min-h-[82vh] lg:min-h-[86vh] flex flex-col justify-center items-start relative overflow-hidden rounded-3xl p-4 sm:p-8 md:p-12 lg:p-14 border bg-theme-card backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] my-2 sm:my-4">
      {/* Top Specular Glare */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 dark:via-white/40 to-transparent z-20" />

      {/* WebGL Ambient Background */}
      <HeroCanvas />

      {/* React Bits Kinetic Flowing Strands Animation */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <Strands
          strandCount={5}
          colors={["#10b981", "#34d399", "#6366f1", "#059669"]}
          speed={0.001}
          amplitude={55}
          className="w-full h-full opacity-25 dark:opacity-30"
        />
      </div>

      {/* Radial Glows */}
      <div className="ambient-glow bg-[#10b981] w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] -top-32 -left-32 opacity-15 dark:opacity-20" />
      <div className="ambient-glow bg-[#6366f1] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bottom-10 right-10 opacity-10 dark:opacity-15" />

      {/* Status Tag with React Bits ShinyText */}
      <div className="anime-hero-badge relative inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-emerald-50 dark:bg-white/[0.06] border border-emerald-200 dark:border-white/[0.12] text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-emerald-800 dark:text-emerald-300 mb-4 sm:mb-8 overflow-hidden backdrop-blur-md shadow-sm z-20 max-w-full">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#34d399] shrink-0" />
        <ShinyText speed={3.5} className="text-emerald-900 dark:text-slate-200 font-mono text-[10px] sm:text-xs font-bold truncate">
          AVAILABLE FOR ROLES &amp; CONTRACTS // IEM
        </ShinyText>
      </div>

      {/* Main Headline (Clean, Responsive, High Contrast) */}
      <div className="anime-hero-title mb-3 sm:mb-6 leading-[1.15] text-theme-primary max-w-4xl z-20">
        <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-theme-primary break-words">
          <span className="block mb-1 sm:mb-2 text-theme-primary">
            Digital Architect.
          </span>
          <span className="block">
            <GradientText
              colors={["#059669", "#10b981", "#4f46e5", "#7c3aed", "#059669"]}
              animationSpeed={6}
            >
              Creative Technologist
            </GradientText>{" "}
            <span className="font-normal italic text-theme-secondary">&amp; Software Engineer.</span>
          </span>
        </h1>
      </div>

      {/* Subtitle with React Bits BlurText */}
      <div className="anime-hero-sub text-xs sm:text-sm md:text-base lg:text-lg text-theme-secondary max-w-2xl mb-6 sm:mb-10 leading-relaxed font-normal z-20">
        <BlurText
          text="Hi, I'm Swapnoneel Mondal — Computer Science student at Institute of Engineering & Management (IEM), West Bengal. Specializing in high-performance frontend engineering, interactive web applications, digital systems, and data analytics."
          delay={16}
          animateBy="words"
          direction="top"
          className="text-theme-secondary leading-relaxed"
        />
      </div>

      {/* Action Buttons - Mobile friendly full width with touch targets */}
      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto z-20">
        <a
          href="#projects"
          onClick={() => playClick()}
          onMouseEnter={() => playTap()}
          className="bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-semibold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] group min-h-[44px]"
        >
          <Code2 size={16} />
          <span>Explore My Works</span>
        </a>
        <a
          href="#about"
          onClick={() => playClick()}
          onMouseEnter={() => playTap()}
          className="bg-theme-sub hover:opacity-90 text-theme-primary border px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-semibold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 backdrop-blur-md min-h-[44px]"
        >
          <Terminal size={16} />
          <span>About &amp; Experience</span>
        </a>
      </div>

      {/* Quick Specs / Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-14 pt-5 sm:pt-8 border-t border-slate-200 dark:border-white/[0.08] w-full max-w-3xl z-20">
        <div className="group cursor-default">
          <div className="text-base sm:text-xl lg:text-2xl font-bold text-theme-primary">IEM Scholar</div>
          <div className="text-[10px] sm:text-xs text-theme-muted font-mono mt-0.5 sm:mt-1">B.Tech CS 2024–Present</div>
        </div>
        <div className="group cursor-default">
          <div className="text-base sm:text-xl lg:text-2xl font-bold text-emerald-600 dark:text-emerald-400">Frontend Dev</div>
          <div className="text-[10px] sm:text-xs text-theme-muted font-mono mt-0.5 sm:mt-1">Interactive UI Systems</div>
        </div>
        <div className="group cursor-default">
          <div className="text-base sm:text-xl lg:text-2xl font-bold text-teal-600 dark:text-cyan-300">Data Analytics</div>
          <div className="text-[10px] sm:text-xs text-theme-muted font-mono mt-0.5 sm:mt-1">Machine Learning &amp; Logic</div>
        </div>
        <div className="group cursor-default">
          <div className="text-base sm:text-xl lg:text-2xl font-bold text-indigo-600 dark:text-purple-300 flex items-center gap-1">
            <Sparkles size={15} className="text-emerald-500 shrink-0" /> React &amp; Next
          </div>
          <div className="text-[10px] sm:text-xs text-theme-muted font-mono mt-0.5 sm:mt-1">Full-Stack Apps</div>
        </div>
      </div>

      {/* Scroll Down Indicator (Desktop / Tablet) */}
      <a
        href="#stack"
        onClick={() => playClick()}
        className="absolute bottom-5 sm:bottom-8 right-5 sm:right-8 p-2.5 sm:p-3 rounded-full bg-theme-sub border text-theme-secondary hover:text-theme-primary transition-all animate-bounce hidden sm:flex items-center justify-center backdrop-blur-md z-20"
        aria-label="Scroll to Tech Stack"
      >
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
