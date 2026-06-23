"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";
import { springs } from "@/lib/motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-6">
      <motion.div
        className="max-w-sm w-full text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springs.gentle}
      >
        <motion.span
          className="text-7xl block"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🍽️
        </motion.span>

        <div className="space-y-2">
          <h1 className="text-4xl font-display text-primary">404</h1>
          <p className="text-muted font-body text-base">
            This page doesn&apos;t exist on our menu
          </p>
        </div>

        <Link href="/menu">
          <motion.span
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl
                       bg-ember text-white font-body font-semibold text-sm
                       hover:bg-glow transition-colors duration-200
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={springs.snappy}
          >
            <Home className="w-4 h-4" strokeWidth={2} />
            Back to Menu
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}