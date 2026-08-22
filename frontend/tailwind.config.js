/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rakshak: {
          dark: '#0f172a',
          card: '#1e293b',
          accent: '#38bdf8',
          saffron: '#f97316',
          emerald: '#10b981',
          crimson: '#ef4444',
          amber: '#f59e0b'
        }
      }
    },
  },
  plugins: [],
}