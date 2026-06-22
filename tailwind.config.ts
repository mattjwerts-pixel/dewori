import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Dewori Skin brand colors
      colors: {
        cream: "#FAF7F2",
        rose: {
          DEFAULT: "#D4A5A5",
          dark: "#C08F8F",
          light: "#E8CECE",
        },
        charcoal: "#2C2C2C",
        "warm-gray": "#8C8C8C",
        "warm-gray-light": "#F0EDEA",
      },
      // Brand fonts
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      // Consistent spacing scale used throughout
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        88: "22rem",
        128: "32rem",
      },
      // Consistent border radius
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      // Max widths for page containers
      maxWidth: {
        "8xl": "88rem",
      },
      // Smooth transitions
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
