"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface TechItem {
  icon: LucideIcon;
  label: string;
  color: string;
  bgColor: string;
}

interface TechMarqueeProps {
  items: TechItem[];
  direction?: "left" | "right";
  speed?: number;
  tilt?: number;
  className?: string;
}

export function TechMarquee({
  items,
  direction = "left",
  speed = 30,
  tilt = 0,
  className,
}: TechMarqueeProps) {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden py-4",
        className
      )}
      style={{
        transform: tilt !== 0 ? `rotate(${tilt}deg)` : undefined,
        marginLeft: tilt !== 0 ? "-2%" : undefined,
        marginRight: tilt !== 0 ? "-2%" : undefined,
        width: tilt !== 0 ? "104%" : undefined,
      }}
    >
      {/* Background stripe */}
      <div className="absolute inset-0 bg-gradient-to-r from-muted/80 via-muted to-muted/80" />

      {/* Scrolling content */}
      <div
        className={cn(
          "flex w-max",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
        )}
        style={{
          ["--marquee-duration" as string]: `${speed}s`,
        }}
      >
        {duplicatedItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.label}-${index}`}
              className={cn(
                "group flex items-center gap-2 px-5 py-2.5 mx-2 rounded-full",
                "bg-background/90 backdrop-blur-sm border shadow-sm",
                "hover:scale-105 hover:shadow-md hover:border-primary/30",
                "transition-all duration-200 cursor-default"
              )}
            >
              <Icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", item.color)} />
              <span className="font-medium text-sm whitespace-nowrap">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Edge fade effects */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}
