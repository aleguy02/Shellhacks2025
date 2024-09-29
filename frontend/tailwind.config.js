/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "Coral-Pink": "#FF9380",
        "Purpleish-Pink": "#FFA2CC",
        "Magenta-Pink": "#FC618A",
      },
      fontFamily: {
        nunmed: ["NunitoMedium"],
        nunlite: ["NunitoLight"],
        nunblack: ["NunitoBlack"],
        popmed: ["PoppinsMedium"],
        popbold: ["PoppinsBold"],
      },
    },
  },
  plugins: [],
};
