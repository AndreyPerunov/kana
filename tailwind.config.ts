import type { Config } from "tailwindcss"

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#EDE7E0",
        neutral: "#CDCDC3",
        secondary: "#8DAC99",
        primary: "#519674",
        passive: "#8B8B8B",
        "level-1": "#ffffff",
        "level-2": "#FFFFE0",
        "level-3": "#FFE6A9",
        "level-4": "#D5ED9F",
        "level-5": "#A7D477",
        fail: "#D10363",
        success: "#04b34f"
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0"
          },
          "100%": {
            opacity: "1"
          }
        },
        fallDown: {
          "0%": {
            transform: "translateY(-100%)"
          },
          "100%": {
            transform: "translateY(0)"
          }
        }
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "fall-down": "fallDown 0.15s ease-in-out"
      }
    }
  },
  plugins: []
} satisfies Config
