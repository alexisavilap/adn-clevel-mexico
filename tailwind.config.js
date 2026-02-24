/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand primario — amarillo Simón
        yellow: '#f8d43d',
        'yellow-dark': '#e0bc1e',

        // Fondos oscuros — navy Simón
        navy: '#21325e',
        'navy-deep': '#162244',

        // Secundario — azul Simón
        blue: '#4562e9',
        'blue-light': '#c5e2ff',

        // Acento diferenciador — pink Simón
        pink: '#eb2060',

        // Fondos claros
        offwhite: '#f4f7ff',
        sky: '#c5e2ff',

        // Texto apagado
        muted: '#6b7fa3',

        // Negro puro para secciones oscuras
        'true-black': '#0a0a0a',

        // Aliases de compatibilidad usados en componentes existentes
        gold: '#f8d43d',
        'gold-light': '#4562e9',
        ink: '#21325e',
        'off-white': '#ffffff',
        cream: '#c5e2ff',
      },
      fontFamily: {
        display: ['Satoshi', 'sans-serif'],
        sans: ['Satoshi', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
        tanker: ['Tanker', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
