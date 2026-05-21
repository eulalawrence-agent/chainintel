/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dark: { bg: '#0d1117', card: '#161b22', border: '#30363d', text: '#c9d1d9' },
        accent: { blue: '#58a6ff', green: '#3fb950', red: '#f85149', purple: '#bc8cff', yellow: '#d29922', orange: '#db6d28' }
      }
    },
  },
  plugins: [],
}
