"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion";
import { RESTAURANT_DATA } from "@/data/menu";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  /* ── Show navbar after scrolling past hero ─────── */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 300);
  });

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-header",
        "transition-all duration-300"
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -80,
        opacity: isVisible ? 1 : 0,
      }}
      transition={springs.snappy}
    >
      <div className="mx-auto max-w-2xl px-4 py-3">
        <div
          className={cn(
            "glass rounded-2xl px-5 py-3",
            "flex items-center justify-between",
            "border border-white/[0.04]",
            "shadow-lg shadow-black/20"
          )}
        >
          {/* ── Left: Logo + Name ──────────────────── */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={springs.snappy}
          >
            <motion.div
              className="w-9 h-9 rounded-xl bg-elevated border border-border
                         flex items-center justify-center"
              whileHover={{ rotate: 10 }}
              transition={springs.bouncy}
            >
              <span className="text-lg">☕</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-sm font-display text-primary leading-tight">
                {RESTAURANT_DATA.restaurantAm}
              </span>
              <span className="text-2xs font-body text-dim leading-tight">
                {RESTAURANT_DATA.restaurant}
              </span>
            </div>
          </motion.div>

          {/* ── Right: Phone ──────────────────────── */}
          <motion.a
            href={`tel:${RESTAURANT_DATA.phone}`}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl",
              "text-xs font-body text-muted",
              "hover:text-primary hover:bg-white/[0.04]",
              "transition-colors duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={springs.snappy}
            aria-label={`Call ${RESTAURANT_DATA.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-ember" strokeWidth={2} />
            <span className="hidden sm:inline">{RESTAURANT_DATA.phone}</span>
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}