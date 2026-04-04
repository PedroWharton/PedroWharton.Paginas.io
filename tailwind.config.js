/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        bg: '#0A0909',
        surface: '#131210',
        'text-primary': '#EDE8E1',
        'text-muted': '#7A7670',
        accent: '#C8A97E',
        border: '#1E1C19',
      },
    },
  },
  plugins: [],
};
