import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.6875rem", // 11px
        "2.5xl": "1.75rem",
        "3.5xl": "2.125rem",
        "4.5xl": "2.75rem",
        "6.5xl": "4.25rem",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        xyrm: {
          green: {
            deep: "#009876",
            primary: "#009876",
            light: "#00C298",
            emerald: "#00D6A7",
          },
          gold: {
            DEFAULT: "#D4AF37",
            dark: "#B8972E",
            light: "#F3E5AB",
          },
          slate: {
            50: "#f8fafc",
            100: "#f1f5f9",
            200: "#e2e8f0",
            800: "#1e293b",
            900: "#0f172a",
          }
        }
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out forwards",
        slideUp: "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
