/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        itim: ["Itim", "cursive"],
        robotoSlab: ["Roboto Slab", "cursive"],
        bebasNeue: ["Bebas Neue", "cursive"],
      },
      colors: {
        "primary-orange": "#FB8815",
        "secondary-orange": "#F36414",
        foreground: "#4D4D4D",
        "primary-grey": "#EEEEEE",
        "secondary-grey": "#263238",
      },
    },
  },
};
