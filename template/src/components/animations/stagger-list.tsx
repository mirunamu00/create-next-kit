"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, Children, cloneElement, isValidElement } from "react";

interface StaggerListProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

export function StaggerList({
  children,
  className,
  staggerDelay = 0.1,
  duration = 0.3,
}: StaggerListProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 100px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("", className)}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        return (
          <div
            key={index}
            className="transition-all"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transitionDuration: `${duration}s`,
              transitionDelay: `${index * staggerDelay}s`,
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {cloneElement(child)}
          </div>
        );
      })}
    </div>
  );
}
