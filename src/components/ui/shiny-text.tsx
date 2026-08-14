"use client";

import React from "react";

interface ShinyTextProps {
  children: React.ReactNode;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shimmerWidth?: number;
}

export function ShinyText({
  children,
  disabled = false,
  speed = 4,
  className = "",
  shimmerWidth = 100,
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block relative overflow-hidden bg-clip-text text-transparent ${
        disabled
          ? "text-slate-300"
          : "bg-gradient-to-r from-slate-200 via-white to-slate-200"
      } ${className}`}
      style={{
        backgroundImage: disabled
          ? undefined
          : "linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 70%)",
        backgroundSize: `${shimmerWidth * 2}% 100%`,
        animation: disabled ? "none" : `shinyShimmer ${speed}s infinite linear`,
      }}
    >
      <span className="text-inherit font-inherit">{children}</span>
      <style jsx>{`
        @keyframes shinyShimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </span>
  );
}
