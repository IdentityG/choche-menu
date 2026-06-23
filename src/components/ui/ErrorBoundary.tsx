"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { springs } from "@/lib/motion";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen bg-void flex items-center justify-center p-6">
          <motion.div
            className="max-w-sm w-full text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.gentle}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl bg-category-main/10 border border-category-main/20
                         flex items-center justify-center mx-auto"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <AlertTriangle
                className="w-8 h-8 text-category-main"
                strokeWidth={1.5}
              />
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-xl font-display text-primary">
                Something went wrong
              </h2>
              <p className="text-sm font-body text-muted">
                We encountered an unexpected error. Please try again.
              </p>
            </div>

            <motion.button
              onClick={this.handleRetry}
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

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="text-left mt-4">
                <summary className="text-xs text-dim cursor-pointer">
                  Error details
                </summary>
                <pre className="mt-2 p-3 rounded-xl bg-elevated border border-border text-xs text-category-main overflow-auto">
                  {this.state.error.message}
                  {"\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}