"use client";

import React, { useEffect, useRef } from "react";

interface StrandsProps {
  strandCount?: number;
  colors?: string[];
  speed?: number;
  amplitude?: number;
  className?: string;
}

export function Strands({
  strandCount = 4,
  colors = ["#6366f1", "#a855f7", "#38bdf8", "#818cf8"],
  speed = 0.001,
  amplitude = 45,
  className = "",
}: StrandsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -500, y: -500, targetX: -500, targetY: -500 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 380);
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 380;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -500;
      mouseRef.current.targetY = -500;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const draw = () => {
      time += speed;
      ctx.clearRect(0, 0, width, height);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      for (let s = 0; s < strandCount; s++) {
        const progress = s / strandCount;
        const color = colors[s % colors.length];
        const phase = progress * Math.PI * 2;
        const baseOffsetY = height * 0.5 + (progress - 0.5) * 60;

        ctx.beginPath();
        const segments = 32;

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments) * width;
          const normalizedX = x / width;

          const wave1 = Math.sin(normalizedX * 3.5 + time * 1.8 + phase) * amplitude;
          const wave2 = Math.cos(normalizedX * 2 - time * 1.2 + phase * 0.5) * (amplitude * 0.4);

          let pointerOffset = 0;
          if (mouseRef.current.x > 0) {
            const dx = x - mouseRef.current.x;
            const dist = Math.abs(dx);
            if (dist < 180) {
              const force = 1 - dist / 180;
              pointerOffset = Math.sin((dx / 180) * Math.PI) * force * 40;
            }
          }

          const y = baseOffsetY + wave1 + wave2 + pointerOffset;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [strandCount, colors, speed, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-auto opacity-30 ${className}`}
    />
  );
}
