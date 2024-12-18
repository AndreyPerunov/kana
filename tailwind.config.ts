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
        "level-3": "#FFFF00",
        "level-4": "#ADFF2F",
        "level-5": "#00FF00"
      }
    }
  },
  plugins: []
} satisfies Config
