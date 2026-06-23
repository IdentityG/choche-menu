"use client";

import { useState, useMemo, useCallback } from "react";
import { RESTAURANT_DATA } from "@/data/menu";
import type { FilterState, MenuItem, MenuCategory, CategoryId } from "@/types/menu";
import type { SortOption } from "@/components/menu/SortControl";

/* ─── Enriched item with category metadata ─────────────── */
export interface EnrichedMenuItem extends MenuItem {
  categoryId: CategoryId;
  categoryColor: string;
  categoryColorHex: string;
  categoryIcon: string;
  categoryName: string;
  uniqueKey: string;
}

/* ─── Hook Return Type ─────────────────────────────────── */
interface UseMenuFilterReturn {
  activeFilter: FilterState;
  setActiveFilter: (filter: FilterState) => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  filteredItems: EnrichedMenuItem[];
  itemCount: number;
  activeCategory: MenuCategory | null;
  allCategories: MenuCategory[];
}

/* ─── Main Hook ────────────────────────────────────────── */
export function useMenuFilter(): UseMenuFilterReturn {
  const [activeFilter, setActiveFilter] = useState<FilterState>("all");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const allCategories = RESTAURANT_DATA.categories;

  /* ── Build enriched flat list ────────────────────── */
  const allItems = useMemo<EnrichedMenuItem[]>(() => {
    return RESTAURANT_DATA.categories.flatMap((cat) =>
      cat.items.map((item, index) => ({
        ...item,
        categoryId: cat.id,
        categoryColor: cat.color,
        categoryColorHex: cat.colorHex,
        categoryIcon: cat.icon,
        categoryName: cat.category.split(" | ")[0],
        uniqueKey: `${cat.id}-${index}-${item.name_ao
          .replace(/\s+/g, "-")
          .toLowerCase()}`,
      }))
    );
  }, []);

  /* ── Apply filter ────────────────────────────────── */
  const filteredItems = useMemo(() => {
    let items =
      activeFilter === "all"
        ? [...allItems]
        : allItems.filter((item) => item.categoryId === activeFilter);

    /* ── Apply sort ──────────────────────────────── */
    switch (sortOption) {
      case "price-asc":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        items.sort((a, b) => b.price - a.price);
        break;
      case "default":
      default:
        // In "All" view, keep category grouping with featured first within each
        if (activeFilter === "all") {
          // Already grouped by category order from data
          // Just bring featured items first within their category
          const categoryOrder = RESTAURANT_DATA.categories.map((c) => c.id);
          items.sort((a, b) => {
            const catA = categoryOrder.indexOf(a.categoryId);
            const catB = categoryOrder.indexOf(b.categoryId);
            if (catA !== catB) return catA - catB;
            // Within same category, featured first
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
          });
        } else {
          // Single category: featured first
          items.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
          });
        }
        break;
    }

    return items;
  }, [activeFilter, sortOption, allItems]);

  /* ── Active category data ────────────────────────── */
  const activeCategory = useMemo(() => {
    if (activeFilter === "all") return null;
    return allCategories.find((c) => c.id === activeFilter) || null;
  }, [activeFilter, allCategories]);

  /* ── Handle filter change with scroll ────────────── */
  const handleFilterChange = useCallback((filter: FilterState) => {
    setActiveFilter(filter);

    // Reset sort on category change
    setSortOption("default");

    // Smooth scroll to grid
    requestAnimationFrame(() => {
      const menuGrid = document.getElementById("menu-grid");
      if (menuGrid) {
        const yOffset = -160;
        const y =
          menuGrid.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  }, []);

  return {
    activeFilter,
    setActiveFilter: handleFilterChange,
    sortOption,
    setSortOption,
    filteredItems,
    itemCount: filteredItems.length,
    activeCategory,
    allCategories,
  };
}