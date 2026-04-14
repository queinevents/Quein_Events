import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: "#8B5CF6",
          blue: "#3B82F6",
          gold: "#F59E0B",
        },
        background: {
          dark: "#0A0A0A",
          darker: "#050505",
          card: "#1A1A1A",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A0A0A0",
          accent: "#8B5CF6",
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
