"use client";

import { useMemo } from "react";
import { motion, Variants, Easing } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimationState {
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
}

type SplitTextProps = {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: AnimationState;
  animationTo?: AnimationState;
  easing?: Easing;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "right" | "center" | "justify";
  onLetterAnimationComplete?: () => void;
};

export function SplitText({
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, y: 40 },
  animationTo = { opacity: 1, y: 0 },
  easing = "easeOut",
  threshold = 0.05,
  rootMargin = "0px 0px 100px 0px",
  textAlign = "center",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const letters = useMemo(() => {
    const words: { chars: string[]; wordIndex: number }[] = [];
    text.split(" ").forEach((word, wordIndex) => {
      words.push({
        chars: word.split(""),
        wordIndex,
      });
    });
    return words;
  }, [text]);

  let letterIndex = 0;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: animationFrom.opacity ?? 0,
      y: animationFrom.y ?? 0,
      x: animationFrom.x ?? 0,
      scale: animationFrom.scale ?? 1,
      rotate: animationFrom.rotate ?? 0,
    },
    visible: {
      opacity: animationTo.opacity ?? 1,
      y: animationTo.y ?? 0,
      x: animationTo.x ?? 0,
      scale: animationTo.scale ?? 1,
      rotate: animationTo.rotate ?? 0,
      transition: {
        duration: 0.3,
        ease: easing,
      },
    },
  };

  return (
    <motion.div
      className={cn("flex flex-wrap", className)}
      style={{ textAlign }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: rootMargin }}
      variants={containerVariants}
    >
      {letters.map(({ chars, wordIndex }) => (
        <span key={wordIndex} className="flex">
          {chars.map((char, charIndex) => {
            const currentLetterIndex = letterIndex++;
            return (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                variants={letterVariants}
                onAnimationComplete={
                  currentLetterIndex === text.replace(/\s/g, "").length - 1
                    ? onLetterAnimationComplete
                    : undefined
                }
              >
                {char}
              </motion.span>
            );
          })}
          {wordIndex < letters.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.div>
  );
}
