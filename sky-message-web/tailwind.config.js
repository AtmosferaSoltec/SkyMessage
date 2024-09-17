/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        colorBlack: "#292929",
        colorBlack2: "#3d3d3d",
        colorGrey: "#EFEFEF",
        colorGreen: "#2AD400",
      },
    },
  },
  plugins: [],
};
