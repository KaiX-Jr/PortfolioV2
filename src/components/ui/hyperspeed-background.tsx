"use client";

import React, { useEffect, useRef } from "react";

interface HyperspeedProps {
  speed?: number;
  streakCount?: number;
  colors?: string[];
  className?: string;
}

export function HyperspeedBackground({
  speed = 1.2,
  streakCount = 120,
  colors = ["#6366f1", "#a855f7", "#38bdf8", "#818cf8", "#c084fc"],
  className = "",
}: HyperspeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.2;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.2;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Initialize 3D Starburst / Hyperspeed Streaks
    interface Star {
      x: number;
      y: number;
      z: number;
      prevZ: number;
      color: string;
      length: number;
      width: number;
    }

    const stars: Star[] = [];
    for (let i = 0; i < streakCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        prevZ: width,
        color: colors[Math.floor(Math.random() * colors.length)],
        length: Math.random() * 25 + 15,
        width: Math.random() * 2 + 0.8,
      });
    }

    const draw = () => {
      // Clear with dark space backdrop
      ctx.fillStyle = "rgba(8, 8, 12, 0.4)";
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse camera tilt
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const cx = width / 2 + mouseRef.current.x;
      const cy = height / 2 + mouseRef.current.y;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.prevZ = star.z;
        star.z -= speed * 14;

        // Reset star when it flies past camera
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          star.z = width;
          star.prevZ = width;
        }

        // Perspective 3D projection
        const k = 280 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const prevK = 280 / star.prevZ;
        const prevPx = star.x * prevK + cx;
        const prevPy = star.y * prevK + cy;

        // Draw light speed streak
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, (1 - star.z / width) * 1.5);
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);

          ctx.strokeStyle = star.color;
          ctx.globalAlpha = alpha * 0.85;
          ctx.lineWidth = star.width * k * 0.7;
          ctx.shadowColor = star.color;
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, streakCount, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.75 }}
    />
  );
}
