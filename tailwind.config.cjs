/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        turquoise: "#07dfe0",
        tomato: "#ff5858",
        goldenPoppy: "#f7bf0f",
        slateBlue: "#9c5cff",
        royalBlue: "#4368ff",
        razzleRose: "#fd4ec7",
        carrotOrange: "#fa931a",
        malachite: "#17de74",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(turquoise|tomato|goldenPoppy|slateBlue|royalBlue|razzleRose|carrotOrange|malachite)/,
    },
  ],
};

module.exports = config;
