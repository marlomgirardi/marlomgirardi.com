const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
    },
    colors: {
      ...colors,
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
    },
  },
  plugins: [],
};
