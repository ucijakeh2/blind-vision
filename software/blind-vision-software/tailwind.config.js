/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        linkBlue: "#0059FF",
        buttonBlue: "#2AB2DB",
        buttonGreen: "#0D9276",
        disconnectedRed: "#FF0400",
        connectedGreen: "#0DFF00"
      }
    },
  },
  plugins: [],
}

