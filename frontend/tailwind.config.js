/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#f48024',
        secondaryColor: '#343a40',
        lightColor: '#f8f9fa',
        darkColor: '#212529'
      },
      height: {
        navbar: '64px'
      }
    }
  },
  plugins: []
}
