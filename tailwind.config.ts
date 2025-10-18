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
        main: "var(--main)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        dark: "var(--dark)",
        light: "var(--light)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: [
          "var(--font-cairo)",
          "var(--font-tajawal)",
          "system-ui",
          "sans-serif",
        ],
        cairo: ["var(--font-cairo)", "system-ui", "sans-serif"],
        tajawal: ["var(--font-tajawal)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
