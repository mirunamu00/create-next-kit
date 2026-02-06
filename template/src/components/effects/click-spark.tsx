"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ClickSparkProps {
  children: React.ReactNode;
  className?: string;
  sparkColor?: string;
  sparkCount?: number;
}

export function ClickSpark({
  children,
  className,
  sparkColor = "hsl(var(--primary))",
  sparkCount = 8,
}: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const createSpark = useCallback(
    (x: number, y: number) => {
      if (!containerRef.current) return;

      const container = containerRef.current;

      for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement("div");
        const angle = (i / sparkCount) * 2 * Math.PI;
        const velocity = 50 + Math.random() * 50;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;

        spark.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: ${sparkColor};
          left: ${x}px;
          top: ${y}px;
          pointer-events: none;
          z-index: 100;
          animation: spark-fly 0.6s ease-out forwards;
          --dx: ${dx}px;
          --dy: ${dy}px;
        `;

        container.appendChild(spark);

        setTimeout(() => {
          spark.remove();
        }, 600);
      }
    },
    [sparkColor, sparkCount]
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    createSpark(x, y);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes spark-fly {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--dx), var(--dy)) scale(0);
            opacity: 0;
          }
        }
      `}</style>
      <div
        ref={containerRef}
        onClick={handleClick}
        className={cn("relative w-fit", className)}
      >
        {children}
      </div>
    </>
  );
}
