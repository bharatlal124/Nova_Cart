import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e9ecff',
          500: '#3563e9',
          600: '#2748b8',
        },
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config;
