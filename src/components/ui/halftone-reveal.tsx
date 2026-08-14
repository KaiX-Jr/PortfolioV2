"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface HalftoneRevealProps {
  children?: React.ReactNode;
  imageSrc?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  dotSize?: number;
}

export function HalftoneReveal({
  children,
  imageSrc,
  title,
  subtitle,
  className = "",
  dotSize = 14,
}: HalftoneRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(-300);
    mouseY.set(-300);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("group relative overflow-hidden rounded-3xl bg-[#181717] border border-white/10", className)}
    >
      {/* Background Image / Content */}
      {imageSrc ? (
        <div className="relative w-full h-64 md:h-72 overflow-hidden">
          <img
            src={imageSrc}
            alt={title || "Halftone image"}
            className="w-full h-full object-cover object-top opacity-70 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-80" />
        </div>
      ) : (
        children
      )}

      {/* SVG Halftone Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-40 group-hover:opacity-10 transition-opacity duration-500">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="halftone-pattern"
              x="0"
              y="0"
              width={dotSize}
              height={dotSize}
              patternUnits="userSpaceOnUse"
            >
              <circle cx={dotSize / 2} cy={dotSize / 2} r={dotSize / 4} fill="rgba(255, 255, 255, 0.3)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#halftone-pattern)" />
        </svg>
      </div>

      {/* Dynamic Mouse Spotlight Halftone Reveal Mask */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              220px circle at ${mouseX}px ${mouseY}px,
              rgba(88, 44, 255, 0.35) 0%,
              rgba(166, 230, 255, 0.15) 50%,
              transparent 80%
            )
          `,
        }}
      />

      {/* Text / Content Overlay */}
      {(title || subtitle) && (
        <div className="relative z-30 p-6 flex flex-col justify-end">
          {subtitle && (
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#a6e6ff] mb-1">
              {subtitle}
            </span>
          )}
          {title && <h4 className="text-xl font-bold text-white group-hover:text-[#c8bfff] transition-colors">{title}</h4>}
        </div>
      )}
    </div>
  );
}
