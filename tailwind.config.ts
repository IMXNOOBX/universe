import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        min: "0.600rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'mc': '350px',
        'xs': '390px',
        '2lg': '1200px',
      },
      rotate: {
        'full': "360deg",
      },
      transitionProperty: {
        'width': 'width',
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-out 1s',
        show: 'show 1s ease-in-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        screen: {
          '0%': { opacity: '0' },
          '30%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      }
    },
  },
  plugins: [
  ],
};
export default config;
