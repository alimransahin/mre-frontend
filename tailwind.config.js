import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FAFFFF",
            foreground: "#11181C",
            deepbg: "#25FFFF",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
          },
        },
        dark: {
          colors: {
            background: "#000000",
            deepbg: "#000000",
            foreground: "#ECEDEE",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
            "bg-default": "#000000",
          },
        },
      },
    }),
  ],
};
