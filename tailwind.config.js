/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
        reprimary: '#0A3466',
        resecondary: '#014E86',
        reterseary: '#51A4A9',
        ecoprimary1: '#0049a8',
        ecoprimary2: '#ffd300',
        bgblack: '#333333',
        default1: '#e5e7eb',
        default2: '#d1d5db',
        default3: '#374151',
      },
    },
  },
  plugins: [],
}

