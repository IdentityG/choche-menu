"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion";

/* ─── Sort Options ─────────────────────────────────────── */
export type SortOption = "default" | "price-asc" | "price-desc";

const sortLabels: Record<SortOption, string> = {
  default: "Default",
  "price-asc": "Price ↑",
  "price-desc": "Price ↓",
};

const sortIcons: Record<SortOption, typeof ArrowUpDown> = {
  default: ArrowUpDown,
  "price-asc": ArrowUp,
  "price-desc": ArrowDown,
};

const sortCycle: SortOption[] = ["default", "price-asc", "price-desc"];

/* ─── Props ────────────────────────────────────────────── */
interface SortControlProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export default function SortControl({ value, onChange }: SortControlProps) {
  const handleCycle = () => {
    const currentIndex = sortCycle.indexOf(value);
    const nextIndex = (currentIndex + 1) % sortCycle.length;
    onChange(sortCycle[nextIndex]);
  };

  const Icon = sortIcons[value];

  return (
    <motion.button
      onClick={handleCycle}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-xl",
        "text-xs font-body font-medium",
        "border border-border",
        "cursor-pointer select-none",
        "transition-colors duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ember",
        value !== "default"
          ? "text-ember border-ember/30 bg-ember/5"
          : "text-muted hover:text-primary hover:border-white/10"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={springs.snappy}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.15 }}
        >
          <Icon className="w-3 h-3" strokeWidth={2} />
        </motion.span>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.15 }}
        >
          {sortLabels[value]}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}