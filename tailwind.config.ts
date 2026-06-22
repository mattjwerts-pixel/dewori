import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Night palette
        midnight: "#0A0A15",
        dusk:     "#141320",
        surface:  "#1C1A2E",
        glow:     "#F5EDD8",
        amber: {
          DEFAULT: "#C9956A",
          light:   "#E8C49A",
          dark:    "#A87850",
        },
        // Legacy brand colors (kept for backward-compat)
        cream: "#FAF7F2",
        rose: {
          DEFAULT: "#D4A5A5",
          dark:    "#C08F8F",
          light:   "#E8CECE",
        },
        charcoal: "#2C2C2C",
        "warm-gray":       "#8C8C8C",
        "warm-gray-light": "#F0EDEA",
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        88: "22rem",
        128: "32rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      boxShadow: {
        glow:    "0 0 40px rgba(201, 149, 106, 0.15)",
        "glow-sm": "0 0 20px rgba(201, 149, 106, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
