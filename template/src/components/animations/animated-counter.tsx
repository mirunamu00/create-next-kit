"use client";

import * as React from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  formatValue?: (value: number) => string;
}

export function AnimatedCounter({
  value,
  duration = 2,
  delay = 0,
  className,
  prefix = "",
  suffix = "",
  formatValue,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = React.useState(false);

  const springValue = useSpring(0, {
    damping: 30,
    stiffness: 100,
    duration: duration * 1000,
  });

  const displayValue = useTransform(springValue, (latest) => {
    const rounded = Math.round(latest);
    if (formatValue) {
      return formatValue(rounded);
    }
    return rounded.toString();
  });

  React.useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        springValue.set(value);
        setHasAnimated(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated, value, springValue, delay]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

// Convenience component for time display
interface AnimatedTimeCounterProps {
  minutes: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export function AnimatedTimeCounter({
  minutes,
  duration = 2,
  delay = 0,
  className,
}: AnimatedTimeCounterProps) {
  return (
    <AnimatedCounter
      value={minutes}
      duration={duration}
      delay={delay}
      className={className}
      suffix="분"
    />
  );
}
