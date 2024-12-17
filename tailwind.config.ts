import type { Config } from "tailwindcss"

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#EDE7E0",
        neutral: "#CDCDC3",
        secondary: "#8DAC99",
        primary: "#519674"
      }
    }
  },
  plugins: []
} satisfies Config
