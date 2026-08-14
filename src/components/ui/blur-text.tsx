"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

export function BlurText({
  text = "",
  delay = 30,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.05,
  rootMargin = "0px",
  onAnimationComplete,
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });

  const defaultFrom =
    direction === "top"
      ? { filter: "blur(8px)", opacity: 0, y: -12 }
      : { filter: "blur(8px)", opacity: 0, y: 12 };

  const defaultTo = { filter: "blur(0px)", opacity: 1, y: 0 };

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {elements.map((element, i) => (
        <motion.span
          key={i}
          initial={defaultFrom}
          animate={inView ? defaultTo : defaultFrom}
          transition={{
            duration: 0.5,
            delay: (i * delay) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={i === elements.length - 1 ? onAnimationComplete : undefined}
          className="inline-block whitespace-pre"
        >
          {element}
          {animateBy === "words" && i < elements.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </p>
  );
}
