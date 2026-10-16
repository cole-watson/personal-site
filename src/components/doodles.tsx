"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

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

const flightPath =
  "M6 58 C 30 62, 50 56, 62 46 C 74 36, 66 24, 56 30 C 46 36, 60 50, 82 46 C 104 42, 124 32, 138 24";

/** Paper plane that loops along its trail, nose following the curve, once a message is sent. */
export function PaperPlane() {
  const trail = useRef<SVGPathElement>(null);
  const plane = useRef<SVGGElement>(null);
  const progress = useMotionValue(0);
  const planeOpacity = useTransform(progress, [0, 0.08], [0, 1]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const path = trail.current;
    const g = plane.current;
    if (!path || !g) return;
    const length = path.getTotalLength();

    // Sit the plane on the trail at `p`, rotated to the curve's direction there.
    const place = (p: number) => {
      const at = Math.max(p * length, 1);
      const a = path.getPointAtLength(at - 1);
      const b = path.getPointAtLength(at);
      const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      g.setAttribute("transform", `translate(${b.x} ${b.y}) rotate(${deg})`);
    };

    if (reduce) {
      progress.set(1);
      place(1);
      return;
    }
    const unsubscribe = progress.on("change", place);
    place(progress.get());
    const controls = animate(progress, 1, { duration: 1.4, ease: [0.45, 0, 0.2, 1] });
    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [progress, reduce]);

  return (
    <svg aria-hidden viewBox="0 0 160 70" fill="none" className="h-20 w-auto shrink-0">
      <motion.path
        ref={trail}
        d={flightPath}
        stroke="var(--accent)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeOpacity={0.45}
        style={{ pathLength: progress }}
      />
      {/* Drawn pointing along +x with its tail at the origin, so it can be placed on the path. */}
      <motion.g ref={plane} style={{ opacity: planeOpacity }}>
        <path d="M18 0 L-8 -9 L-2 1.5 Z" fill="var(--accent)" />
        <path d="M18 0 L-2 1.5 L2 9 Z" fill="var(--accent)" opacity="0.65" />
      </motion.g>
    </svg>
  );
}
