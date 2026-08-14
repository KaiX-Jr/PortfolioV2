"use client";

import React, { useEffect, useRef } from "react";

interface SilkBackgroundProps {
  color?: string;
  speed?: number;
  scale?: number;
  interactive?: boolean;
  className?: string;
}

export function SilkBackground({
  color = "#10b981", // Emerald green
  speed = 0.001,
  scale = 1.0,
  interactive = true,
  className = "",
}: SilkBackgroundProps) {
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

    // Emerald Green Silk Palette
    const silkRibbons = [
      { color: "rgba(16, 185, 129, 0.28)", width: 3.5, freq: 0.002, amp: 75, phase: 0 },
      { color: "rgba(52, 211, 153, 0.35)", width: 2.5, freq: 0.0025, amp: 65, phase: 1.2 },
      { color: "rgba(5, 150, 105, 0.22)", width: 4.0, freq: 0.0018, amp: 85, phase: 2.4 },
      { color: "rgba(110, 231, 183, 0.4)", width: 1.8, freq: 0.003, amp: 55, phase: 3.6 },
      { color: "rgba(4, 120, 87, 0.18)", width: 5.0, freq: 0.0015, amp: 95, phase: 4.8 },
      { color: "rgba(167, 243, 208, 0.25)", width: 1.5, freq: 0.0035, amp: 45, phase: 6.0 },
    ];

    const draw = () => {
      time += speed;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse camera interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      const ribbonStep = height / (silkRibbons.length + 1);

      silkRibbons.forEach((ribbon, index) => {
        const baseY = ribbonStep * (index + 1);
        ctx.beginPath();

        const segments = 45;
        let first = true;

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments) * width;
          const normalizedX = x / width;

          // Multi-layered fluid silk wave mathematics
          const wave1 = Math.sin(x * ribbon.freq * scale + time * 2.2 + ribbon.phase) * ribbon.amp;
          const wave2 = Math.cos(x * ribbon.freq * 0.7 * scale - time * 1.5 + ribbon.phase * 0.8) * (ribbon.amp * 0.6);
          const wave3 = Math.sin((x + baseY) * 0.001 + time * 3) * (ribbon.amp * 0.3);

          // Mouse cloth ripple interaction
          let mouseDistort = 0;
          if (mouseRef.current.x > 0) {
            const dx = x - mouseRef.current.x;
            const dy = baseY - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 320) {
              const force = (1 - dist / 320);
              mouseDistort = Math.sin((dist / 320) * Math.PI) * force * 70;
            }
          }

          const y = baseY + wave1 + wave2 + wave3 + mouseDistort;

          if (first) {
            ctx.moveTo(x, y);
            first = false;
          } else {
            // Cubic bezier silk smoothing
            ctx.lineTo(x, y);
          }
        }

        // Luminous Green Silk Stroke & Glow
        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = ribbon.width;
        ctx.shadowColor = "#10b981";
        ctx.shadowBlur = 18;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

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
  }, [color, speed, scale, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.65 }}
    />
  );
}
