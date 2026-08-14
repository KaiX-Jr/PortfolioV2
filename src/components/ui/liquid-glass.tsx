"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiquidGlassProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
  refractionColor?: string;
}

export function LiquidGlassCard({
  children,
  className,
  glowColor = "#10b981",
  refractionColor = "#38bdf8",
  ...props
}: LiquidGlassProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  const springX = useSpring(mouseX, { stiffness: 180, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-400);
    mouseY.set(-400);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl",
        "bg-theme-card backdrop-blur-2xl border",
        "shadow-[0_12px_35px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]",
        "transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {/* Top Specular Glare Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/40 to-transparent z-20" />

      {/* Dynamic Fluid Liquid Light Refraction Mesh */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              420px circle at ${springX}px ${springY}px,
              ${glowColor}25 0%,
              ${refractionColor}12 40%,
              transparent 75%
            )
          `,
        }}
      />

      {/* Fluid Specular Rim Light */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              260px circle at ${springX}px ${springY}px,
              rgba(255, 255, 255, 0.6) 0%,
              ${refractionColor}55 30%,
              ${glowColor}33 60%,
              transparent 80%
            )
          `,
          maskImage: "linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black)",
        }}
      />

      {/* Glass Inner Layer */}
      <div className="relative z-30 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
