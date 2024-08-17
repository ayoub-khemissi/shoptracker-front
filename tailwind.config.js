/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
          dark: "#0BFF0B",
          DEFAULT: "#0BFF0B",
          light: "#0BFF0B",
        },
        warning: {
          dark: "#FFCC00",
          DEFAULT: "#FFCC00",
          light: "#FFCC00",
        },
        error: {
          dark: "#FF0B0B",
          DEFAULT: "#FF0B0B",
          light: "#FF0B0B",
        },
      },
    },
  },
  plugins: [],
};
