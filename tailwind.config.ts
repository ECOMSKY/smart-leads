import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#060A09",
          card: "#0F1B17",
          lighter: "#152420",
          border: "rgba(16,185,129,0.20)",
        },
        emerald: {
          DEFAULT: "#10B981",
          bright: "#34D399",
          dim: "rgba(16,185,129,0.10)",
          glow: "rgba(16,185,129,0.25)",
        },
        txt: {
          DEFAULT: "#F1F5F9",
          muted: "#64748B",
          dim: "#475569",
        },
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
