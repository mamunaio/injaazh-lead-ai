import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#1F2937",
        input: "#1F2937",
        ring: "#4F46E5",
        background: "#0D1117",
        foreground: "#F9FAFB",
        primary: {
          DEFAULT: "#4F46E5",
          foreground: "#F9FAFB",
          hover: "#3730A3",
        },
        secondary: {
          DEFAULT: "#1C2333",
          foreground: "#9CA3AF",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#F9FAFB",
        },
        muted: {
          DEFAULT: "#1E2D45",
          foreground: "#6B7280",
        },
        accent: {
          DEFAULT: "#1A2235",
          foreground: "#F9FAFB",
        },
        popover: {
          DEFAULT: "#111827",
          foreground: "#F9FAFB",
        },
        card: {
          DEFAULT: "#111827",
          foreground: "#F9FAFB",
        },
        green: {
          DEFAULT: "#10B981",
          subtle: "#052E16",
        },
        amber: {
          DEFAULT: "#F59E0B",
          subtle: "#2D1B00",
        },
        red: {
          DEFAULT: "#EF4444",
          subtle: "#1F0707",
        },
        blue: {
          DEFAULT: "#3B82F6",
          subtle: "#0A1628",
        },
        violet: {
          DEFAULT: "#8B5CF6",
          subtle: "#1A0D3D",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "6px",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-jetbrains-mono)"],
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
export default config;

