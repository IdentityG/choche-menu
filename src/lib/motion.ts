import type { Variants, Transition } from "framer-motion";

/* --- Spring Configs -------------------------------------- */
export const springs = {
  gentle: {
    type: "spring" as const,
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  },
  snappy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  },
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 17,
    mass: 0.6,
  },
  slow: {
    type: "spring" as const,
    stiffness: 80,
    damping: 30,
    mass: 1.2,
  },
  cinematic: {
    type: "spring" as const,
    stiffness: 60,
    damping: 25,
    mass: 1.5,
  },
} satisfies Record<string, Transition>;

/* --- Fade Variants --------------------------------------- */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

/* --- Slide Up Variants ----------------------------------- */
export const slideUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.gentle,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

/* --- Slide Down Variants --------------------------------- */
export const slideDown: Variants = {
  hidden:  { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: springs.gentle },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

/* --- Scale Variants -------------------------------------- */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: springs.snappy },
  exit:    { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

/* --- Stagger Container ----------------------------------- */
export const staggerContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

/* --- Card Item (used in stagger) ------------------------ */
export const cardItem: Variants = {
  hidden:  { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.gentle,
  },
};

/* --- Modal Overlay --------------------------------------- */
export const overlayVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

/* --- Modal Panel ----------------------------------------- */
export const modalVariants: Variants = {
  hidden:  { opacity: 0, y: "100%", scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.cinematic,
  },
  exit: {
    opacity: 0,
    y: "100%",
    scale: 0.98,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

/* --- Splash Screen Variants ------------------------------ */
export const splashExit: Variants = {
  visible: { opacity: 1, scale: 1 },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

/* --- Curtain Wipe ---------------------------------------- */
export const curtainVariants: Variants = {
  hidden:  { scaleY: 1 },
  visible: { scaleY: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};

/* --- Text Reveal ----------------------------------------- */
export const textReveal: Variants = {
  hidden:  { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.6, ease: [0.2, 0, 0, 1] },
  },
};

/* --- Filter Pill ----------------------------------------- */
export const pillVariants: Variants = {
  inactive: { scale: 1 },
  active: {
    scale: 1.04,
    transition: springs.bouncy,
  },
};
