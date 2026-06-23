import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Color System ───────────────────────────────────────
      colors: {
        // Backgrounds
        void:    "#0A0A0A",
        surface: "#141414",
        elevated:"#1E1E1E",
        border:  "#2A2A2A",

        // Accents
        ember:   "#E8612A",
        amber:   "#F2A93B",
        glow:    "#FF6B35",

        // Text
        primary: "#F5F0E8",
        muted:   "#8A8480",
        dim:     "#4A4540",

        // Category palette
        category: {
          fastfood:   "#E8612A",
          cold:       "#3BA8C4",
          hot:        "#C4703B",
          juice:      "#5CB85C",
          breakfast:  "#C4A83B",
          main:       "#C43B3B",
        },
      },

      // ─── Typography ─────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body:    ["var(--font-inter)",    "system-ui", "sans-serif"],
      },

      fontSize: {
        "2xs": ["10px", { lineHeight: "14px" }],
        xs:    ["12px", { lineHeight: "16px" }],
        sm:    ["14px", { lineHeight: "20px" }],
        base:  ["16px", { lineHeight: "24px" }],
        lg:    ["18px", { lineHeight: "28px" }],
        xl:    ["24px", { lineHeight: "32px" }],
        "2xl": ["32px", { lineHeight: "40px" }],
        "3xl": ["48px", { lineHeight: "56px" }],
        "4xl": ["64px", { lineHeight: "72px" }],
        "5xl": ["80px", { lineHeight: "88px" }],
      },

      letterSpacing: {
        tightest: "0em",
        tight:    "0em",
        normal:   "0em",
        wide:     "0.02em",
        wider:    "0.05em",
        widest:   "0.1em",
      },

      // ─── Spacing ─────────────────────────────────────────────
      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "30":  "7.5rem",
        "34":  "8.5rem",
        "100": "25rem",
        "120": "30rem",
      },

      // ─── Border Radius ───────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ─── Shadows ─────────────────────────────────────────────
      boxShadow: {
        "ember-sm": "0 0 12px 0 rgba(232, 97, 42, 0.25)",
        "ember-md": "0 0 24px 0 rgba(232, 97, 42, 0.35)",
        "ember-lg": "0 0 48px 0 rgba(232, 97, 42, 0.45)",
        "amber-glow":"0 0 32px 0 rgba(242, 169, 59, 0.3)",
        "card":     "0 1px 3px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)",
        "card-hover":"0 4px 6px rgba(0,0,0,0.5), 0 20px 48px rgba(0,0,0,0.6)",
        "modal":    "0 25px 80px rgba(0,0,0,0.8)",
        "inner-ember":"inset 0 1px 0 rgba(232, 97, 42, 0.15)",
      },

      // ─── Backgrounds ─────────────────────────────────────────
      backgroundImage: {
        "ember-radial":
          "radial-gradient(ellipse at center, rgba(232,97,42,0.15) 0%, transparent 70%)",
        "amber-radial":
          "radial-gradient(ellipse at center, rgba(242,169,59,0.1) 0%, transparent 60%)",
        "card-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)",
        "grid-lines":
          "linear-gradient(rgba(42,42,42,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,42,0.4) 1px, transparent 1px)",
      },

      backgroundSize: {
        "grid": "40px 40px",
      },

      // ─── Keyframes ───────────────────────────────────────────
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "pulse-ember": {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.5" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-8px)" },
        },
        "grain": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%":       { transform: "translate(-2%, -3%)" },
          "20%":       { transform: "translate(3%, 2%)" },
          "30%":       { transform: "translate(-1%, 4%)" },
          "40%":       { transform: "translate(4%, -1%)" },
          "50%":       { transform: "translate(-3%, 3%)" },
          "60%":       { transform: "translate(2%, -4%)" },
          "70%":       { transform: "translate(-4%, 1%)" },
          "80%":       { transform: "translate(1%, -2%)" },
          "90%":       { transform: "translate(3%, 4%)" },
        },
        "wave": {
          "0%":   { d: "path('M0,60 C150,120 350,0 500,60 L500,200 L0,200 Z')" },
          "50%":  { d: "path('M0,40 C200,100 300,20 500,80 L500,200 L0,200 Z')" },
          "100%": { d: "path('M0,60 C150,120 350,0 500,60 L500,200 L0,200 Z')" },
        },
      },

      animation: {
        shimmer:       "shimmer 2.5s linear infinite",
        "pulse-ember": "pulse-ember 2s ease-in-out infinite",
        float:         "float 3s ease-in-out infinite",
        grain:         "grain 0.8s steps(1) infinite",
      },

      // ─── Backdrop Blur ───────────────────────────────────────
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },

      // ─── Z-Index Scale ───────────────────────────────────────
      zIndex: {
        "splash":  "1000",
        "modal":   "900",
        "overlay": "800",
        "header":  "700",
        "filter":  "600",
        "card":    "10",
        "grain":   "999",
      },
    },
  },
  plugins: [],
};

export default config;