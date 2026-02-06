"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SquaresProps {
  direction?: "diagonal" | "up" | "down" | "left" | "right";
  speed?: number;
  squareSize?: number;
  borderColor?: string;
  hoverFillColor?: string;
  lightBorderColor?: string;
  lightHoverFillColor?: string;
  className?: string;
}

export function Squares({
  direction = "diagonal",
  speed = 0.5,
  squareSize = 40,
  borderColor = "rgba(99, 102, 241, 0.3)",
  hoverFillColor = "rgba(99, 102, 241, 0.1)",
  lightBorderColor,
  lightHoverFillColor,
  className,
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSquare, setHoveredSquare] = useState<{ x: number; y: number } | null>(null);
  const [isDark, setIsDark] = useState(true);
  const animationRef = useRef<number>(0);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getDirectionOffset = () => {
      switch (direction) {
        case "up":
          return { x: 0, y: -speed };
        case "down":
          return { x: 0, y: speed };
        case "left":
          return { x: -speed, y: 0 };
        case "right":
          return { x: speed, y: 0 };
        case "diagonal":
        default:
          return { x: speed * 0.7, y: speed * 0.7 };
      }
    };

    const draw = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const dirOffset = getDirectionOffset();
      offsetRef.current.x = (offsetRef.current.x + dirOffset.x) % squareSize;
      offsetRef.current.y = (offsetRef.current.y + dirOffset.y) % squareSize;

      const startX = -squareSize + offsetRef.current.x;
      const startY = -squareSize + offsetRef.current.y;

      const currentBorderColor = isDark ? borderColor : (lightBorderColor || borderColor);
      const currentHoverFillColor = isDark ? hoverFillColor : (lightHoverFillColor || hoverFillColor);

      ctx.strokeStyle = currentBorderColor;
      ctx.lineWidth = 1;

      for (let x = startX; x < width + squareSize; x += squareSize) {
        for (let y = startY; y < height + squareSize; y += squareSize) {
          // 호버된 사각형 채우기
          if (
            hoveredSquare &&
            Math.floor((x - startX) / squareSize) === hoveredSquare.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = currentHoverFillColor;
            ctx.fillRect(x, y, squareSize, squareSize);
          }
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const startX = -squareSize + offsetRef.current.x;
      const startY = -squareSize + offsetRef.current.y;

      const squareX = Math.floor((x - startX) / squareSize);
      const squareY = Math.floor((y - startY) / squareSize);

      setHoveredSquare({ x: squareX, y: squareY });
    };

    const handleMouseLeave = () => {
      setHoveredSquare(null);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [direction, speed, squareSize, borderColor, hoverFillColor, lightBorderColor, lightHoverFillColor, isDark, hoveredSquare]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
