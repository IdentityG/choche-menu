"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { springs, staggerContainer, cardItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { RESTAURANT_DATA } from "@/data/menu";
import { ChevronDown, Phone, Sparkles, UtensilsCrossed, Smartphone } from "lucide-react";

/* ─── Stats Data ───────────────────────────────────────── */
const stats = [
  {
    icon: UtensilsCrossed,
    value: "60+",
    label: "Dishes",
    colorClass: "text-ember",
    bgClass: "bg-ember/10 border-ember/20",
  },
  {
    icon: Sparkles,
    value: "Fresh",
    label: "Daily",
    colorClass: "text-amber",
    bgClass: "bg-amber/10 border-amber/20",
  },
  {
    icon: Smartphone,
    value: "AR",
    label: "View",
    colorClass: "text-category-cold",
    bgClass: "bg-category-cold/10 border-category-cold/20",
  },
];

/* ─── Hero Section ─────────────────────────────────────── */
export default function HeroHeader() {
  const heroRef = useRef<HTMLDivElement>(null);

  /* ── Scroll tracking ──────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* ── Smoothed scroll values ───────────────────────── */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  /* ── Parallax transforms ──────────────────────────── */
  const heroOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(smoothProgress, [0, 0.8], [1, 0.95]);

  // Background grid moves slower (parallax depth)
  const gridY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
  const gridOpacity = useTransform(smoothProgress, [0, 0.5], [0.4, 0]);

  // Glow moves fastest (foreground layer)
  const glowY = useTransform(smoothProgress, [0, 1], ["0%", "40%"]);
  const glowScale = useTransform(smoothProgress, [0, 0.5], [1, 1.3]);

  // Stats cards float up slightly
  const statsY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const statsOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ═══════════════════════════════════════════════════
          LAYER 0: Background Grid Pattern
          ═══════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: gridY, opacity: gridOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(42,42,42,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════
          LAYER 1: Ambient Glow
          ═══════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: glowY, scale: glowScale }}
      >
        {/* Primary ember glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4"
          style={{
            width: "min(700px, 90vw)",
            height: "500px",
            background:
              "radial-gradient(ellipse at center, rgba(232,97,42,0.07) 0%, rgba(232,97,42,0.02) 40%, transparent 70%)",
          }}
        />
        {/* Secondary amber accent */}
        <div
          className="absolute top-1/3 right-1/4"
          style={{
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(242,169,59,0.05) 0%, transparent 60%)",
          }}
        />
        {/* Left teal hint */}
        <div
          className="absolute bottom-1/4 left-1/6"
          style={{
            width: "200px",
            height: "200px",
            background:
              "radial-gradient(circle, rgba(59,168,196,0.03) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════
          LAYER 2: Main Hero Content (parallax)
          ═══════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-12"
        style={{
          opacity: heroOpacity,
          y: heroY,
          scale: heroScale,
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* ── Icon ──────────────────────────────────── */}
          <motion.div variants={cardItem} className="mb-8">
            <motion.div
              className="relative w-24 h-24 rounded-3xl bg-elevated border border-border
                         flex items-center justify-center shadow-ember-md"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 0 40px rgba(232,97,42,0.4)",
              }}
              transition={springs.bouncy}
            >
              {/* Glow pulse behind icon */}
              <motion.div
                className="absolute inset-0 -m-2 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(232,97,42,0.15) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-5xl relative z-10">☕</span>
            </motion.div>
          </motion.div>

          {/* ── Restaurant Name (Amharic) ────────────── */}
          <motion.div variants={cardItem} className="overflow-hidden mb-3">
            <h1 className="text-4xl sm:text-5xl font-display text-primary tracking-normal leading-tight">
              {RESTAURANT_DATA.restaurantAm}
            </h1>
          </motion.div>

          {/* ── Restaurant Name (Latin) ──────────────── */}
          <motion.div variants={cardItem} className="overflow-hidden mb-6">
            <p className="text-xl sm:text-2xl font-body text-muted tracking-wide font-light">
              {RESTAURANT_DATA.restaurant}
            </p>
          </motion.div>

          {/* ── Divider ──────────────────────────────── */}
          <motion.div
            variants={cardItem}
            className="w-16 h-px mb-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-ember), var(--color-amber), transparent)",
            }}
          />

          {/* ── Tagline ──────────────────────────────── */}
          <motion.p
            variants={cardItem}
            className="text-sm font-body text-dim tracking-widest uppercase mb-10"
          >
            {RESTAURANT_DATA.tagline}
          </motion.p>

          {/* ── CTA Button ───────────────────────────── */}
          <motion.div variants={cardItem}>
            <ExploreButton />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════
          LAYER 3: Stat Cards (Bento Row)
          ═══════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 w-full max-w-md px-6 pb-16"
        style={{ y: statsY, opacity: statsOpacity }}
      >
        <motion.div
          className="grid grid-cols-3 gap-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={cardItem}
              custom={i}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={springs.snappy}
              className={cn(
                "flex flex-col items-center justify-center py-5 px-3",
                "rounded-2xl border bg-surface/80 backdrop-blur-sm",
                "cursor-default select-none",
                stat.bgClass
              )}
            >
              <stat.icon
                className={cn("w-5 h-5 mb-2", stat.colorClass)}
                strokeWidth={1.5}
              />
              <span
                className={cn(
                  "text-lg font-display font-bold",
                  stat.colorClass
                )}
              >
                {stat.value}
              </span>
              <span className="text-xs font-body text-muted mt-0.5">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════
          LAYER 4: Scroll Indicator
          ═══════════════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10
                   flex flex-col items-center gap-2"
        style={{ opacity: heroOpacity }}
      >
        <motion.span className="text-dim text-2xs font-body tracking-widest uppercase">
          Scroll to explore
        </motion.span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-4 h-4 text-ember" strokeWidth={2} />
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════
          LAYER 5: Bottom Fade Gradient
          ═══════════════════════════════════════════════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--color-void) 100%)",
        }}
      />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Explore Button — Magnetic-style CTA
   ───────────────────────────────────────────────────────── */
function ExploreButton() {
  const handleClick = () => {
    const menuSection = document.getElementById("menu-section");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "group relative flex items-center gap-3 px-8 py-4",
        "rounded-2xl font-body font-semibold text-base",
        "cursor-pointer select-none overflow-hidden",
        "border border-ember/30 text-primary",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
      )}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={springs.snappy}
    >
      {/* Background fill on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(232,97,42,0.15) 0%, rgba(242,169,59,0.08) 100%)",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer sweep on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% center", "-200% center"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <span className="relative z-10 text-gradient-ember">
        Explore Menu
      </span>

      <motion.span
        className="relative z-10"
        animate={{ y: [0, 3, 0] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-4 h-4 text-ember" strokeWidth={2.5} />
      </motion.span>
    </motion.button>
  );
}