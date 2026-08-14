"use client";

import { Code2, Cpu, Database, Palette, Terminal } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { KokonutBentoGrid } from "@/components/ui/kokonut-spotlight-card";
import { GradientText } from "@/components/ui/gradient-text";
import { BlurText } from "@/components/ui/blur-text";
import { ShinyText } from "@/components/ui/shiny-text";
import { useSound } from "@/components/SoundProvider";

export default function TechStack() {
  const { playTap } = useSound();
  const coreTech = ["Python", "C", "MATLAB", "JavaScript", "React 19", "Next.js 16", "TypeScript"];
  const stylingTech = ["Tailwind CSS", "Framer Motion", "Anime.js", "Responsive Architecture", "CSS3 / HTML5"];
  const backendTech = ["Node.js", "Express", "MongoDB", "MySQL", "Machine Learning", "Git & GitHub", "Netlify"];

  return (
    <section className="py-10 sm:py-16 relative scroll-mt-28 sm:scroll-mt-36" id="stack">
      {/* Ambient Glow */}
      <div className="ambient-glow bg-[#10b981] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] -bottom-20 right-0 opacity-15" />

      {/* Header */}
      <div className="anime-section-title flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
        <div>
          <div className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
            <Cpu size={14} />
            <ShinyText speed={4} className="text-emerald-600 dark:text-emerald-400 font-mono">
              System Architecture
            </ShinyText>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-theme-primary tracking-tight">
            Tech Stack &amp;{" "}
            <GradientText
              colors={["#059669", "#10b981", "#4f46e5", "#7c3aed", "#059669"]}
              animationSpeed={6}
              className="italic font-normal"
            >
              Capabilities
            </GradientText>
          </h2>
        </div>
        <BlurText
          text="Carefully selected languages, tools, and frameworks engineered for maximum rendering speed and developer velocity."
          delay={15}
          animateBy="words"
          className="text-xs sm:text-sm text-theme-secondary max-w-md leading-relaxed"
        />
      </div>

      {/* Bento Grid with Harmonious Liquid Glass */}
      <KokonutBentoGrid className="anime-grid-container gap-4 sm:gap-6">
        {/* Bento Item 1: Core Technologies (Col-span 8) */}
        <LiquidGlassCard
          glowColor="#10b981"
          refractionColor="#6366f1"
          className="anime-card md:col-span-8 p-5 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-5 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 shadow-sm shrink-0">
                  <Code2 size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold text-theme-primary">
                    Core Languages &amp; Web Systems
                  </h3>
                  <p className="text-[11px] sm:text-xs text-theme-muted mt-0.5">Primary languages &amp; modern runtimes</p>
                </div>
              </div>
              <span className="shrink-0 px-2.5 sm:px-3 py-1 rounded-full bg-theme-sub border text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-emerald-700 dark:text-purple-200">
                01 // CORE
              </span>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-5 sm:mb-6">
              {coreTech.map((tech) => (
                <span
                  key={tech}
                  onMouseEnter={() => playTap()}
                  className="bg-theme-sub hover:bg-emerald-500/20 text-theme-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold border transition-all hover:scale-105"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-white/[0.08] flex justify-between items-center text-[11px] sm:text-xs text-theme-muted">
            <span>High-velocity development</span>
            <span className="text-emerald-600 dark:text-emerald-300 font-mono">React 19 &amp; Next.js 16</span>
          </div>
        </LiquidGlassCard>

        {/* Bento Item 2: UI Engineering & Motion (Col-span 4) */}
        <LiquidGlassCard
          glowColor="#38bdf8"
          refractionColor="#10b981"
          className="anime-card md:col-span-4 p-5 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-5 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-teal-500/15 dark:bg-cyan-500/20 text-teal-600 dark:text-cyan-300 border border-teal-500/30 shadow-sm shrink-0">
                  <Palette size={20} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-theme-primary">
                    UI &amp; Motion Design
                  </h3>
                  <p className="text-[11px] sm:text-xs text-theme-muted mt-0.5">Component systems &amp; animations</p>
                </div>
              </div>
              <span className="shrink-0 px-2 sm:px-2.5 py-1 rounded-full bg-theme-sub border text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-teal-700 dark:text-cyan-200">
                02 // VISUAL
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
              {stylingTech.map((tech) => (
                <span
                  key={tech}
                  onMouseEnter={() => playTap()}
                  className="bg-theme-sub hover:bg-teal-500/20 text-theme-primary px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-white/[0.08] flex justify-between items-center text-[11px] sm:text-xs text-theme-muted">
            <span>Pixel-Perfect Craftsmanship</span>
            <span className="text-teal-600 dark:text-cyan-300 font-mono">Modern CSS</span>
          </div>
        </LiquidGlassCard>

        {/* Bento Item 3: Backend & Data Analytics (Col-span 12) */}
        <LiquidGlassCard
          glowColor="#6366f1"
          refractionColor="#10b981"
          className="anime-card md:col-span-12 p-5 sm:p-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 sm:gap-6">
            <div className="flex-1 w-full">
              <div className="flex items-start sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-indigo-500/15 dark:bg-purple-500/20 text-indigo-600 dark:text-purple-300 border border-indigo-500/30 shadow-sm shrink-0">
                    <Database size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-theme-primary">
                      Backend, Databases &amp; Machine Learning
                    </h3>
                    <p className="text-[11px] sm:text-xs text-theme-muted mt-0.5">Database management &amp; data modeling</p>
                  </div>
                </div>
                <span className="shrink-0 px-2.5 sm:px-3 py-1 rounded-full bg-theme-sub border text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-indigo-700 dark:text-purple-200">
                  03 // INFRA
                </span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {backendTech.map((tech) => (
                  <span
                    key={tech}
                    onMouseEnter={() => playTap()}
                    className="bg-theme-sub hover:bg-indigo-500/20 text-theme-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold border transition-all hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-theme-sub p-4 sm:p-5 rounded-2xl border max-w-sm w-full backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 dark:text-purple-300 mb-1">
                <Terminal size={14} />
                Runtime Architecture
              </div>
              <p className="text-xs text-theme-secondary leading-relaxed">
                Modern reactive architecture, scalable data processing, and full-stack software systems.
              </p>
            </div>
          </div>
        </LiquidGlassCard>
      </KokonutBentoGrid>
    </section>
  );
}
