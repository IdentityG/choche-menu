"use client";

import { memo, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { springs } from "@/lib/motion";
import { cn } from "@/lib/utils";
import DishCard, { getCardVariant } from "@/components/menu/DishCard";
import type { EnrichedMenuItem } from "@/hooks/useMenuFilter";

/* ─── Props ────────────────────────────────────────────── */
interface MenuGridProps {
  items: EnrichedMenuItem[];
  onItemClick: (item: EnrichedMenuItem) => void;
}

/* ─── Category Section Header ──────────────────────────── */
function CategorySectionHeader({
  icon,
  name,
  colorHex,
  count,
}: {
  icon: string;
  name: string;
  colorHex: string;
  count: number;
}) {
  return (
    <motion.div
      className="col-span-1 sm:col-span-2 flex items-center gap-3 py-3 mt-4 first:mt-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={springs.gentle}
    >
      {/* Color line */}
      <div
        className="w-8 h-0.5 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${colorHex}, transparent)`,
        }}
      />

      {/* Icon + Name */}
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span
          className="text-sm font-body font-semibold tracking-wide"
          style={{ color: colorHex }}
        >
          {name}
        </span>
      </div>

      {/* Count pill */}
      <span className="text-2xs font-body text-dim px-2 py-0.5 rounded-full bg-surface border border-border">
        {count}
      </span>

      {/* Expanding line */}
      <div
        className="flex-1 h-px"
        style={{
          background: `linear-gradient(90deg, ${colorHex}20, transparent)`,
        }}
      />
    </motion.div>
  );
}

/* ─── Group items by category for "All" view ───────────── */
function useGroupedItems(items: EnrichedMenuItem[], isAllView: boolean) {
  return useMemo(() => {
    if (!isAllView) return null;

    const groups: Map<
      string,
      {
        icon: string;
        name: string;
        colorHex: string;
        items: EnrichedMenuItem[];
      }
    > = new Map();

    items.forEach((item) => {
      if (!groups.has(item.categoryId)) {
        groups.set(item.categoryId, {
          icon: item.categoryIcon,
          name: item.categoryName,
          colorHex: item.categoryColorHex,
          items: [],
        });
      }
      groups.get(item.categoryId)!.items.push(item);
    });

    return groups;
  }, [items, isAllView]);
}

/* ═════════════════════════════════════════════════════════
   MENU GRID — Main export
   ═════════════════════════════════════════════════════════ */
function MenuGrid({ items, onItemClick }: MenuGridProps) {
  const isAllView = items.length > 10;
  const groupedItems = useGroupedItems(items, isAllView);

  return (
    <div id="menu-grid" className="relative">
      <LayoutGroup>
        {/* ── Grouped View (All categories) ─────────── */}
        {isAllView && groupedItems ? (
          <div className="space-y-2">
            {Array.from(groupedItems.entries()).map(
              ([categoryId, group]) => (
                <div key={categoryId}>
                  {/* Category Section Header */}
                  <CategorySectionHeader
                    icon={group.icon}
                    name={group.name}
                    colorHex={group.colorHex}
                    count={group.items.length}
                  />

                  {/* Cards Grid */}
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
                    layout
                    transition={springs.gentle}
                  >
                    <AnimatePresence mode="popLayout">
                      {group.items.map((item, index) => (
                        <motion.div
                          key={item.uniqueKey}
                          layout
                          layoutId={item.uniqueKey}
                          initial={{ opacity: 0, y: 20, scale: 0.96 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              ...springs.gentle,
                              delay: Math.min(index * 0.03, 0.3),
                            },
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.94,
                            transition: { duration: 0.15 },
                          }}
                          className={cn(
                            getCardVariant(item, index) === "featured"
                              ? "col-span-1 sm:col-span-2"
                              : "col-span-1"
                          )}
                        >
                          <DishCard
                            item={item}
                            variant={getCardVariant(item, index)}
                            index={index}
                            onClick={onItemClick}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )
            )}
          </div>
        ) : (
          /* ── Flat View (Single category) ─────────── */
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            layout
            transition={springs.gentle}
          >
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.uniqueKey}
                  layout
                  layoutId={item.uniqueKey}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      ...springs.gentle,
                      delay: Math.min(index * 0.04, 0.4),
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.94,
                    transition: { duration: 0.15 },
                  }}
                  className={cn(
                    getCardVariant(item, index) === "featured"
                      ? "col-span-1 sm:col-span-2"
                      : "col-span-1"
                  )}
                >
                  <DishCard
                    item={item}
                    variant={getCardVariant(item, index)}
                    index={index}
                    onClick={onItemClick}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </LayoutGroup>

      {/* ── Empty State ───────────────────────────── */}
      <AnimatePresence>
        {items.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={springs.gentle}
          >
            <motion.span
              className="text-5xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🍽️
            </motion.span>
            <p className="text-muted text-base font-body mb-1">
              No items found
            </p>
            <p className="text-dim text-sm font-body">
              Try selecting a different category
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Grid bottom fade ──────────────────────── */}
      <div className="mt-8 flex justify-center">
        <motion.div
          className="flex items-center gap-2 text-dim text-xs font-body"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div
            className="w-8 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-border))",
            }}
          />
          <span>End of menu</span>
          <div
            className="w-8 h-px"
            style={{
              background:
                "linear-gradient(90deg, var(--color-border), transparent)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default memo(MenuGrid);