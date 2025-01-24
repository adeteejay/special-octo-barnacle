/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2A5C8B',
        secondary: '#4CAF50',
        neutral: '#f5f5f5',
        'text-primary': '#2D3436',
        'text-secondary': '#636E72',
        accent: '#FF6B6B'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
};