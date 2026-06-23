"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import CategoryFilter from "@/components/menu/CategoryFilter";
import SortControl, { type SortOption } from "@/components/menu/SortControl";
import type { FilterState } from "@/types/menu";

/* ─── Props ────────────────────────────────────────────── */
interface StickyFilterBarProps {
  activeFilter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  sortValue: SortOption;
  onSortChange: (sort: SortOption) => void;
  itemCount: number;
}

export default function StickyFilterBar({
  activeFilter,
  onFilterChange,
  sortValue,
  onSortChange,
  itemCount,
}: StickyFilterBarProps) {
  const [isStuck, setIsStuck] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  /* ── Detect when filter bar hits top ────────────── */
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", () => {
    if (stickyRef.current) {
      const rect = stickyRef.current.getBoundingClientRect();
      setIsStuck(rect.top <= 0);
    }
  });

  return (
    <div ref={stickyRef} className="sticky top-0 z-filter">
      <motion.div
        className={cn(
          "py-3 transition-all duration-300",
          isStuck
            ? "glass border-b border-white/[0.03] shadow-lg shadow-black/20"
            : "bg-transparent"
        )}
        layout
      >
        {/* Filter Pills */}
        <CategoryFilter
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          itemCount={itemCount}
        />

        {/* Sort Control Row */}
        <div className="flex items-center justify-between px-4 mt-3">
          {/* Left: Search hint */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className="w-4 h-px"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-ember), transparent)",
              }}
            />
            <span className="text-2xs font-body text-dim">
              Tap a dish to see details & AR
            </span>
          </motion.div>

          {/* Right: Sort */}
          <SortControl value={sortValue} onChange={onSortChange} />
        </div>
      </motion.div>
    </div>
  );
}