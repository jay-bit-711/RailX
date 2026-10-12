/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        railway: {
          blue: '#0F3460',
          navy: '#16213E',
          red: '#E94560',
          orange: '#FF7B54',
          gold: '#FFB26B',
          green: '#10B981',
          emerald: '#059669',
          lightBg: '#F8FAFC',
          card: '#FFFFFF'
        }
      }
    },
  },
  plugins: [],
}
