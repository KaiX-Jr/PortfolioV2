"use client";

import React, { useEffect, useRef } from "react";

interface TopographyBackgroundProps {
  lineColor?: string;
  glowColor?: string;
  contourCount?: number;
  speed?: number;
  interactive?: boolean;
}

export function TopographyBackground({
  lineColor = "rgba(99, 102, 241, 0.08)",
  glowColor = "rgba(168, 85, 247, 0.14)",
  contourCount = 18,
  speed = 0.0005,
  interactive = true,
}: TopographyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    // Optimized harmonic 2D isoline calculation
    const noise2D = (x: number, y: number, t: number) => {
      return (
        Math.sin(x * 0.0025 + t) * Math.cos(y * 0.0025 - t * 0.7) +
        Math.sin((x + y) * 0.0018 + t) * 0.4
      );
    };

    const draw = () => {
      time += speed;
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp for mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      const step = Math.max(20, Math.floor(height / contourCount));
      ctx.lineWidth = 1;

      for (let i = 0; i < height + step; i += step) {
        ctx.beginPath();
        let firstPoint = true;

        for (let x = 0; x <= width + 50; x += 40) {
          const baseNoise = noise2D(x, i, time);

          let mouseInfluence = 0;
          if (mouseRef.current.x > 0) {
            const dx = x - mouseRef.current.x;
            const dy = i - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 280) {
              mouseInfluence = Math.sin((dist / 280) * Math.PI) * 35 * (1 - dist / 280);
            }
          }

          const y = i + baseNoise * 36 - mouseInfluence;

          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }

        const layerRatio = (i / height) % 1;
        ctx.strokeStyle = layerRatio > 0.65 ? glowColor : lineColor;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [lineColor, glowColor, contourCount, speed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  );
}
