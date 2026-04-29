/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./assets/js/**/*.js",
  ],
  darkMode: "class",
  // Safelist classes that may be applied dynamically by Alpine x-bind / x-class
  // expressions and so wouldn't be detected by static scanning.
  safelist: [
    "dark",
    "light",
    "presentation-mode",
    "slide-active",
    "rtl",
    "ltr",
    "hidden",
    { pattern: /^bg-(flex|hazalyze|petro|brand|compliance)-/ },
    { pattern: /^text-(flex|hazalyze|petro|brand|compliance)-/ },
    { pattern: /^border-(flex|hazalyze|petro|brand|compliance)-/ },
  ],
  theme: {
    extend: {
      colors: {
        flex:       { orange: "#F6A000", amber: "#FFB800", gold: "#D4A000" },
        hazalyze:   { primary: "#00D4AA", glow: "#00FFD4", dark: "#003D32" },
        petro:      { deep: "#080C14", navy: "#0C1524", slate: "#141E30", steel: "#1E2D42" },
        compliance: { sbc: "#3B82F6", nfpa: "#EF4444", civil: "#F59E0B", muni: "#8B5CF6" },
        brand:      { orange: "#F6A000", dark: "#080C14", card: "#0F172A", mckinsey: "#051C2C", grey: "#8A8A8A" },
      },
      fontFamily: {
        sans: ["Outfit", "Plus Jakarta Sans", "IBM Plex Sans Arabic", "Noto Kufi Arabic", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
