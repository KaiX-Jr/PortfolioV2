"use client";

import { useEffect, useState } from "react";
import { animate, stagger } from "animejs";

export default function AnimeScrollProvider({ children }: { children: React.ReactNode }) {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    // 1. Initial Page Entrance Animations with Anime.js v4
    animate(".anime-hero-badge", {
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 700,
      ease: "outQuad",
    });

    animate(".anime-hero-title", {
      translateY: [25, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 150,
      ease: "outQuad",
    });

    animate(".anime-hero-sub", {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 300,
      ease: "outQuad",
    });

    // 2. Intersection Observer for Scroll-Triggered Stagger Animations
    const observerOptions = {
      root: null,
      rootMargin: "50px 0px 50px 0px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;

          // Section Titles
          if (target.classList.contains("anime-section-title")) {
            animate(target, {
              translateY: [25, 0],
              opacity: [0, 1],
              duration: 700,
              ease: "outCubic",
            });
          }

          // Standalone or Grid Cards
          if (target.classList.contains("anime-card")) {
            animate(target, {
              translateY: [25, 0],
              opacity: [0, 1],
              duration: 700,
              ease: "outCubic",
            });
          }

          // Bento & Project Grid Cards Stagger
          if (target.classList.contains("anime-grid-container")) {
            const cards = target.querySelectorAll(".anime-card");
            if (cards.length > 0) {
              animate(cards, {
                translateY: [25, 0],
                opacity: [0, 1],
                delay: stagger(90),
                duration: 700,
                ease: "outCubic",
              });
            }
          }

          // Timeline Entries Stagger
          if (target.classList.contains("anime-timeline-container")) {
            const items = target.querySelectorAll(".anime-timeline-item");
            if (items.length > 0) {
              animate(items, {
                translateY: [25, 0],
                opacity: [0, 1],
                delay: stagger(100),
                duration: 750,
                ease: "outCubic",
              });
            }
          }

          observer.unobserve(target);
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll(".anime-section-title, .anime-grid-container, .anime-timeline-container, .anime-card, .anime-timeline-item").forEach((el) => {
      observer.observe(el);
    });

    // 3. Scroll Progress Tracer
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollPercent(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Anime.js Signature Scroll Indicator (Right Side Glass Capsule) */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 h-44 w-1.5 bg-white/[0.08] rounded-full z-50 hidden lg:block overflow-hidden backdrop-blur-xl border border-white/[0.1] shadow-[0_0_15px_rgba(0,0,0,0.5)] pointer-events-none">
        <div
          className="w-full bg-gradient-to-b from-emerald-400 via-teal-400 to-indigo-500 rounded-full transition-all duration-150 shadow-[0_0_12px_#10b981]"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>

      {children}
    </>
  );
}
