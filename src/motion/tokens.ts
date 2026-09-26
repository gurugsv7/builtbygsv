import type { Transition } from 'motion/react';

/**
 * One motion language for the whole site. Durations are in seconds (Motion's unit);
 * the CSS custom properties in index.css mirror the interaction values.
 */
export const DURATION = {
  /** Hover, press and focus feedback. */
  fast: 0.16,
  /** State changes inside a component: tabs, disclosures, step changes. */
  base: 0.26,
  /** A section or block entering the viewport. */
  reveal: 0.55,
  /** SVG connectors drawing between nodes. */
  draw: 0.9,
} as const;

export const EASE = {
  /** Decelerating, used for anything entering. */
  out: [0.22, 1, 0.36, 1],
  /** Symmetric, used for things moving between two resting states. */
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const SPRING = {
  /** Shared-layout indicators and panels. Settles without visible bounce. */
  gentle: { type: 'spring', stiffness: 380, damping: 36, mass: 0.9 },
  /** Pointer-driven depth in the hero illustration. */
  depth: { stiffness: 90, damping: 22, mass: 0.6 },
} as const satisfies Record<string, Transition | Record<string, number>>;

/** Interval between siblings in a staggered group. */
export const STAGGER = 0.07;

/** How far entering content travels, in px. Kept deliberately small. */
export const RISE = 12;

/** Viewport trigger used by every scroll reveal. */
export const VIEWPORT = { once: true, amount: 0.25 } as const;

export const revealTransition = (delay = 0): Transition => ({
  duration: DURATION.reveal,
  ease: EASE.out,
  delay,
});
