/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';

const config = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      minHeight: {
        "view": ["100vh", "100dvh"],
      },
      height: {
        "view": ["100vh", "100dvh"],
      },
    },
  },
  plugins: [
    typography,
  ],
}

export default config;

