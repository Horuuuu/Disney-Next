module.exports = {
  mode: 'jit', //para que funcione las (propiedades) clases personalizadas
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      //imagen de fondo
      backgroundImage: (theme) => ({
        home: "url('/images/background.png')", //en la home page
      }),
    },
    fontFamily: {
      //fuentes globales para despues poder agregar en styles.css
      body: ['Montserrat', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
