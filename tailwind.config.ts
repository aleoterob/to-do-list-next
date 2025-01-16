import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        grisInput: "#4F4F4F",
        azulJuztina: "#0A101A",
        verdeAle: "#47cca5",
        rojoTodoTask: "#EB4846",
        rojoTodoTaskClaro: "#C93E3C",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      width: {
        px600: "600px",
        px700: "700px",
      },
    },
  },
  plugins: [],
} satisfies Config;
