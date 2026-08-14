"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Layers, X, Eye, Code2, Globe } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { KokonutBentoGrid } from "@/components/ui/kokonut-spotlight-card";
import { GradientText } from "@/components/ui/gradient-text";
import { BlurText } from "@/components/ui/blur-text";
import { ShinyText } from "@/components/ui/shiny-text";
import { useSound } from "@/components/SoundProvider";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  colSpan: string;
  accent: string;
  refraction: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { playClick, playTap } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const projects: Project[] = [
    {
      id: "dynovision",
      title: "Dynovision",
      category: "Vision & Gesture Interface",
      description:
        "Object, body, and hand vision platform engineered for real-time computer vision detection, affective emotion parsing, and gesture control.",
      details:
        "Built with React 19, computer vision pipelines (MobileNetV2), interactive HUD dashboards, and audio soundscape modulations.",
      tags: ["Computer Vision", "React", "MobileNetV2", "Gesture AI"],
      image: "/images/dynovision.png",
      liveUrl: "https://dynovision.netlify.app/",
      githubUrl: "https://github.com/KaiX-Jr",
      colSpan: "md:col-span-8",
      accent: "#10b981",
      refraction: "#6366f1",
    },
    {
      id: "logisimulate",
      title: "LogiSimulate",
      category: "Digital Logic Simulation Tooling",
      description:
        "Digital logic gate simulator for designing, testing, and visualizing boolean expressions, timing waveforms, and circuit networks.",
      details:
        "Developed to demonstrate digital circuit design principles, truth tables, and logic gate propagation delays using Logisim, C, and Python.",
      tags: ["Python", "C", "Logisim", "Digital Circuits"],
      image: "/images/logisimulate.jpg",
      liveUrl: "",
      githubUrl: "",
      colSpan: "md:col-span-4",
      accent: "#38bdf8",
      refraction: "#10b981",
    },
    {
      id: "datapredict-ml",
      title: "DataPredict ML",
      category: "Machine Learning & Analytics",
      description:
        "Computational data-driven tool for exploratory data analysis, numerical matrix operations, and predictive statistical modeling.",
      details:
        "Leverages Python, NumPy, and MATLAB for numerical matrix computations, eigenvalue transformations, dataset normalization, and predictive model accuracy evaluation.",
      tags: ["Python", "MATLAB", "NumPy", "Data Analytics"],
      image: "/images/datapredict-ml.jpg",
      liveUrl: "",
      githubUrl: "",
      colSpan: "md:col-span-6",
      accent: "#6366f1",
      refraction: "#38bdf8",
    },
    {
      id: "circuit-synthesizer",
      title: "Boolean Circuit Optimizer",
      category: "Computer Science Systems",
      description:
        "Algorithmic boolean expression minimizer and logic gate schematic mapper for computational complexity analysis.",
      details:
        "Implements Karnaugh map simplification algorithms and Quine-McCluskey minimization in C and Python to optimize boolean logic gates for reduced propagation delay.",
      tags: ["C", "Algorithms", "Boolean Logic", "Data Structures"],
      image: "/images/logisimulate.jpg",
      liveUrl: "",
      githubUrl: "",
      colSpan: "md:col-span-6",
      accent: "#10b981",
      refraction: "#6366f1",
    },
  ];

  return (
    <section className="py-8 sm:py-14 md:py-16 relative scroll-mt-24 sm:scroll-mt-36" id="projects">
      {/* Header */}
      <div className="anime-section-title flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12 gap-3 sm:gap-4">
        <div>
          <div className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
            <Layers size={14} />
            <ShinyText speed={4} className="text-emerald-600 dark:text-emerald-400 font-mono">
              Selected Portfolio
            </ShinyText>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-theme-primary tracking-tight">
            My{" "}
            <GradientText
              colors={["#059669", "#10b981", "#4f46e5", "#7c3aed", "#059669"]}
              animationSpeed={5}
              className="italic font-normal"
            >
              Works
            </GradientText>
          </h2>
        </div>
        <BlurText
          text="A curated showcase of interactive digital simulators, analytical machine learning models, and modern full-stack web applications."
          delay={15}
          animateBy="words"
          className="text-xs sm:text-sm text-theme-secondary max-w-md leading-relaxed"
        />
      </div>

      {/* Complete Bento Grid Showcase */}
      <KokonutBentoGrid className="anime-grid-container gap-4 sm:gap-6">
        {projects.map((project) => (
          <LiquidGlassCard
            key={project.id}
            glowColor={project.accent}
            refractionColor={project.refraction}
            onClick={() => {
              playClick();
              setSelectedProject(project);
            }}
            onMouseEnter={() => playTap()}
            className={`anime-card ${project.colSpan} cursor-pointer flex flex-col justify-between`}
          >
            {/* Clean Image Preview Container */}
            <div className="h-44 sm:h-56 md:h-64 relative overflow-hidden bg-slate-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent dark:from-[#08080c] dark:via-[#08080c]/40 dark:to-transparent" />

              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-theme-sub backdrop-blur-md p-2 rounded-full border opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Eye size={15} className="text-emerald-500 dark:text-cyan-300" />
              </div>

              <div className="absolute bottom-3 sm:bottom-4 left-3.5 sm:left-5 right-3.5 sm:right-5 text-white">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-500/80 text-white dark:bg-emerald-500/30 dark:text-emerald-200 border border-white/20 dark:border-emerald-500/40 inline-block mb-1 backdrop-blur-md">
                  {project.category}
                </span>
                <h3 className="text-base sm:text-2xl font-bold text-white group-hover:text-emerald-200 transition-colors flex items-center gap-1.5">
                  <span>{project.title}</span>
                  {project.liveUrl && <ExternalLink size={14} className="text-emerald-300 shrink-0" />}
                </h3>
              </div>
            </div>

            {/* Description & Tags */}
            <div className="p-3.5 sm:p-6 md:p-8 flex flex-col justify-between flex-grow">
              <p className="text-xs sm:text-sm text-theme-secondary mb-3 sm:mb-6 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-theme-sub text-theme-primary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </LiquidGlassCard>
        ))}
      </KokonutBentoGrid>

      {/* Project Detail Modal with z-[100] & Touch Close */}
      {selectedProject && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              playClick();
              setSelectedProject(null);
            }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl max-h-[88vh] my-auto overflow-y-auto bg-white dark:bg-[#08080c] border border-slate-200 dark:border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
            <div className="sticky top-0 right-0 flex justify-end z-30 mb-2">
              <button
                onClick={() => {
                  playClick();
                  setSelectedProject(null);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200 dark:bg-white/[0.12] hover:bg-rose-500 hover:text-white text-slate-800 dark:text-white font-mono text-xs font-bold border border-slate-300 dark:border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl min-h-[36px]"
              >
                <X size={14} />
                <span>CLOSE</span>
              </button>
            </div>

            <span className="text-[10px] sm:text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-bold">
              {selectedProject.category}
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-theme-primary mt-1 mb-2 sm:mb-3">{selectedProject.title}</h3>

            <p className="text-xs sm:text-sm text-theme-secondary mb-4 sm:mb-6 leading-relaxed">
              {selectedProject.details}
            </p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-200 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono border border-emerald-500/30"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-slate-200 dark:border-white/10">
              {selectedProject.liveUrl ? (
                <>
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playClick()}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white font-semibold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-lg min-h-[44px]"
                  >
                    <Globe size={15} />
                    <span>View Live Demo</span>
                  </a>
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playClick()}
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-full bg-theme-sub text-theme-primary font-semibold text-xs uppercase tracking-wider transition-colors border active:scale-95 min-h-[44px]"
                    >
                      <Code2 size={15} />
                      <span>GitHub Code</span>
                    </a>
                  )}
                </>
              ) : (
                <div className="text-xs font-mono text-theme-muted py-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/60 shadow-[0_0_6px_#10b981]" />
                  <span>Academic Architecture &amp; System Simulation Prototype</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
