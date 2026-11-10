/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F6F4EE",
        ink: "#1B2A33",
        brand: "#4890D6",
        action: "#2F6DB5",
        actionDark: "#245A98",
        soft: "#E8F0FA",
        mute: "#5A6B75",
        line: "#D5DCE2",
        deep: "#0F2A2E",
      },
      fontFamily: {
        serif: ['"Source Serif 4"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
