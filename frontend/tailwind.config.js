/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        navy: "#0f172a",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(139, 92, 246, 0.45)",
        "glow-cyan": "0 0 32px -8px rgba(34, 211, 238, 0.4)",
        card: "0 25px 50px -12px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #06b6d4 100%)",
        "gradient-text":
          "linear-gradient(90deg, #c4b5fd 0%, #60a5fa 45%, #22d3ee 100%)",
        "mesh":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 58, 237, 0.35), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(6, 182, 212, 0.2), transparent), radial-gradient(ellipse 50% 30% at 0% 100%, rgba(59, 130, 246, 0.25), transparent)",
      },
      animation: {
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.65" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
