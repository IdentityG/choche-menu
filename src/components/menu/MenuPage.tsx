"use client";

import { useState, useCallback } from "react";
import HeroHeader from "@/components/menu/HeroHeader";
import Navbar from "@/components/menu/Navbar";
import MenuSection from "@/components/menu/MenuSection";
import DishModal from "@/components/menu/DishModal";
import Footer from "@/components/menu/Footer";
import type { EnrichedMenuItem } from "@/hooks/useMenuFilter";

export default function MenuPage() {
  const [selectedItem, setSelectedItem] = useState<EnrichedMenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ── Open modal ─────────────────────────────────── */
  const handleItemClick = useCallback((item: EnrichedMenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  /* ── Close modal ────────────────────────────────── */
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 400);
  }, []);

  return (
    <main className="relative min-h-screen bg-void">
      {/* ── Sticky Navbar ─────────────────────────── */}
      <Navbar />

      {/* ── Hero Header with Parallax ─────────────── */}
      <HeroHeader />

      {/* ── Menu Section (Filter + Grid) ──────────── */}
      <MenuSection onItemClick={handleItemClick} />

      {/* ── Footer ────────────────────────────────── */}
      <Footer />

      {/* ── Dish Detail Modal + AR Viewer ─────────── */}
      <DishModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}