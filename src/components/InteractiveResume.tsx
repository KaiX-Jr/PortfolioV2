"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  Copy,
  Check,
  FileText,
  Sparkles,
  Eye,
  X,
  GraduationCap,
  Briefcase,
  Code2,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { GradientText } from "@/components/ui/gradient-text";
import { ShinyText } from "@/components/ui/shiny-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { useSound } from "@/components/SoundProvider";

export default function InteractiveResume() {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { playClick, playChime } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  const resumePlainText = `SWAPNONEEL MONDAL
Computer Science Scholar • High-Performance Web & Full-Stack Developer • AI Systems
West Bengal, India | swapnoneelmondal@gmail.com
LinkedIn: https://www.linkedin.com/in/swapnoneel07 | GitHub: https://github.com/KaiX-Jr | Portfolio: https://swapnoneelmondal.vercel.app

PROFESSIONAL SUMMARY
Computer Science student at Institute of Engineering & Management (IEM), Kolkata, focusing on modern component-driven frontend architecture, cognitive AI integrations, digital systems, and full-stack web platforms. Experienced in high-velocity prototyping ("vibe coding"), combining core algorithmic foundations with LLMs (Gemini, Claude), Web Audio API synthesizers, and real-time computer vision models to engineer ultra-responsive, accessible digital applications.

EDUCATION
Bachelor of Technology in Computer Science & Engineering (2024 – Present)
Institute of Engineering & Management (IEM), Kolkata, West Bengal
• Foundational Coursework: Data Structures & Algorithms, Object-Oriented Programming, Digital Logic Design, Computer Architecture, Discrete Mathematics.
• Practical Engineering: Algorithm implementations in C & Python, matrix analysis in MATLAB, digital gate & circuit simulation in Logisim.

FEATURED PROJECTS
1. Scholar OS — Cognitive Academic OS & Vision Analyzer (2025 – 2026)
   Tech: Next.js 16, React 19, Google Gemini 2.5 Flash, TypeScript, Tailwind CSS
   Live: https://scholardashboard.vercel.app | Repo: https://github.com/KaiX-Jr/scholar-os
   • Architected an AI-native academic operating system that converts blackboard/whiteboard photos into organized markdown notes, summaries, and key formula sheets via Gemini multimodal vision.
   • Implemented attendance threshold forecast simulations, subject analytics tracker, and daily automated AI quiz generation with real-time scoring.

2. Dynovision — Real-Time Computer Vision & Gesture AI HUD (2025 – 2026)
   Tech: React 19, MobileNetV2, MediaPipe, HTML5 Canvas, Netlify
   Live: https://dynovision.netlify.app
   • Built an in-browser affective computer vision engine executing facial landmark detection, emotion classification, and gesture tracking directly on client hardware with zero backend latency.
   • Designed a telemetry HUD with dynamic canvas overlays, real-time FPS monitoring, and glassmorphic controls.

3. LogiSimulate — Digital Logic Circuit Simulator & Minimizer (2024 – 2025)
   Tech: Python, C, Logisim, Digital Systems
   • Developed a circuit simulator for testing combinational boolean networks, multiplexers, and logic gate propagation delays.
   • Implemented automated Karnaugh map simplification algorithms to minimize gate counts and optimize hardware efficiency.

4. DataPredict ML — Predictive Modeling & Matrix Analytics (2024 – 2025)
   Tech: Python, MATLAB, NumPy, Scikit-learn
   • Engineered data pipelines for statistical exploratory data analysis, matrix decomposition, and multi-variable predictive regression models.

EXPERIENCE & TECHNICAL ENDEAVORS
1. Vibe Coder & AI-Assisted Full-Stack Developer (2026 – Present)
   Independent & Open Source Projects
   • Leveraging state-of-the-art LLMs and agentic workflows to rapidly architect, prototype, and ship full-stack web applications with high test coverage and component modularity.
   • Synthesized Web Audio API spatial synthesizers, spring physics animations (Framer Motion), and responsive Bento grid interfaces with zero-runtime CSS variables.

2. Independent Web Creator & Frontend Developer (2024 – Present)
   Self-Directed Engineering
   • Designing and deploying modern web applications adhering to Core Web Vitals (CWV), strict accessibility standards (a11y), and cross-browser responsiveness across desktop and touchscreens.

TECHNICAL SKILLS
• Programming Languages: JavaScript (ES6+), TypeScript, Python, C, MATLAB, HTML5, CSS3/PostCSS
• Web & Frameworks: React 19, Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, Anime.js, Web Audio API
• AI & Computer Vision: Google Gemini 2.5 Flash API, Prompt Engineering, MobileNetV2, MediaPipe, LLM Integration
• Tools & Environments: Git, GitHub, Turbopack, Logisim, Netlify, Vercel, VS Code, Windows/PowerShell`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(resumePlainText);
    playChime();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-8 sm:py-14 md:py-16 relative scroll-mt-24 sm:scroll-mt-36" id="resume">
      {/* Ambient Glow */}
      <div className="ambient-glow bg-[#10b981] w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] top-1/4 right-0 opacity-15" />
      <div className="ambient-glow bg-[#6366f1] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bottom-0 left-0 opacity-15" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-3 sm:gap-4">
        <div>
          <div className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
            <FileText size={14} />
            <ShinyText speed={4} className="text-emerald-600 dark:text-emerald-400 font-mono">
              Curriculum Vitae &amp; Credentials
            </ShinyText>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-theme-primary tracking-tight">
            Resume &amp;{" "}
            <GradientText
              colors={["#059669", "#10b981", "#4f46e5", "#7c3aed", "#059669"]}
              animationSpeed={5}
              className="italic font-normal"
            >
              Credentials Hub
            </GradientText>
          </h2>
        </div>
      </div>

      {/* Streamlined Resume Download & Verification Card */}
      <LiquidGlassCard
        glowColor="#10b981"
        refractionColor="#6366f1"
        className="p-4 sm:p-7 md:p-10 relative overflow-hidden"
      >
        <BorderBeam size={220} duration={12} colorFrom="#10b981" colorTo="#6366f1" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Column: Quick Document Preview Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <a
              href="/Swapnoneel_Mondal_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => playClick()}
              className="group/doc relative w-full max-w-sm aspect-[1/1.3] sm:aspect-[1/1.35] bg-theme-sub hover:opacity-95 rounded-2xl border p-4 sm:p-6 shadow-md dark:shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Document Header Skeleton */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2.5 sm:pb-3 mb-3 sm:mb-4">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-theme-primary tracking-tight">SWAPNONEEL MONDAL</div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-emerald-600 dark:text-emerald-300 mt-0.5">CS Student • AI/ML • Vibe Coder</div>
                  </div>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center border border-emerald-500/30">
                    <FileText size={13} />
                  </div>
                </div>

                {/* Skeleton Document Lines */}
                <div className="space-y-2 sm:space-y-2.5 opacity-70">
                  <div className="h-2 bg-slate-400/40 dark:bg-white/20 rounded w-1/3 mb-1" />
                  <div className="h-1.5 bg-slate-300/40 dark:bg-white/10 rounded w-full" />
                  <div className="h-1.5 bg-slate-300/40 dark:bg-white/10 rounded w-5/6" />
                  <div className="h-1.5 bg-slate-300/40 dark:bg-white/10 rounded w-4/6" />

                  <div className="h-2 bg-slate-400/40 dark:bg-white/20 rounded w-1/4 mt-2 sm:mt-3 mb-1" />
                  <div className="h-1.5 bg-slate-300/40 dark:bg-white/10 rounded w-full" />
                  <div className="h-1.5 bg-slate-300/40 dark:bg-white/10 rounded w-3/4" />
                </div>
              </div>

              {/* Hover Overlay to View Fullscreen */}
              <div className="absolute inset-0 bg-white/95 dark:bg-[#08080c]/90 backdrop-blur-md opacity-0 group-hover/doc:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-theme-primary p-4 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_0_20px_#10b981]">
                  <ExternalLink size={18} />
                </div>
                <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-300">
                  Click to View Resume PDF
                </div>
                <p className="text-[10px] sm:text-[11px] text-theme-secondary">
                  Opens original verified PDF in new tab
                </p>
              </div>

              {/* Document Footer Status */}
              <div className="pt-2.5 sm:pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-theme-muted">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={11} /> Verified IEM Scholar
                </span>
                <span>PDF Format • 2026</span>
              </div>
            </a>
          </div>

          {/* Right Column: Download Actions & ATS Summary */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider mb-2 sm:mb-3">
                <Sparkles size={11} />
                Instant Access &amp; Export
              </div>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-theme-primary tracking-tight mb-1.5 sm:mb-2">
                Download Official Resume PDF
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed mb-3.5 sm:mb-6">
                Looking for a copy for review, ATS screening, or recruiting? Download the official PDF directly or copy formatted plain text to your clipboard.
              </p>

              {/* Quick ATS Match Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-3.5 sm:mb-6">
                <div className="bg-theme-sub p-2.5 sm:p-3 rounded-xl border">
                  <div className="text-[9px] sm:text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-semibold flex items-center gap-1">
                    <GraduationCap size={11} /> Education
                  </div>
                  <div className="text-xs font-bold text-theme-primary mt-0.5 sm:mt-1">B.Tech in CSE</div>
                  <div className="text-[9px] sm:text-[10px] text-theme-muted font-mono">IEM (2024–Present)</div>
                </div>

                <div className="bg-theme-sub p-2.5 sm:p-3 rounded-xl border">
                  <div className="text-[9px] sm:text-[10px] font-mono text-teal-600 dark:text-cyan-400 uppercase font-semibold flex items-center gap-1">
                    <Code2 size={11} /> Primary Stack
                  </div>
                  <div className="text-xs font-bold text-theme-primary mt-0.5 sm:mt-1">Python, C, React</div>
                  <div className="text-[9px] sm:text-[10px] text-theme-muted font-mono">JavaScript, MATLAB</div>
                </div>

                <div className="bg-theme-sub p-2.5 sm:p-3 rounded-xl border">
                  <div className="text-[9px] sm:text-[10px] font-mono text-indigo-600 dark:text-purple-400 uppercase font-semibold flex items-center gap-1">
                    <Briefcase size={11} /> Methodology
                  </div>
                  <div className="text-xs font-bold text-theme-primary mt-0.5 sm:mt-1">Vibe Coding</div>
                  <div className="text-[9px] sm:text-[10px] text-theme-muted font-mono">Generative AI Tools</div>
                </div>
              </div>
            </div>

            {/* Action Buttons Toolbar - Touch Friendly */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-slate-200 dark:border-white/10">
              <a
                href="/Swapnoneel_Mondal_Resume.pdf"
                download="Swapnoneel_Mondal_Resume.pdf"
                onClick={() => playClick()}
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer min-h-[44px]"
              >
                <Download size={14} />
                <span>Download Resume PDF</span>
              </a>

              <a
                href="/Swapnoneel_Mondal_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => playClick()}
                className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-theme-sub hover:opacity-90 text-theme-primary text-xs font-mono font-semibold transition-all border cursor-pointer active:scale-95 min-h-[44px]"
              >
                <Eye size={14} className="text-emerald-500 dark:text-emerald-400" />
                <span>Open PDF in Tab</span>
              </a>

              <button
                onClick={handleCopyText}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-theme-sub hover:opacity-90 text-theme-primary text-xs font-mono transition-all border cursor-pointer active:scale-95 min-h-[44px]"
                title="Copy Plain Text Markdown"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy Markdown"}</span>
              </button>
            </div>
          </div>
        </div>
      </LiquidGlassCard>

      {/* Fullscreen CV Preview Modal */}
      {modalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              playClick();
              setModalOpen(false);
            }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl max-h-[88vh] my-auto overflow-y-auto bg-white dark:bg-[#08080c] border border-slate-200 dark:border-white/25 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
            {/* Top Close Bar */}
            <div className="sticky top-0 right-0 flex justify-end z-30 mb-2">
              <button
                onClick={() => {
                  playClick();
                  setModalOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200 dark:bg-white/[0.12] hover:bg-rose-500 hover:text-white text-slate-800 dark:text-white font-mono text-xs font-bold border border-slate-300 dark:border-white/20 transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer min-h-[36px]"
                title="Close Modal (Esc)"
              >
                <X size={14} />
                <span>CLOSE</span>
              </button>
            </div>

            {/* Modal Header */}
            <div className="border-b border-slate-200 dark:border-white/10 pb-3 sm:pb-5 mb-3 sm:mb-5">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                COMPLETE CURRICULUM VITAE
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-theme-primary mt-1">Swapnoneel Mondal</h3>
              <p className="text-xs font-mono text-theme-muted mt-0.5">
                Computer Science Student • AI/ML Enthusiast • Vibe Coder
              </p>
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                West Bengal, India • swapnoneelmondal@gmail.com • linkedin.com/in/swapnoneel07
              </div>
            </div>

            {/* Full Document Sections */}
            <div className="space-y-3 sm:space-y-5 text-theme-secondary text-xs sm:text-sm leading-relaxed">
              <div>
                <h4 className="text-[11px] sm:text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider mb-1.5">
                  Professional Summary
                </h4>
                <p className="bg-theme-sub p-3 sm:p-4 rounded-xl border">
                  Computer Science student focusing on modern software development, data analytics, digital logic, and machine learning systems. Experienced in rapid prototyping and building interactive web platforms through AI-assisted workflows (&quot;vibe coding&quot;), prompt engineering, and core algorithms.
                </p>
              </div>

              <div>
                <h4 className="text-[11px] sm:text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider mb-1.5">
                  Education
                </h4>
                <div className="bg-theme-sub p-3 sm:p-4 rounded-xl border space-y-1">
                  <div className="font-bold text-theme-primary flex flex-col sm:flex-row sm:justify-between">
                    <span>Bachelor&apos;s Degree in Computer Science</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs">2024 — Present</span>
                  </div>
                  <div className="text-xs text-theme-muted">Institute of Engineering &amp; Management (IEM)</div>
                  <ul className="list-disc list-inside text-xs space-y-1 text-theme-secondary mt-1.5">
                    <li>Coursework &amp; Foundations: Core Computer Science, Data Structures &amp; Algorithms, Digital Logic Design, and Applied Mathematics.</li>
                    <li>Hands-on practical development utilizing MATLAB for matrix operations, C programming structures, and computer logic simulation.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] sm:text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider mb-1.5">
                  Experience &amp; Technical Endeavors
                </h4>
                <div className="space-y-2">
                  <div className="bg-theme-sub p-3 sm:p-4 rounded-xl border">
                    <div className="font-bold text-theme-primary flex flex-col sm:flex-row sm:justify-between">
                      <span>Vibe Coder &amp; AI-Assisted Developer</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs">2026 — Present</span>
                    </div>
                    <div className="text-xs text-theme-muted mb-1">Self-Directed / Independent Projects</div>
                    <ul className="list-disc list-inside text-xs space-y-0.5 text-theme-secondary">
                      <li>Leveraging modern LLMs and generative AI tools to rapidly architect, prototype, and ship responsive full-stack web applications.</li>
                      <li>Applying advanced prompt engineering strategies to synthesize design visions and optimize software pipelines.</li>
                    </ul>
                  </div>

                  <div className="bg-theme-sub p-3 sm:p-4 rounded-xl border">
                    <div className="font-bold text-theme-primary flex flex-col sm:flex-row sm:justify-between">
                      <span>Independent Web Creator &amp; Developer</span>
                      <span className="text-teal-600 dark:text-cyan-400 font-mono text-xs">2024 — Present</span>
                    </div>
                    <div className="text-xs text-theme-muted mb-1">Projects &amp; Web Development</div>
                    <ul className="list-disc list-inside text-xs space-y-0.5 text-theme-secondary">
                      <li>Designing, developing, and deploying modern interactive web platforms with clean user interfaces and smooth interactivity.</li>
                      <li>Integrating component-driven architecture using React, JavaScript, and custom styling solutions.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] sm:text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider mb-1.5">
                  Featured Projects
                </h4>
                <div className="space-y-2">
                  <div className="bg-theme-sub p-3 sm:p-4 rounded-xl border">
                    <div className="font-bold text-theme-primary flex flex-col sm:flex-row sm:justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span>Scholar OS — Cognitive Academic OS</span>
                        <a
                          href="https://scholardashboard.vercel.app/"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                        >
                          [Live Demo <ExternalLink size={9} />]
                        </a>
                      </div>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs">2025 — 2026</span>
                    </div>
                    <div className="text-[10px] font-mono text-indigo-600 dark:text-purple-300 mt-0.5">
                      Next.js 16, React 19, Gemini 2.5 Flash, TypeScript, Tailwind CSS
                    </div>
                    <ul className="list-disc list-inside text-xs space-y-0.5 text-theme-secondary mt-1.5">
                      <li>AI-native student dashboard converting blackboard photos to structured notes &amp; summaries with Gemini vision.</li>
                      <li>Simulates dynamic attendance thresholds, course GPA forecasts, and automated daily AI quizzes.</li>
                    </ul>
                  </div>

                  <div className="bg-theme-sub p-3 sm:p-4 rounded-xl border">
                    <div className="font-bold text-theme-primary flex flex-col sm:flex-row sm:justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span>Dynovision — Computer Vision &amp; Gesture HUD</span>
                        <a
                          href="https://dynovision.netlify.app/"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                        >
                          [Live Demo <ExternalLink size={9} />]
                        </a>
                      </div>
                      <span className="text-teal-600 dark:text-cyan-400 font-mono text-xs">2025 — 2026</span>
                    </div>
                    <div className="text-[10px] font-mono text-indigo-600 dark:text-purple-300 mt-0.5">
                      React 19, MobileNetV2, MediaPipe, HTML5 Canvas, Netlify
                    </div>
                    <ul className="list-disc list-inside text-xs space-y-0.5 text-theme-secondary mt-1.5">
                      <li>Real-time in-browser facial landmark analysis, emotion classification, and gesture tracking without backend latency.</li>
                      <li>Dynamic telemetry HUD with HTML5 canvas overlays and real-time FPS monitoring.</li>
                    </ul>
                  </div>

                  <div className="bg-theme-sub p-3 sm:p-4 rounded-xl border">
                    <div className="font-bold text-theme-primary flex flex-col sm:flex-row sm:justify-between">
                      <span>LogiSimulate — Digital Circuit Simulator</span>
                      <span className="text-theme-muted font-mono text-xs">2024 — 2025</span>
                    </div>
                    <div className="text-[10px] font-mono text-indigo-600 dark:text-purple-300 mt-0.5">
                      Python, C, Logisim, Digital Logic
                    </div>
                    <p className="text-xs text-theme-secondary mt-1">
                      Circuit simulator for boolean gate propagation delays, truth table analysis, and automated Karnaugh map minimization.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] sm:text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider mb-1.5">
                  Technical Skills
                </h4>
                <div className="bg-theme-sub p-3 sm:p-4 rounded-xl border space-y-1.5 text-xs">
                  <div><strong className="text-theme-primary">Programming Languages:</strong> JavaScript (ES6+), TypeScript, Python, C, MATLAB, HTML5, CSS3/PostCSS</div>
                  <div><strong className="text-theme-primary">Web &amp; Frameworks:</strong> React 19, Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, Anime.js, Web Audio API</div>
                  <div><strong className="text-theme-primary">AI &amp; Vision:</strong> Google Gemini 2.5 Flash API, Prompt Engineering, MobileNetV2, MediaPipe, LLM Workflows</div>
                  <div><strong className="text-theme-primary">Tools &amp; Platforms:</strong> Git, GitHub, Turbopack, Logisim, Netlify, Vercel, VS Code, Windows/PowerShell</div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mt-5 pt-3 sm:pt-5 border-t border-slate-200 dark:border-white/10">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <a
                  href="/Swapnoneel_Mondal_Resume.pdf"
                  download="Swapnoneel_Mondal_Resume.pdf"
                  onClick={() => playClick()}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white font-semibold text-xs uppercase tracking-wider shadow-lg cursor-pointer active:scale-95 min-h-[40px]"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={handleCopyText}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-theme-sub text-theme-primary font-semibold text-xs uppercase tracking-wider transition-colors border cursor-pointer active:scale-95 min-h-[40px]"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  <span>{copied ? "Copied!" : "Copy Text"}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  playClick();
                  setModalOpen(false);
                }}
                className="px-4 py-2 rounded-full bg-theme-sub text-theme-muted hover:text-theme-primary text-xs font-mono font-semibold transition-colors cursor-pointer text-center min-h-[40px]"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
