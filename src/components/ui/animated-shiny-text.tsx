"use client";

import { CSSProperties, FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
}) => {
  return (
    <span
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "mx-auto max-w-md text-neutral-400 font-medium transition-all duration-300 ease-in-out",
        // Shimmer effect
        "animate-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#a6e6ff,45%,#ffffff,55%,#a6e6ff)] bg-[length:200%_100%]",
        className
      )}
    >
      {children}
    </span>
  );
};
