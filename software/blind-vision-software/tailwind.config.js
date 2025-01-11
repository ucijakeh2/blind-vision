/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#40A2E3",
        transitionBlueGreen: "#81DCD4",
        primaryGreen: "#0D9276",
      }
    },
  },
  plugins: [],
}

