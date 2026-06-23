"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion";
import type { MenuCategory, FilterState } from "@/types/menu";
import { RESTAURANT_DATA } from "@/data/menu";

/* ─── All Category (virtual) ──────────────────────────── */
const ALL_CATEGORY = {
  id: "all" as const,
  icon: "🍽️",
  label: "All",
  colorHex: "#E8612A",
};

/* ─── Props ────────────────────────────────────────────── */
interface CategoryFilterProps {
  activeFilter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  itemCount: number;
}

export default function CategoryFilter({
  activeFilter,
  onFilterChange,
  itemCount,
}: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  /* ── Auto-scroll active pill into view ──────────── */
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const pill = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const pillRect = pill.getBoundingClientRect();

      const scrollLeft =
        pill.offsetLeft -
        container.offsetWidth / 2 +
        pill.offsetWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeFilter]);

  /* ── Build filter items array ───────────────────── */
  const filterItems = [
    ALL_CATEGORY,
    ...RESTAURANT_DATA.categories.map((cat) => ({
      id: cat.id,
      icon: cat.icon,
      label: cat.category.split(" | ")[0],
      colorHex: cat.colorHex,
    })),
  ];

  /* ── Get active color ───────────────────────────── */
  const activeColor =
    filterItems.find((f) => f.id === activeFilter)?.colorHex || "#E8612A";

  return (
    <div className="space-y-4">
      {/* ═══════════════════════════════════════════════
          Filter Pills Row
          ═══════════════════════════════════════════════ */}
      <div className="relative">
        {/* Left fade gradient */}
        <div
          className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--color-void), transparent)",
          }}
        />
        {/* Right fade gradient */}
        <div
          className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--color-void), transparent)",
          }}
        />

        {/* Scrollable pills container */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 py-2"
        >
          {filterItems.map((item) => {
            const isActive = activeFilter === item.id;

            return (
              <FilterPill
                key={item.id}
                ref={isActive ? activeRef : null}
                icon={item.icon}
                label={item.label}
                colorHex={item.colorHex}
                isActive={isActive}
                onClick={() => onFilterChange(item.id)}
              />
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          Item Count + Active Category Indicator
          ═══════════════════════════════════════════════ */}
      <div className="flex items-center justify-between px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: activeColor }}
              layoutId="count-dot"
              transition={springs.bouncy}
            />
            <span className="text-xs font-body text-muted">
              Showing{" "}
              <motion.span
                key={itemCount}
                className="text-primary font-semibold"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={springs.snappy}
              >
                {itemCount}
              </motion.span>{" "}
              {itemCount === 1 ? "item" : "items"}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Active category name */}
        <AnimatePresence mode="wait">
          <motion.span
            key={activeFilter}
            className="text-2xs font-body tracking-wider uppercase"
            style={{ color: activeColor }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {filterItems.find((f) => f.id === activeFilter)?.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FilterPill — Individual filter button with magnetic feel
   ───────────────────────────────────────────────────────── */
import { forwardRef } from "react";

interface FilterPillProps {
  icon: string;
  label: string;
  colorHex: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterPill = forwardRef<HTMLButtonElement, FilterPillProps>(
  ({ icon, label, colorHex, isActive, onClick }, ref) => {
    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        className={cn(
          "relative flex items-center gap-2 px-4 py-2.5",
          "rounded-full text-sm font-body font-medium",
          "whitespace-nowrap cursor-pointer select-none",
          "transition-colors duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ember",
          "border",
          isActive
            ? "text-primary"
            : "text-muted border-border hover:text-primary hover:border-white/10"
        )}
        style={{
          borderColor: isActive ? `${colorHex}50` : undefined,
          backgroundColor: isActive ? `${colorHex}10` : "transparent",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={springs.snappy}
        layout
      >
        {/* Active background glow */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(ellipse at center, ${colorHex}15 0%, transparent 70%)`,
            }}
            layoutId="pill-glow"
            transition={springs.bouncy}
          />
        )}

        {/* Icon */}
        <motion.span
          className="relative z-10 text-base"
          animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.span>

        {/* Label */}
        <span className="relative z-10">{label}</span>

        {/* Active underline indicator */}
        {isActive && (
          <motion.div
            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
            style={{
              backgroundColor: colorHex,
              width: "60%",
            }}
            layoutId="pill-underline"
            transition={springs.bouncy}
          />
        )}
      </motion.button>
    );
  }
);

FilterPill.displayName = "FilterPill";