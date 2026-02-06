"use client";

import { cn } from "@/lib/utils";

interface GradientBlurProps {
  className?: string;
}

export function GradientBlur({ className }: GradientBlurProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Main gradient blob - top left */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* Secondary blob - top right */}
      <div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* Accent blob - center */}
      <div
        className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}
