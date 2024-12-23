/** @type {import('tailwindcss').Config} */
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
    require('@tailwindcss/typography'),
  ],
}

export default config;

