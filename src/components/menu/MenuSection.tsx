"use client";

import { motion } from "framer-motion";
import CategoryCard from "@/components/menu/CategoryCard";
import { RESTAURANT_DATA } from "@/data/menu";
import type { EnrichedMenuItem } from "@/hooks/useMenuFilter";

/* ─── Props ────────────────────────────────────────────── */
interface MenuSectionProps {
  onItemClick: (item: EnrichedMenuItem) => void;
}

export default function MenuSection({ onItemClick }: MenuSectionProps) {
  // Group items by category
  const categorizedItems = RESTAURANT_DATA.categories.map((cat) => ({
    category: {
      id: cat.id,
      name: cat.category,
      icon: cat.icon,
      colorHex: cat.colorHex,
    },
    items: cat.items.map((item) => ({
      ...item,
      categoryId: cat.id,
      categoryName: cat.category,
      categoryIcon: cat.icon,
      categoryColor: cat.color,
      categoryColorHex: cat.colorHex,
    })) as EnrichedMenuItem[],
  }));

  return (
    <section
      id="menu-section"
      className="relative z-10 min-h-screen pb-24"
    >
      {/* ── Ambient glow ──────────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(232,97,42,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* ── Section Header ──────────────────────── */}
        <motion.div
          className="text-center px-4 pt-8 pb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        >
          <motion.p
            className="text-ember text-xs font-body tracking-widest uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Our Menu
          </motion.p>
          <h2 className="text-2xl sm:text-3xl font-display text-primary mb-3">
            What would you like?
          </h2>
          <p className="text-muted text-sm font-body max-w-sm mx-auto">
            Browse our selection organized by category. Tap any category to expand and view all items.
          </p>
        </motion.div>

        {/* ── Category Cards ──────────────────────── */}
        <div className="px-4 space-y-4">
          {categorizedItems.map((cat, index) => (
            <CategoryCard
              key={cat.category.id}
              category={cat.category}
              items={cat.items}
              index={index}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}