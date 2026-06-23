"use client";

import { motion } from "framer-motion";
import { Phone, Clock, Smartphone, Heart } from "lucide-react";
import { RESTAURANT_DATA } from "@/data/menu";
import { cn } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border bg-surface/50">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* ── Brand ─────────────────────────────── */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-3xl mb-3 block">☕</span>
          <h3 className="text-xl font-display text-primary mb-1">
            {RESTAURANT_DATA.restaurantAm}
          </h3>
          <p className="text-sm font-body text-muted">
            {RESTAURANT_DATA.restaurant}
          </p>
        </motion.div>

        {/* ── Info Cards ────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <a
            href={`tel:${RESTAURANT_DATA.phone}`}
            className={cn(
              "flex items-center gap-3 p-4 rounded-2xl",
              "bg-elevated border border-border",
              "hover:border-ember/20 transition-colors duration-200"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-ember/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-ember" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs font-body text-dim mb-0.5">Call us</p>
              <p className="text-sm font-body text-primary font-medium">
                {RESTAURANT_DATA.phone}
              </p>
            </div>
          </a>

          <div
            className={cn(
              "flex items-center gap-3 p-4 rounded-2xl",
              "bg-elevated border border-border"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-amber" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs font-body text-dim mb-0.5">Hours</p>
              <p className="text-sm font-body text-primary font-medium">
                6AM – 10PM
              </p>
            </div>
          </div>

          <div
            className={cn(
              "flex items-center gap-3 p-4 rounded-2xl",
              "bg-elevated border border-border"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-category-cold/10 flex items-center justify-center flex-shrink-0">
              <Smartphone
                className="w-4 h-4 text-category-cold"
                strokeWidth={2}
              />
            </div>
            <div>
              <p className="text-xs font-body text-dim mb-0.5">AR Menu</p>
              <p className="text-sm font-body text-primary font-medium">
                View dishes in 3D
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Menu Stats ────────────────────────── */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-8 py-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {RESTAURANT_DATA.categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="text-2xs font-body text-dim">
                {cat.items.length}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Bottom Divider ─────────────────────── */}
        <div
          className="w-full h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-border), transparent)",
          }}
        />

        {/* ── Copyright ─────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <p className="text-xs font-body text-dim flex items-center gap-1">
            © {currentYear} {RESTAURANT_DATA.restaurant}.
          </p>
          <p className="text-xs font-body text-dim flex items-center gap-1">
            Made with
            <Heart className="w-3 h-3 text-ember inline" strokeWidth={2} />
            & ☕
          </p>
        </div>

        {/* ── Powered By ─────────────────────────── */}
        <motion.p
          className="text-center text-2xs font-body text-dim/50 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Powered by Next.js · Three.js · Framer Motion
        </motion.p>
      </div>
    </footer>
  );
}