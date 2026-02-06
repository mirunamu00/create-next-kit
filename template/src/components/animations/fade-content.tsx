"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FadeContentProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  blur?: boolean;
  direction?: "up" | "down" | "left" | "right" | "none";
};

const directionOffset = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

export function FadeContent({
  children,
  className,
  delay = 0,
  duration = 0.3,
  blur = false,
  direction = "up",
}: FadeContentProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{
        opacity: 0,
        filter: blur ? "blur(10px)" : "blur(0px)",
        ...directionOffset[direction],
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px 100px 0px" }}
      transition={{
        duration,
        delay: delay / 1000,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
