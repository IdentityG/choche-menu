"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion";
import type { EnrichedMenuItem } from "@/hooks/useMenuFilter";

/* ─── Props ────────────────────────────────────────────── */
interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    icon: string;
    colorHex: string;
  };
  items: EnrichedMenuItem[];
  index: number;
  onItemClick: (item: EnrichedMenuItem) => void;
}

/* ─── Animation Variants ───────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut" as const,
    },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    x: -5,
    transition: {
      duration: 0.2,
    },
  },
};

/* ═════════════════════════════════════════════════════════
   CATEGORY CARD
   ═════════════════════════════════════════════════════════ */
export default function CategoryCard({
  category,
  items,
  index,
  onItemClick,
}: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get the first featured item or first item as the hero
  const heroItem = items.find((item) => item.featured) || items[0];

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleHeroClick = useCallback(() => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      onItemClick(heroItem);
    }
  }, [isExpanded, heroItem, onItemClick]);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl",
          "bg-elevated border border-border",
          "transition-all duration-300",
          "shadow-card hover:shadow-card-hover"
        )}
        style={{
          borderColor: isExpanded ? `${category.colorHex}40` : undefined,
        }}
      >
        {/* ── Hero Card (Always Visible) ──────────── */}
        <div
          className="cursor-pointer group"
          onClick={handleHeroClick}
        >
          <div className="flex items-center gap-4 p-4">
            {/* Image */}
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
              {heroItem.image ? (
                <>
                  <Image
                    src={heroItem.image}
                    alt={heroItem.name_ao}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="96px"
                    quality={75}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,10,10,0.3) 0%, transparent 60%)",
                    }}
                  />
                </>
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${category.colorHex}15 0%, ${category.colorHex}08 50%, ${category.colorHex}03 100%)`,
                  }}
                >
                  <span className="text-4xl">{category.icon}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{category.icon}</span>
                <span
                  className="text-sm font-body font-semibold uppercase tracking-wider"
                  style={{ color: category.colorHex }}
                >
                  {category.name}
                </span>
                <div
                  className="px-2 py-0.5 rounded-full text-2xs font-body font-medium bg-white/5 text-dim"
                >
                  {items.length} items
                </div>
              </div>

              {/* Hero Item Name */}
              <h3 className="text-base font-body font-semibold text-primary mb-0.5 truncate group-hover:text-ember transition-colors duration-200">
                {heroItem.name_ao}
              </h3>
              <p className="text-sm font-body text-muted truncate">
                {heroItem.name_am}
              </p>
            </div>

            {/* Price & Expand Button */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span
                className="px-3 py-1 rounded-full text-sm font-body font-semibold"
                style={{
                  backgroundColor: `${category.colorHex}15`,
                  border: `1px solid ${category.colorHex}30`,
                  color: category.colorHex,
                }}
              >
                {heroItem.price} ETB
              </span>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand();
                }}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={springs.snappy}
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={springs.snappy}
                >
                  <ChevronDown
                    className="w-5 h-5 text-muted"
                    strokeWidth={2}
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Expanded Items List ─────────────────── */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden"
            >
              {/* Divider */}
              <div className="px-4">
                <div
                  className="w-full h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${category.colorHex}30, transparent)`,
                  }}
                />
              </div>

              {/* Items List */}
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-4 pt-3 space-y-2"
              >
                {items.map((item, idx) => (
                  <motion.div
                    key={`${item.name_ao}-${idx}`}
                    variants={listItemVariants}
                    className="group cursor-pointer"
                    onClick={() => onItemClick(item)}
                    whileHover={{ x: 4 }}
                    transition={springs.snappy}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl",
                        "bg-elevated border border-border",
                        "hover:bg-white/[0.02] transition-colors duration-200"
                      )}
                      style={{
                        borderColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${category.colorHex}20`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                      }}
                    >
                      {/* Thumbnail Image */}
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <>
                            <Image
                              src={item.image}
                              alt={item.name_ao}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                              sizes="48px"
                              quality={70}
                            />
                            <div
                              className="absolute inset-0"
                              style={{
                                background:
                                  "linear-gradient(to top, rgba(10,10,10,0.2) 0%, transparent 60%)",
                              }}
                            />
                          </>
                        ) : (
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${category.colorHex}15 0%, ${category.colorHex}08 50%, ${category.colorHex}03 100%)`,
                            }}
                          >
                            <span className="text-lg">{category.icon}</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-body font-medium text-primary truncate group-hover:text-ember transition-colors duration-200">
                            {item.name_ao}
                          </h4>
                          {item.featured && (
                            <span className="text-amber text-xs flex-shrink-0">★</span>
                          )}
                        </div>
                        <p className="text-xs font-body text-muted truncate">
                          {item.name_am}
                        </p>
                      </div>

                      {/* Price */}
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-body font-semibold flex-shrink-0"
                        style={{
                          backgroundColor: `${category.colorHex}12`,
                          border: `1px solid ${category.colorHex}25`,
                          color: category.colorHex,
                        }}
                      >
                        {item.price} ETB
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom glow on hover */}
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.colorHex}60, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}
