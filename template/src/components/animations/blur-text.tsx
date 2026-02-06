"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function BlurText({
  text,
  className,
  delay = 0,
  duration = 0.4,
  as: Component = "span",
}: BlurTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 100px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const words = text.split(" ");

  return (
    <Component
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={cn("inline-block", className)}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.25em] overflow-hidden"
        >
          <span
            className="inline-block transition-all"
            style={{
              filter: isVisible ? "blur(0)" : "blur(10px)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transitionDuration: `${duration}s`,
              transitionDelay: `${i * 0.05}s`,
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
