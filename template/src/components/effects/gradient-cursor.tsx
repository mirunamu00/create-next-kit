"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientCursorProps {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
}

export function GradientCursor({
  className,
  size = 400,
  color = "rgba(6, 182, 212, 0.15)",
  opacity = 1,
  blur = 80,
}: GradientCursorProps) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className={cn(
        "fixed pointer-events-none z-0 rounded-full",
        className
      )}
      style={{
        width: size,
        height: size,
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}
