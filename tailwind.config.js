/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D191D",
        secondary: "#f6f7f7",
        accent: "#cbdaeb",
        // danger: "#EF4444",
        // light: "#F9FAFB",
        // dark: "#1F2937",
      },
    },
  },
  plugins: [],
};
