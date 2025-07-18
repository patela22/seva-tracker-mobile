/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx',
    './components/**/*.tsx',
    './screens/**/*.tsx',
    './utils/**/*.tsx'
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '10px'
      }
    },
    colors: {
      'sevatracker-white': '#FFFFFF',
      'sevatracker-black': '#000000',
      'sevatracker-gray': '#BEBEBE',
      'sevatracker-lightgray': '#D9D9D9',
      'sevatracker-lightergray': '#0000000D',
      'sevatracker-lightblue': '#DDE6F6',
      'sevatracker-blue': '#1A56C4',
      'sevatracker-green': '#4DB8A6',
      'sevatracker-coral': '#FF6258',
      'sevatracker-yellow': '#FFD910',
      'sevatracker-purple': '#990099',
      'sevatracker-pink': '#FC2C51',
      'sevatracker-orange': '#FF8310'
    },

    fontFamily: {
      'sevatracker-manrope': ['Manrope_400Regular'],
      'sevatracker-manrope-semibold': ['Manrope_600SemiBold'],
      'sevatracker-manrope-bold': ['Manrope_700Bold'],
      'sevatracker-manrope-extrabold': ['Manrope_800ExtraBold'],
      'sevatracker-montserrat': ['Montserrat_400Regular'],
      'sevatracker-montserrat-semibold': ['Montserrat_600SemiBold'],
      'sevatracker-montserrat-bold': ['Montserrat_700Bold']
    }
  },
  plugins: []
};
