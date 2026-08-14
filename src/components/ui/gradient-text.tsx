"use client";

import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export function GradientText({
  children,
  className = "",
  colors = ["#10b981", "#34d399", "#6366f1", "#10b981"],
  animationSpeed = 6,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    animation: `gradientMove ${animationSpeed}s linear infinite`,
  };

  return (
    <span
      className={`relative inline-flex items-center ${
        showBorder ? "px-3 py-1 rounded-full border border-white/15" : ""
      } ${className}`}
    >
      {/* Added pr-2.5 and py-0.5 to prevent italic glyph right-edge clipping */}
      <span
        style={gradientStyle}
        className="bg-clip-text text-transparent inline-block font-inherit transition-all pr-2.5 py-0.5"
      >
        {children}
      </span>
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </span>
  );
}
