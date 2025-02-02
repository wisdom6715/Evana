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
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      keyframes: {
        'bg-theme': {
          '0%, 100%': { backgroundColor: 'white' },
          '50%': { backgroundColor: '#e4e7e6' },
        },
      },
      animation: {
        'bg-theme': 'bg-theme 2s infinite alternate',
      },
    },
  },
  plugins: [],
} satisfies Config;
