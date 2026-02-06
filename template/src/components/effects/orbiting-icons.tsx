"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface OrbitItem {
  icon: LucideIcon;
  label: string;
  color: string;
  bgColor: string;
}

interface OrbitingIconsProps {
  items: OrbitItem[];
  className?: string;
  centerContent?: React.ReactNode;
  size?: number;
  orbitRadius?: number;
  duration?: number;
}

export function OrbitingIcons({
  items,
  className,
  centerContent,
  size = 300,
  orbitRadius = 120,
  duration = 20,
}: OrbitingIconsProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredIndex(null);
      }}
    >
      {/* Center content */}
      <div className="absolute z-10 flex flex-col items-center justify-center">
        {centerContent}
      </div>

      {/* Orbit path */}
      <div
        className="absolute rounded-full border border-border/30"
        style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
      />

      {/* Orbiting items */}
      {items.map((item, index) => {
        const Icon = item.icon;
        const angle = (360 / items.length) * index;
        const isHovered = hoveredIndex === index;
        // Negative delay to start at the correct position in the animation cycle
        const animationDelay = -(angle / 360) * duration;

        return (
          <div
            key={item.label}
            className="absolute pointer-events-none"
            style={{
              zIndex: isHovered ? 50 : 1,
              width: orbitRadius * 2,
              height: orbitRadius * 2,
              animation: isPaused ? "none" : `orbit ${duration}s linear infinite`,
              animationDelay: `${animationDelay}s`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            <div
              className="absolute cursor-pointer pointer-events-auto"
              style={{
                left: "50%",
                top: 0,
                transformOrigin: "center center",
                animation: isPaused ? "none" : `counter-orbit ${duration}s linear infinite`,
                animationDelay: `${animationDelay}s`,
                animationPlayState: isPaused ? "paused" : "running",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                animate={{ scale: isHovered ? 1.3 : 1 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "p-3 rounded-xl shadow-lg transition-shadow duration-200 -translate-x-1/2",
                  item.bgColor,
                  isHovered && "shadow-xl ring-2 ring-primary/50"
                )}
              >
                <Icon className={cn("h-6 w-6", item.color)} />
              </motion.div>

              {/* Label on hover */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 5,
                }}
                className="absolute top-full left-0 -translate-x-1/2 mt-2 whitespace-nowrap"
              >
                <span className="px-2 py-1 text-xs font-medium rounded-md bg-popover border shadow-sm">
                  {item.label}
                </span>
              </motion.div>
            </div>
          </div>
        );
      })}

      {/* Glow effect in center */}
      <div
        className="absolute rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl"
        style={{ width: orbitRadius, height: orbitRadius }}
      />

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes counter-orbit {
          from {
            transform: translateX(-50%) rotate(0deg);
          }
          to {
            transform: translateX(-50%) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
