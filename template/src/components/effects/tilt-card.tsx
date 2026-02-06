"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  glareOpacity?: number;
  glareColor?: string;
}

export function TiltCard({
  children,
  className,
  maxTilt = 10,
  scale = 1.02,
  glare = false,
  glareOpacity = 0.15,
  glareColor = "hsl(var(--primary))",
}: TiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);
  const scaleValue = useSpring(1, springConfig);

  // Edge glow position
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `linear-gradient(
        ${135 + (Number(gx) - 50) * 0.5}deg,
        transparent 0%,
        ${glareColor} ${40 + (Number(gy) - 50) * 0.2}%,
        transparent 60%
      )`,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = (e.clientX - centerX) / rect.width;
    const mouseY = (e.clientY - centerY) / rect.height;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    scaleValue.set(scale);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scaleValue.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale: scaleValue,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={cn("relative", className)}
    >
      {children}

      {/* Subtle edge shine effect - follows mouse along edges */}
      {glare && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
          style={{
            background: glareBackground,
            opacity: glareOpacity,
            mixBlendMode: "overlay",
          }}
        />
      )}
    </motion.div>
  );
}
