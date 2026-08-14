"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

export function FluidGlassCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [ripples, setRipples] = useState<TouchRipple[]>([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth fluid spring physics for liquid glass follower
  const springX = useSpring(mouseX, { stiffness: 350, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 28 });

  // Larger secondary ambient aura
  const auraX = useSpring(mouseX, { stiffness: 140, damping: 24 });
  const auraY = useSpring(mouseY, { stiffness: 140, damping: 24 });

  useEffect(() => {
    // 1. Mouse Events (Desktop)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("cursor-pointer"))
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // 2. Touch Events (Mobile Touchscreen Interaction)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseX.set(touch.clientX);
        mouseY.set(touch.clientY);
        setIsVisible(true);
        setIsTouching(true);

        // Add touch burst ripple
        const newRipple = {
          id: Date.now() + Math.random(),
          x: touch.clientX,
          y: touch.clientY,
        };

        setRipples((prev) => [...prev.slice(-4), newRipple]);

        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 800);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseX.set(touch.clientX);
        mouseY.set(touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        setIsTouching(false);
      }, 300);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Fluid Ambient Neon Glow Follower (Visible on both Desktop and Mobile Touch) */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
          width: isTouching ? 140 : isPointer ? 180 : 120,
          height: isTouching ? 140 : isPointer ? 180 : 120,
          opacity: isTouching ? 0.75 : 0.6,
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)",
          filter: "blur(25px)",
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease",
        }}
      />

      {/* 2. Fluid Glass Lens Orb Cursor (Visible on Desktop & Mobile Touch Drag) */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full flex items-center justify-center border border-white/50 shadow-[0_0_20px_rgba(16,185,129,0.4),inset_0_1px_2px_rgba(255,255,255,0.7)]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: isTouching ? 42 : isPointer ? 44 : 26,
          height: isTouching ? 42 : isPointer ? 44 : 26,
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          background: isTouching || isPointer
            ? "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(16,185,129,0.25) 50%, rgba(99,102,241,0.18))"
            : "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.4), rgba(56,189,248,0.2) 70%, transparent)",
          transition: "width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Core Specular Pin Light */}
        <div
          className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]"
          style={{
            transform: isTouching || isPointer ? "scale(1.6)" : "scale(1)",
            transition: "transform 0.2s ease",
          }}
        />
      </motion.div>

      {/* 3. Mobile Touch Tap Shockwave Burst Rings */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.9, scale: 0.2 }}
            animate={{ opacity: 0, scale: 2.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9997] rounded-full border-2 border-emerald-400/80 shadow-[0_0_20px_#10b981]"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 50,
              height: 50,
              translateX: "-50%",
              translateY: "-50%",
              background: "radial-gradient(circle, rgba(52, 211, 153, 0.25) 0%, transparent 70%)",
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
