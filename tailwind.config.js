/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';
import scrollbar from 'tailwind-scrollbar';

const config = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      minHeight: {
        "view": ["100vh", "100dvh", "100%"],
      },
      height: {
        "view": ["100vh", "100dvh", "100%"],
      },
    },
  },
  plugins: [
    typography,
    scrollbar,
  ],
}

export default config;

