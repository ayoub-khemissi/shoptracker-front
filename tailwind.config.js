const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#FFFAEE",
          DEFAULT: "#FFFAEE",
          light: "#00396D",
        },
        secondary: {
          dark: "#FFA217",
          DEFAULT: "#FFA217",
          light: "#FFA217",
        },
        tertiary: {
          dark: "#B78BFF",
          DEFAULT: "#B78BFF",
          light: "#B78BFF",
        },
        quaternary: {
          dark: "#0EA5E9",
          DEFAULT: "#0EA5E9",
          light: "#0EA5E9",
        },
        contrast: {
          dark: "#1E1E25",
          DEFAULT: "#1E1E25",
          light: "#FFFFFF",
        },
        "contrast-alt": {
          dark: "#232033",
          DEFAULT: "#232033",
          light: "#FFFFFF",
        },
        gray: {
          dark: "#A3A3A3",
          DEFAULT: "#A3A3A3",
          light: "#A0A0A0",
        },
        success: {
          dark: "#4ADE80",
          DEFAULT: "#4ADE80",
          light: "#4ADE80",
        },
        warning: {
          dark: "#FFCC00",
          DEFAULT: "#FFCC00",
          light: "#FFCC00",
        },
        error: {
          dark: "#DC2626",
          DEFAULT: "#DC2626",
          light: "#DC2626",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("tailwindcss-animate")],
};
