"use client";

import { cn } from "@/lib/utils";

interface GridPatternProps {
  className?: string;
  size?: number;
  fade?: boolean;
}

export function GridPattern({ className, size = 32, fade = true }: GridPatternProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Dot grid pattern */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern
            id="grid-pattern"
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r="1"
              className="fill-muted-foreground/20"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Fade overlay */}
      {fade && (
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      )}
    </div>
  );
}
