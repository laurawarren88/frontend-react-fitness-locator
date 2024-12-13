/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        roborto: ['Roborto', 'serif'],
      },
    colors: {
      darkGray: '#1A1A1A',
      lightGray: '#D4D4D4',
      deepRed: '#B22222',
      deepBlue: '#002147',
      brightRed: '#FF2400',
      royalBlue: '#4169E1',
      softWhite: '#F9F9F9',
      },
    },
  },
  plugins: [],
}