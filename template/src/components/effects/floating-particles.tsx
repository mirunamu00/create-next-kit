"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  shape: "circle" | "square" | "triangle";
}

interface FloatingParticlesProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  mouseInteraction?: boolean;
  speed?: number;
}

const COLORS = [
  "rgba(6, 182, 212, 0.6)",   // cyan
  "rgba(139, 92, 246, 0.6)",  // violet
  "rgba(236, 72, 153, 0.6)",  // pink
  "rgba(34, 197, 94, 0.6)",   // green
  "rgba(249, 115, 22, 0.6)",  // orange
];

export function FloatingParticles({
  className,
  particleCount = 30,
  colors = COLORS,
  mouseInteraction = true,
  speed = 1,
}: FloatingParticlesProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const particlesRef = React.useRef<Particle[]>([]);
  const mouseRef = React.useRef({ x: 0, y: 0 });
  const animationRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    const createParticle = (id: number): Particle => {
      const shapes: Particle["shape"][] = ["circle", "square", "triangle"];
      return {
        id,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 2,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      };
    };

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(i));
      }
    };

    const drawParticle = (p: Particle) => {
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      switch (p.shape) {
        case "circle":
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "square":
          ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
          break;
        case "triangle":
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - p.size);
          ctx.lineTo(p.x + p.size, p.y + p.size);
          ctx.lineTo(p.x - p.size, p.y + p.size);
          ctx.closePath();
          ctx.fill();
          break;
      }
    };

    const updateParticle = (p: Particle) => {
      // Base movement
      p.x += p.speedX;
      p.y += p.speedY;

      // Mouse interaction - particles move away from cursor
      if (mouseInteraction) {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }
      }

      // Wrap around edges
      if (p.x < -p.size) p.x = canvas.width + p.size;
      if (p.x > canvas.width + p.size) p.x = -p.size;
      if (p.y < -p.size) p.y = canvas.height + p.size;
      if (p.y > canvas.height + p.size) p.y = -p.size;

      // Subtle opacity pulsing
      p.opacity = 0.3 + Math.sin(Date.now() * 0.001 + p.id) * 0.2;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        updateParticle(p);
        drawParticle(p);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener("resize", resizeCanvas);
    if (mouseInteraction) {
      canvas.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      if (mouseInteraction) {
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [particleCount, colors, mouseInteraction, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ pointerEvents: mouseInteraction ? "auto" : "none" }}
    />
  );
}
