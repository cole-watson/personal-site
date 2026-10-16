"use client";

import { motion, useReducedMotion } from "motion/react";

const draw = { duration: 0.9, ease: [0.65, 0, 0.35, 1] as const };

/** Hand-drawn underline that sketches itself in under the hero title. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 300 16" fill="none" className={className}>
      <motion.path
        d="M3 11 C 45 3, 75 15, 120 8 S 205 2, 245 10 S 285 9, 297 6"
        stroke="var(--highlight)"
        strokeWidth={3.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ ...draw, delay: 0.5 }}
      />
    </svg>
  );
}

/** Little wave that draws in beside each section eyebrow. */
export function EyebrowMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 12" fill="none" className="h-3 w-6 shrink-0">
      <motion.path
        d="M2 6 Q 5 1 8 6 T 14 6 T 20 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ ...draw, delay: 0.15 }}
      />
    </svg>
  );
}

function Sparkle({ className, reduce, delay = 0 }: { className: string; reduce: boolean; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      animate={reduce ? undefined : { scale: [1, 0.55, 1], rotate: [0, 45, 0], opacity: [1, 0.5, 1] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <path d="M12 0 C 13 8, 16 11, 24 12 C 16 13, 13 16, 12 24 C 11 16, 8 13, 0 12 C 8 11, 11 8, 12 0 Z" />
    </motion.svg>
  );
}

/** Twinkling sparkles around the portrait. */
export function Sparkles() {
  const reduce = !!useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Sparkle reduce={reduce} className="absolute top-[5%] right-[8%] w-7 text-accent" />
      <Sparkle reduce={reduce} delay={1.4} className="absolute right-[22%] -bottom-3 w-4 text-[var(--highlight)]" />
      <Sparkle reduce={reduce} delay={0.7} className="absolute top-[34%] -left-4 w-5 text-[var(--highlight)]" />
      <Sparkle reduce={reduce} delay={2.1} className="absolute top-[3%] left-[14%] w-3 text-accent" />
      <Sparkle reduce={reduce} delay={1.1} className="absolute bottom-[24%] -right-3 w-5 text-accent" />
      <Sparkle reduce={reduce} delay={2.6} className="absolute bottom-[14%] -left-3 w-3 text-[var(--highlight)]" />
    </div>
  );
}

/** Paper plane that flies in along its trail once a message is sent. */
export function PaperPlane() {
  const flight = { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const };
  return (
    <svg aria-hidden viewBox="0 0 160 70" fill="none" className="h-16 w-auto shrink-0">
      <motion.path
        d="M4 62 C 40 66, 60 30, 90 40 S 118 30, 126 21"
        stroke="var(--accent)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeOpacity={0.45}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={flight}
      />
      <motion.g
        initial={{ opacity: 0, x: -110, y: 40, rotate: 12 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
        transition={flight}
      >
        <path d="M156 8 L124 20 L136 24 Z" fill="var(--accent)" />
        <path d="M156 8 L136 24 L140 34 Z" fill="var(--accent)" opacity="0.65" />
      </motion.g>
    </svg>
  );
}
