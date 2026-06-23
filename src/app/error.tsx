"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { springs } from "@/lib/motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-6">
      <motion.div
        className="max-w-sm w-full text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springs.gentle}
      >
        <div className="w-16 h-16 rounded-2xl bg-category-main/10 border border-category-main/20
                        flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-category-main" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-display text-primary">
            Something went wrong
          </h2>
          <p className="text-sm font-body text-muted">
            An unexpected error occurred. Please try again.
          </p>
        </div>

        <motion.button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl
                     bg-ember text-white font-body font-semibold text-sm
                     hover:bg-glow transition-colors duration-200
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={springs.snappy}
        >
          <RefreshCw className="w-4 h-4" strokeWidth={2} />
          Try Again
        </motion.button>
      </motion.div>
    </div>
  );
}