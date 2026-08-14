"use client";

import { Briefcase, Calendar, GraduationCap, MapPin, Code2, Database } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { GradientText } from "@/components/ui/gradient-text";
import { BlurText } from "@/components/ui/blur-text";
import { ShinyText } from "@/components/ui/shiny-text";
import { useSound } from "@/components/SoundProvider";

export default function Experience() {
  const { playTap } = useSound();
  const experiences = [
    {
      role: "Frontend Developer & Web Engineer",
      company: "Independent Web Projects",
      period: "2024 — Present",
      location: "West Bengal, India",
      description: [
        "Architected, built, and shipped responsive web applications including Dynovision, utilizing React 19, JavaScript, and custom component systems.",
        "Engineered smooth UI interactions and animation choreography with Tailwind CSS, Framer Motion, and Anime.js.",
        "Deployed and maintained continuous production deployments on Netlify with optimized asset delivery and clean SEO practices.",
      ],
      technologies: ["React 19", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "Netlify"],
    },
    {
      role: "Digital Systems & Simulator Developer",
      company: "Academic & Systems Tooling",
      period: "2024 — Present",
      location: "Kolkata, West Bengal",
      description: [
        "Engineered LogiSimulate — an interactive digital circuit and boolean logic simulation environment in Python and C.",
        "Implemented boolean truth-table evaluators, logic gate combinational network parsers, and schematic layout modules.",
        "Tested digital logic behaviors, timing propagation delays, and gate level transformations using Logisim and C.",
      ],
      technologies: ["Python", "C", "Logisim", "Boolean Algebra", "Digital Logic", "System Tooling"],
    },
    {
      role: "Data Analytics & Predictive Modeling Explorer",
      company: "Independent Computational Research",
      period: "2024 — Present",
      location: "West Bengal, India",
      description: [
        "Developed DataPredict ML for exploratory data analysis, dataset transformations, and numerical regression models.",
        "Utilized Python, NumPy, and MATLAB for matrix computations, eigenvalue analysis, and statistical data visualization.",
        "Evaluated machine learning performance metrics and loss functions across multiple benchmark datasets.",
      ],
      technologies: ["Python", "MATLAB", "NumPy", "Data Analytics", "Statistical Modeling", "Matplotlib"],
    },
    {
      role: "Computer Science & Engineering Scholar",
      company: "Institute of Engineering & Management (IEM)",
      period: "2024 — Present",
      location: "Kolkata, West Bengal",
      description: [
        "Pursuing Bachelor of Technology in Computer Science & Engineering with coursework in Data Structures, Algorithms, and Discrete Math.",
        "Building core competencies in low-level memory management with C, Object-Oriented software paradigms, and computational problem solving.",
        "Active participant in collegiate coding hackathons and technical developer communities.",
      ],
      technologies: ["Data Structures", "Algorithms", "C Programming", "Discrete Mathematics", "Git & GitHub"],
    },
  ];

  return (
    <section className="py-8 sm:py-14 md:py-16 relative scroll-mt-24 sm:scroll-mt-36" id="experience">
      {/* Ambient Glow */}
      <div className="ambient-glow bg-[#10b981] w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] top-1/3 left-0 opacity-15" />

      {/* Header */}
      <div className="anime-section-title flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-3 sm:gap-4">
        <div>
          <div className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
            <Briefcase size={14} />
            <ShinyText speed={4} className="text-emerald-600 dark:text-emerald-400 font-mono">
              Background &amp; History
            </ShinyText>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-theme-primary tracking-tight">
            Work Experience &amp;{" "}
            <GradientText
              colors={["#059669", "#10b981", "#4f46e5", "#7c3aed", "#059669"]}
              animationSpeed={6}
              className="italic font-normal"
            >
              Timeline
            </GradientText>
          </h2>
        </div>
        <BlurText
          text="A track record of engineering interactive systems, rigorous computer science studies, and scalable web solutions."
          delay={15}
          animateBy="words"
          className="text-xs sm:text-sm text-theme-secondary max-w-md leading-relaxed"
        />
      </div>

      {/* Timeline with Liquid Glass Nodes */}
      <div className="anime-timeline-container relative max-w-4xl mx-auto">
        {/* Glowing Central Ambient Spine */}
        <div className="absolute left-3.5 sm:left-6 md:left-8 top-3 bottom-3 w-[2px] bg-gradient-to-b from-emerald-500/60 via-teal-500/40 to-transparent" />

        <div className="space-y-4 sm:space-y-10">
          {experiences.map((exp, index) => (
            <div key={index} className="anime-timeline-item relative flex items-start gap-2.5 sm:gap-6 md:gap-10">
              {/* Luminous Node Sphere */}
              <div className="relative z-10 flex items-center justify-center w-7 h-7 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-theme-card border shadow-md shrink-0 mt-3 sm:mt-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-[0_0_10px_#10b981]" />
              </div>

              {/* Liquid Glass Timeline Card */}
              <LiquidGlassCard
                glowColor="#10b981"
                refractionColor="#6366f1"
                onMouseEnter={() => playTap()}
                className="flex-grow p-3.5 sm:p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 sm:gap-2 mb-3 sm:mb-4 border-b border-slate-200 dark:border-white/[0.08] pb-3 sm:pb-4">
                  <div>
                    <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-theme-primary flex items-center gap-1.5">
                      {exp.role}
                    </h3>
                    <div className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-300 font-semibold mt-0.5">{exp.company}</div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between text-[10px] sm:text-xs font-mono text-theme-muted gap-1 pt-1 md:pt-0">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-emerald-500 dark:text-emerald-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-teal-500 dark:text-cyan-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-6">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-theme-secondary flex items-start gap-2 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-[0_0_6px_#10b981]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-theme-sub text-theme-primary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono border transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </LiquidGlassCard>
            </div>
          ))}
        </div>
      </div>

      {/* Academic & Engineering Foundation Summary Cards */}
      <div className="mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
        <LiquidGlassCard
          glowColor="#38bdf8"
          refractionColor="#10b981"
          className="anime-card p-4 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="p-2 sm:p-3 rounded-2xl bg-teal-500/15 dark:bg-cyan-500/20 text-teal-600 dark:text-cyan-300 border border-teal-500/30 shadow-sm w-fit mb-2.5 sm:mb-4">
              <GraduationCap size={18} />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-theme-primary">
              Academic Rigor
            </h4>
            <div className="text-[11px] sm:text-xs font-mono text-teal-600 dark:text-cyan-300 mt-0.5 mb-1.5">IEM Kolkata • B.Tech CSE</div>
            <p className="text-xs text-theme-secondary leading-relaxed">
              Studying computational complexity, system architecture, data structures, algorithms, and applied mathematics.
            </p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard
          glowColor="#10b981"
          refractionColor="#6366f1"
          className="anime-card p-4 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="p-2 sm:p-3 rounded-2xl bg-emerald-500/15 dark:bg-indigo-500/20 text-emerald-600 dark:text-indigo-300 border border-emerald-500/30 shadow-sm w-fit mb-2.5 sm:mb-4">
              <Code2 size={18} />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-theme-primary">
              Interactive Web Systems
            </h4>
            <div className="text-[11px] sm:text-xs font-mono text-emerald-600 dark:text-indigo-300 mt-0.5 mb-1.5">React 19 &amp; Next.js 16</div>
            <p className="text-xs text-theme-secondary leading-relaxed">
              Engineering bespoke glassmorphism aesthetics, fluid spring animations, and high-velocity web applications.
            </p>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard
          glowColor="#6366f1"
          refractionColor="#38bdf8"
          className="anime-card p-4 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="p-2 sm:p-3 rounded-2xl bg-indigo-500/15 dark:bg-purple-500/20 text-indigo-600 dark:text-purple-300 border border-indigo-500/30 shadow-sm w-fit mb-2.5 sm:mb-4">
              <Database size={18} />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-theme-primary">
              Data &amp; Simulations
            </h4>
            <div className="text-[11px] sm:text-xs font-mono text-indigo-600 dark:text-purple-300 mt-0.5 mb-1.5">Python, MATLAB &amp; Logic</div>
            <p className="text-xs text-theme-secondary leading-relaxed">
              Developing digital logic gate simulators and data analytics models for structured computation.
            </p>
          </div>
        </LiquidGlassCard>
      </div>
    </section>
  );
}
