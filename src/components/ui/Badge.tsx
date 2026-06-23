"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion";

/* ─── Category Badge ───────────────────────────────────── */
interface CategoryBadgeProps {
  icon: string;
  label: string;
  colorHex: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function CategoryBadge({
  icon,
  label,
  colorHex,
  isActive = false,
  onClick,
}: CategoryBadgeProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-full",
        "text-sm font-body font-medium tracking-normal",
        "transition-colors duration-200 cursor-pointer select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ember",
        "border whitespace-nowrap",
        isActive
          ? "text-primary border-opacity-40"
          : "text-muted border-border hover:text-primary hover:border-white/10"
      )}
      style={{
        borderColor: isActive ? colorHex : undefined,
        backgroundColor: isActive ? `${colorHex}12` : "transparent",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={springs.snappy}
      layout
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
      {isActive && (
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: colorHex }}
          layoutId="active-dot"
          transition={springs.bouncy}
        />
      )}
    </motion.button>
  );
}

/* ─── Price Badge ──────────────────────────────────────── */
interface PriceBadgeProps {
  price: number;
  size?: "sm" | "md" | "lg";
}

export function PriceBadge({ price, size = "md" }: PriceBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={cn(
        "price-badge font-body font-semibold",
        sizeClasses[size]
      )}
    >
      {price.toLocaleString()} ETB
    </span>
  );
}

/* ─── Featured Badge ───────────────────────────────────── */
export function FeaturedBadge() {
  return (
    <motion.span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                 text-2xs font-body font-semibold uppercase tracking-wider
                 bg-amber/15 text-amber border border-amber/25"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springs.bouncy}
    >
      ★ Popular
    </motion.span>
  );
}