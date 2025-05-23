/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3A6D8C',
        secondary: '#6A9AB0',
        accent: '#EAD8B1',
        text: '#ffffff',
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}
