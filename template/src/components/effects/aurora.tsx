"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface AuroraProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

export function Aurora({ className, children, intensity = "medium" }: AuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      const x1 = 50 + 30 * Math.sin(time * 0.7);
      const y1 = 50 + 20 * Math.cos(time * 0.8);
      const x2 = 50 + 25 * Math.cos(time * 0.6);
      const y2 = 50 + 25 * Math.sin(time * 0.9);

      container.style.setProperty("--aurora-x1", `${x1}%`);
      container.style.setProperty("--aurora-y1", `${y1}%`);
      container.style.setProperty("--aurora-x2", `${x2}%`);
      container.style.setProperty("--aurora-y2", `${y2}%`);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  const opacityMap = {
    subtle: "opacity-20",
    medium: "opacity-40",
    strong: "opacity-60",
  };

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          opacityMap[intensity]
        )}
        style={{
          background: `
            radial-gradient(
              circle at var(--aurora-x1, 30%) var(--aurora-y1, 30%),
              hsl(var(--primary) / 0.5) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at var(--aurora-x2, 70%) var(--aurora-y2, 70%),
              hsl(var(--accent) / 0.4) 0%,
              transparent 50%
            )
          `,
          filter: "blur(40px)",
          transition: "all 0.1s ease-out",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
