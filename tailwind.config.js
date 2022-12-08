/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  // eslint-disable-next-line no-undef

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        helventica: ["HELVENTICA", "sans-serif"],
      },
      backgroundImage: {
        interstellar: "url('/src/assets/landing/interstellar.png')",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/forms"),
    // ...
  ],
};
