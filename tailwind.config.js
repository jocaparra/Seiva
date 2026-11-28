/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        // computador com pouca altura (notebooks): usado para as seções caberem em uma tela
        baixa: { raw: "(min-width: 1024px) and (max-height: 880px)" },
      },
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
        display: ["Inter", "system-ui", "sans-serif"], // títulos
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        halo: {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "80%, 100%": { transform: "scale(1.5)", opacity: "0" },
        },
      },
      animation: {
        halo: "halo 1.2s ease-out infinite",
      },
    },
  },
  plugins: [],
};
