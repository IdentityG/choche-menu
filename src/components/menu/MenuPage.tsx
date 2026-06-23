"use client";

import { motion } from "framer-motion";
import { staggerContainer, cardItem } from "@/lib/motion";
import { RESTAURANT_DATA } from "@/data/menu";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-void">
      {/* -- Ambient background glow ------------------ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(232,97,42,0.06) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* -- Content ---------------------------------- */}
      <div className="relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center min-h-screen px-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Phase 0 verification + Phase 1 success indicator */}
          <motion.div variants={cardItem} className="text-center space-y-6">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-elevated border border-border
                         flex items-center justify-center mx-auto shadow-ember-sm"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="text-3xl">🎉</span>
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-2xl font-display text-primary">
                Splash Complete
              </h1>
              <p className="text-muted font-body text-base">
                {RESTAURANT_DATA.restaurant} — {RESTAURANT_DATA.restaurantAm}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              {RESTAURANT_DATA.categories.map((cat) => (
                <motion.span
                  key={cat.id}
                  className="category-pill"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.category.split(" | ")[0]}</span>
                </motion.span>
              ))}
            </div>

            <div className="pt-8 space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-category-juice animate-pulse-ember" />
                <span className="text-dim text-sm font-body">
                  Phase 1 ✓ — Splash Screen
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-ember animate-pulse-ember" />
                <span className="text-dim text-sm font-body">
                  Ready for Phase 2 — Hero Header
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
