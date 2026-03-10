module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Source Serif 4", "ui-serif", "serif"]
      },
      colors: {
        ink: "#1b1f2a",
        mint: "#2dd4bf",
        clay: "#f97316",
        sand: "#f7f2ea",
        ocean: "#0f766e"
      },
      boxShadow: {
        soft: "0 12px 40px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: []
};
