"use client";
import Image from "next/image";
import { useEffect, useCallback, useState } from "react";
import {
  motion,
  AnimatePresence,
  useDragControls,
  useMotionValue,
  useTransform,
  useAnimate,
  type PanInfo,
} from "framer-motion";
import {
  X,
  Phone,
  Eye,
  Sparkles,
  Tag,
  ChefHat,
  CheckCircle2,
  Smartphone,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion";
import { RESTAURANT_DATA } from "@/data/menu";
import type { EnrichedMenuItem } from "@/hooks/useMenuFilter";
import ARViewer from "@/components/ar/ARViewer";

/* ─── Props ────────────────────────────────────────────── */
interface DishModalProps {
  item: EnrichedMenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

/* ─── Overlay Variants ─────────────────────────────────── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

/* ─── Modal Panel Variants ─────────────────────────────── */
const panelVariants = {
  hidden: {
    y: "100%",
    opacity: 0.8,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
  exit: {
    y: "100%",
    opacity: 0.5,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 40,
      mass: 0.5,
    },
  },
};

/* ─── Content Stagger ──────────────────────────────────── */
const contentStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const contentItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.gentle,
  },
};

/* ═════════════════════════════════════════════════════════
   DISH MODAL — Main Component
   ═════════════════════════════════════════════════════════ */
export default function DishModal({
  item,
  isOpen,
  onClose,
}: DishModalProps) {
  const [scope, animate] = useAnimate();
  const dragControls = useDragControls();
  const dragY = useMotionValue(0);
  const panelOpacity = useTransform(dragY, [0, 300], [1, 0.5]);
  const overlayOpacityFromDrag = useTransform(dragY, [0, 300], [1, 0]);

  // AR Viewer state
  const [isAROpen, setIsAROpen] = useState(false);

  /* ── Lock body scroll ──────────────────────────── */
  useEffect(() => {
    if (isOpen && !isAROpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, isAROpen]);

  /* ── ESC key handler ───────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isAROpen) {
          setIsAROpen(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, isAROpen, onClose]);

  /* ── Drag to dismiss ───────────────────────────── */
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.y > 100 || info.velocity.y > 500) {
        onClose();
      } else {
        animate(scope.current, { y: 0 }, springs.snappy);
      }
    },
    [onClose, animate, scope]
  );

  /* ── AR handler ────────────────────────────────── */
  const handleARView = useCallback(() => {
    setIsAROpen(true);
  }, []);

  const handleARClose = useCallback(() => {
    setIsAROpen(false);
  }, []);

  if (!item) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && !isAROpen && (
          <div className="fixed inset-0 z-modal" role="dialog" aria-modal="true">
            {/* ── Backdrop ──────────────────────────── */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={onClose}
              style={{ opacity: overlayOpacityFromDrag }}
            />

            {/* ── Panel ─────────────────────────────── */}
            <motion.div
              ref={scope}
              className={cn(
                "absolute bottom-0 left-0 right-0",
                "max-h-[92vh] overflow-y-auto no-scrollbar",
                "bg-surface rounded-t-3xl",
                "border-t border-x border-white/[0.06]",
                "shadow-modal"
              )}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ y: dragY, opacity: panelOpacity }}
              drag="y"
              dragControls={dragControls}
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              {/* ── Drag Handle ─────────────────────── */}
              <div
                className="sticky top-0 z-30 pt-3 pb-2 flex justify-center cursor-grab active:cursor-grabbing bg-surface rounded-t-3xl"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <div className="w-10 h-1 rounded-full bg-border" />
              </div>

              {/* ── Close Button ─────────────────────── */}
              <motion.button
                className={cn(
                  "absolute top-4 right-4 z-30",
                  "w-9 h-9 rounded-full flex items-center justify-center",
                  "glass border border-white/[0.06]",
                  "hover:bg-white/[0.08] transition-colors duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                )}
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={springs.snappy}
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-muted" strokeWidth={2} />
              </motion.button>

              {/* ── Content ─────────────────────────── */}
              <motion.div
                className="px-5 pb-8"
                variants={contentStagger}
                initial="hidden"
                animate="visible"
              >
                {/* === Image / Preview Area === */}
                <motion.div variants={contentItem} className="mb-6">
                  <DishPreviewArea item={item} onARClick={handleARView} />
                </motion.div>

                {/* === Name Section === */}
                <motion.div variants={contentItem} className="mb-4">
                  <h2 className="text-2xl font-display font-bold text-primary leading-tight mb-1">
                    {item.name_ao}
                  </h2>
                  <p className="text-lg font-body text-muted leading-snug">
                    {item.name_am}
                  </p>
                </motion.div>

                {/* === Price === */}
                <motion.div variants={contentItem} className="mb-6">
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl",
                      "text-xl font-body font-bold",
                      "bg-ember/10 border border-ember/25 text-amber"
                    )}
                  >
                    <Tag className="w-4 h-4" strokeWidth={2} />
                    {item.price.toLocaleString()} ETB
                  </span>
                </motion.div>

                {/* === Divider === */}
                <motion.div
                  variants={contentItem}
                  className="w-full h-px mb-6"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--color-border), transparent)",
                  }}
                />

                {/* === Details Grid === */}
                <motion.div variants={contentItem} className="mb-6">
                  <DetailGrid item={item} />
                </motion.div>

                {/* === Divider === */}
                <motion.div
                  variants={contentItem}
                  className="w-full h-px mb-6"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--color-border), transparent)",
                  }}
                />

                {/* === AR Button === */}
                <motion.div variants={contentItem} className="mb-4">
                  <ARButtonPrimary item={item} onClick={handleARView} />
                </motion.div>

                {/* === Call to Order === */}
                <motion.div variants={contentItem}>
                  <CallToOrderButton phone={RESTAURANT_DATA.phone} />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── AR Viewer (layered above modal) ──────── */}
      {item && (
        <ARViewer
          item={item}
          isOpen={isAROpen}
          onClose={handleARClose}
        />
      )}
    </>
  );
}

/* ═════════════════════════════════════════════════════════
   DISH PREVIEW AREA
   ═════════════════════════════════════════════════════════ */
/* ═════════════════════════════════════════════════════════
   DISH PREVIEW AREA — Now with real image
   ═════════════════════════════════════════════════════════ */

function DishPreviewArea({
  item,
  onARClick,
}: {
  item: EnrichedMenuItem;
  onARClick: () => void;
}) {
  return (
    <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden">
      {/* Actual image or gradient fallback */}
      {item.image ? (
        <>
          <Image
            src={item.image}
            alt={`${item.name_ao} — ${item.name_am}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 600px"
            quality={80}
            priority
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.2) 40%, transparent 100%)",
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${item.categoryColorHex}12 0%, ${item.categoryColorHex}06 50%, ${item.categoryColorHex}02 100%)`,
          }}
        >
          <motion.span
            className="text-8xl"
            animate={{ y: [0, -6, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {item.categoryIcon}
          </motion.span>
        </div>
      )}

      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 55%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% center", "-200% center"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1,
        }}
      />

      {/* Category pill */}
      <div className="absolute top-3 left-3 z-20">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-body font-medium glass"
          style={{ color: item.categoryColorHex }}
        >
          <span className="text-sm">{item.categoryIcon}</span>
          {item.categoryName}
        </span>
      </div>

      {/* Featured badge */}
      {item.featured && (
        <div className="absolute top-3 right-3 z-20">
          <motion.span
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-2xs font-body font-semibold uppercase tracking-wider glass"
            style={{ color: "#F2A93B" }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-3 h-3" strokeWidth={2} />
            Popular
          </motion.span>
        </div>
      )}

      {/* 3D Preview button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onARClick();
        }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 cursor-pointer
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={springs.snappy}
      >
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-body font-medium glass-ember">
          <Eye className="w-3.5 h-3.5" strokeWidth={2} />
          View 3D Preview
        </span>
      </motion.button>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   DETAIL GRID
   ═════════════════════════════════════════════════════════ */
function DetailGrid({ item }: { item: EnrichedMenuItem }) {
  const details = [
    {
      icon: ChefHat,
      label: "Category",
      value: item.categoryName,
      color: item.categoryColorHex,
    },
    {
      icon: Tag,
      label: "Price",
      value: `${item.price} Birr`,
      color: "#F2A93B",
    },
    {
      icon: CheckCircle2,
      label: "Status",
      value: "Available",
      color: "#5CB85C",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {details.map((detail) => (
        <motion.div
          key={detail.label}
          className="flex flex-col items-center p-3.5 rounded-2xl bg-elevated border border-border text-center"
          whileHover={{ y: -2, scale: 1.02 }}
          transition={springs.snappy}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
            style={{
              backgroundColor: `${detail.color}12`,
              border: `1px solid ${detail.color}25`,
            }}
          >
            <detail.icon
              className="w-4 h-4"
              style={{ color: detail.color }}
              strokeWidth={2}
            />
          </div>
          <span className="text-2xs font-body text-dim uppercase tracking-wider mb-0.5">
            {detail.label}
          </span>
          <span
            className="text-sm font-body font-semibold"
            style={{ color: detail.color }}
          >
            {detail.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   AR BUTTON PRIMARY
   ═════════════════════════════════════════════════════════ */
function ARButtonPrimary({
  item,
  onClick,
}: {
  item: EnrichedMenuItem;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative w-full overflow-hidden",
        "flex items-center justify-center gap-3",
        "rounded-2xl",
        "font-body font-semibold text-base text-white",
        "cursor-pointer select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      )}
      style={{
        background:
          "linear-gradient(135deg, var(--color-ember), var(--color-amber))",
        boxShadow: "0 0 30px rgba(232, 97, 42, 0.35)",
        paddingTop: "18px",
        paddingBottom: "18px",
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 50px rgba(232, 97, 42, 0.5)",
      }}
      whileTap={{
        scale: 0.98,
        boxShadow: "0 0 20px rgba(232, 97, 42, 0.25)",
      }}
      transition={springs.snappy}
    >
      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% center", "-200% center"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2,
        }}
      />

      {/* Pulse border */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ border: "1px solid rgba(255,255,255,0.2)" }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <Eye className="w-5 h-5 relative z-10" strokeWidth={2} />
      <span className="relative z-10">View in AR</span>
      <span className="relative z-10 text-xs text-white/70 font-normal">
        — 3D on your table
      </span>
    </motion.button>
  );
}

/* ═════════════════════════════════════════════════════════
   CALL TO ORDER
   ═════════════════════════════════════════════════════════ */
function CallToOrderButton({ phone }: { phone: string }) {
  return (
    <motion.a
      href={`tel:${phone}`}
      className={cn(
        "flex items-center justify-center gap-3",
        "w-full py-4 rounded-2xl",
        "bg-elevated border border-border",
        "font-body font-medium text-sm text-muted",
        "hover:text-primary hover:border-white/10",
        "transition-colors duration-200",
        "cursor-pointer select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
      )}
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.99 }}
      transition={springs.snappy}
    >
      <Phone className="w-4 h-4 text-ember" strokeWidth={2} />
      <span>Call to Order</span>
      <span className="text-dim">—</span>
      <span className="text-primary font-semibold">{phone}</span>
    </motion.a>
  );
}