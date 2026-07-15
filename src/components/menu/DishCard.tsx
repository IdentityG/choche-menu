"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion";
import type { EnrichedMenuItem } from "@/hooks/useMenuFilter";

/* ─── Card Variant Types ───────────────────────────────── */
type CardVariant = "featured" | "standard" | "compact";

/* ─── Props ────────────────────────────────────────────── */
interface DishCardProps {
  item: EnrichedMenuItem;
  variant?: CardVariant;
  index: number;
  onClick: (item: EnrichedMenuItem) => void;
}

/* ─── Determine variant automatically ──────────────────── */
export function getCardVariant(
  item: EnrichedMenuItem,
  index: number
): CardVariant {
  if (item.featured && index < 6) return "featured";
  const compactCategories = ["cold", "hot"];
  if (compactCategories.includes(item.categoryId)) return "compact";
  return "standard";
}

/* ─── Image Component with fallback ────────────────────── */
function DishImage({
  src,
  alt,
  icon,
  colorHex,
  size = "md",
}: {
  src?: string;
  alt: string;
  icon: string;
  colorHex: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-14 h-14 rounded-xl",
    md: "w-full h-36 rounded-2xl",
    lg: "w-full h-44 sm:h-52 rounded-2xl",
  };

  if (!src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden flex items-center justify-center select-none",
          sizeClasses[size]
        )}
        style={{
          background: `linear-gradient(135deg, ${colorHex}15 0%, ${colorHex}08 50%, ${colorHex}03 100%)`,
        }}
      >
        <span className={cn(size === "sm" ? "text-xl" : size === "md" ? "text-3xl" : "text-4xl")}>
          {icon}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden select-none", sizeClasses[size])}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={
          size === "sm"
            ? "56px"
            : size === "md"
            ? "(max-width: 640px) 100vw, 50vw"
            : "(max-width: 640px) 100vw, 60vw"
        }
        quality={75}
      />

      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            size === "sm"
              ? "none"
              : "linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 60%)",
        }}
      />

      {/* Shimmer sweep on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2.5s linear infinite",
        }}
      />
    </div>
  );
}

/* ─── Featured Badge ───────────────────────────────────── */
function FeaturedBadge() {
  return (
    <motion.span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                 text-2xs font-body font-semibold uppercase tracking-wider
                 bg-amber/12 text-amber border border-amber/20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springs.bouncy}
    >
      <Sparkles className="w-3 h-3" strokeWidth={2} />
      Popular
    </motion.span>
  );
}

/* ─── Price Tag ────────────────────────────────────────── */
function PriceTag({
  price,
  size = "md",
}: {
  price: number;
  size?: "sm" | "md" | "lg";
}) {
  const classes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-body font-semibold",
        "bg-ember/10 border border-ember/25 text-amber",
        classes[size]
      )}
    >
      {price.toLocaleString()} ETB
    </span>
  );
}

/* ═════════════════════════════════════════════════════════
   FEATURED CARD
   ═════════════════════════════════════════════════════════ */
function FeaturedCard({
  item,
  onClick,
}: Omit<DishCardProps, "variant" | "index">) {
  return (
    <motion.div
      onClick={() => onClick(item)}
      className="group col-span-1 sm:col-span-2 cursor-pointer select-none"
      whileHover={{ y: -4 }}
      transition={springs.snappy}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl",
          "bg-elevated border border-border",
          "transition-all duration-300",
          "shadow-card hover:shadow-card-hover"
        )}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${item.categoryColorHex}40`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "";
        }}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative sm:w-2/5 p-3 sm:p-4">
            <DishImage
              src={item.image}
              alt={`${item.name_ao} — ${item.name_am}`}
              icon={item.categoryIcon}
              colorHex={item.categoryColorHex}
              size="lg"
            />

            {/* Category on image */}
            <div className="absolute top-5 left-5 z-10">
              <span
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-2xs font-body font-medium glass"
                style={{ color: item.categoryColorHex }}
              >
                <span>{item.categoryIcon}</span>
                {item.categoryName}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-5 sm:pl-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FeaturedBadge />
              </div>

              <h3 className="text-xl font-display font-bold text-primary mb-1 leading-tight
                             group-hover:text-ember transition-colors duration-200">
                {item.name_ao}
              </h3>
              <p className="text-base font-body text-muted mb-4 leading-snug">
                {item.name_am}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <PriceTag price={item.price} size="lg" />
              <motion.span
                className="flex items-center gap-2 px-3 py-2 rounded-xl
                           bg-ember/8 border border-ember/15
                           text-xs font-body text-ember font-medium
                           group-hover:bg-ember/15 transition-colors duration-200"
              >
                View Details
              </motion.span>
            </div>
          </div>
        </div>

        {/* Bottom glow */}
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-1 rounded-full
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${item.categoryColorHex}60, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ═════════════════════════════════════════════════════════
   STANDARD CARD
   ═════════════════════════════════════════════════════════ */
function StandardCard({
  item,
  onClick,
}: Omit<DishCardProps, "variant" | "index">) {
  return (
    <motion.div
      onClick={() => onClick(item)}
      className="group col-span-1 cursor-pointer select-none"
      whileHover={{ y: -3, scale: 1.01 }}
      transition={springs.snappy}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl h-full",
          "bg-elevated border border-border",
          "transition-all duration-300",
          "shadow-card hover:shadow-card-hover",
          "flex flex-col"
        )}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${item.categoryColorHex}30`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "";
        }}
      >
        {/* Image */}
        <div className="p-3 pb-0">
          <DishImage
            src={item.image}
            alt={`${item.name_ao} — ${item.name_am}`}
            icon={item.categoryIcon}
            colorHex={item.categoryColorHex}
            size="md"
          />
        </div>

        {/* Content */}
        <div className="p-4 pt-3 flex flex-col flex-1">
          {/* Category + Featured */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.categoryColorHex }}
              />
              <span className="text-2xs font-body text-dim uppercase tracking-wider">
                {item.categoryName}
              </span>
            </div>
            {item.featured && (
              <motion.span
                className="text-amber text-xs"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ★
              </motion.span>
            )}
          </div>

          {/* Name */}
          <h3 className="text-base font-body font-semibold text-primary mb-0.5 leading-snug
                         group-hover:text-ember transition-colors duration-200">
            {item.name_ao}
          </h3>
          <p className="text-sm font-body text-muted mb-4 leading-snug">
            {item.name_am}
          </p>

          {/* Bottom */}
          <div className="flex items-center justify-between mt-auto">
            <PriceTag price={item.price} size="md" />
            <motion.span className="text-xs text-dim font-body
                                    group-hover:text-ember transition-colors duration-200">
              Details
            </motion.span>
          </div>
        </div>

        {/* Bottom edge glow */}
        <motion.div
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${item.categoryColorHex}50, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ═════════════════════════════════════════════════════════
   COMPACT CARD
   ═════════════════════════════════════════════════════════ */
function CompactCard({
  item,
  onClick,
}: Omit<DishCardProps, "variant" | "index">) {
  return (
    <motion.div
      onClick={() => onClick(item)}
      className="group col-span-1 cursor-pointer select-none"
      whileHover={{ y: -2, scale: 1.02 }}
      transition={springs.snappy}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-xl",
          "bg-elevated border border-border",
          "transition-all duration-300",
          "shadow-card hover:shadow-card-hover",
          "p-3"
        )}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${item.categoryColorHex}30`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "";
        }}
      >
        <div className="flex items-center gap-3">
          {/* Image */}
          <DishImage
            src={item.image}
            alt={`${item.name_ao} — ${item.name_am}`}
            icon={item.categoryIcon}
            colorHex={item.categoryColorHex}
            size="sm"
          />

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h3 className="text-sm font-body font-semibold text-primary truncate
                             group-hover:text-ember transition-colors duration-200">
                {item.name_ao}
              </h3>
              {item.featured && (
                <span className="text-amber text-xs flex-shrink-0">★</span>
              )}
            </div>
            <p className="text-xs font-body text-muted truncate">
              {item.name_am}
            </p>
          </div>

          {/* Price */}
          <PriceTag price={item.price} size="sm" />
        </div>
      </div>
    </motion.div>
  );
}

/* ═════════════════════════════════════════════════════════
   MAIN EXPORT
   ═════════════════════════════════════════════════════════ */
function DishCard({
  item,
  variant = "standard",
  index,
  onClick,
}: DishCardProps) {
  const resolvedVariant = variant || getCardVariant(item, index);

  switch (resolvedVariant) {
    case "featured":
      return <FeaturedCard item={item} onClick={onClick} />;
    case "compact":
      return <CompactCard item={item} onClick={onClick} />;
    case "standard":
    default:
      return <StandardCard item={item} onClick={onClick} />;
  }
}

export default memo(DishCard);