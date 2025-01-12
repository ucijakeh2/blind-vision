/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        linkBlue: "#0059FF",
        buttonBlue: "#2AB2DB",
        buttonGreem: "#0D9276"
      }
    },
  },
  plugins: [],
}

