"use client";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "hsl(var(--primary) / 0.15)",
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/5",
        "hover:border-primary/20",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(
            400px circle at ${position.x}px ${position.y}px,
            ${spotlightColor},
            transparent 60%
          )`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
