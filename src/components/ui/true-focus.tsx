"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  borderColor?: string;
  glowColor?: string;
  blurAmount?: number;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

export function TrueFocus({
  sentence = "Digital Architect Creative Technologist",
  separator = " ",
  borderColor = "#6366f1",
  glowColor = "rgba(99, 102, 241, 0.35)",
  blurAmount = 0,
  animationDuration = 0.45,
  pauseBetweenAnimations = 1.6,
  className = "",
}: TrueFocusProps) {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0, ready: false });

  const updateFocusRect = useCallback((index: number) => {
    if (!containerRef.current || !wordRefs.current[index]) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[index]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left - 6,
      y: activeRect.top - parentRect.top - 4,
      width: activeRect.width + 12,
      height: activeRect.height + 8,
      ready: true,
    });
  }, []);

  useEffect(() => {
    updateFocusRect(currentIndex);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % words.length;
        updateFocusRect(next);
        return next;
      });
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    const handleResize = () => updateFocusRect(currentIndex);
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentIndex, animationDuration, pauseBetweenAnimations, words.length, updateFocusRect]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            onClick={() => {
              setCurrentIndex(index);
              updateFocusRect(index);
            }}
            className="relative cursor-pointer transition-all duration-300 select-none"
            style={{
              opacity: isActive ? 1 : 0.65,
              transform: isActive ? "scale(1.02)" : "scale(1)",
            }}
          >
            {word}
          </span>
        );
      })}

      {/* Smooth Liquid Glass Focus Box */}
      {focusRect.ready && (
        <motion.div
          className="pointer-events-none absolute rounded-xl border border-indigo-400 z-10"
          animate={{
            x: focusRect.x,
            y: focusRect.y,
            width: focusRect.width,
            height: focusRect.height,
          }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 24,
          }}
          style={{
            borderColor: borderColor,
            boxShadow: `0 0 20px ${glowColor}, inset 0 0 10px ${glowColor}`,
          }}
        >
          {/* Subtle Corner Accents */}
          <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-white rounded-tl-sm" />
          <span className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-white rounded-tr-sm" />
          <span className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-white rounded-bl-sm" />
          <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-white rounded-br-sm" />
        </motion.div>
      )}
    </div>
  );
}
