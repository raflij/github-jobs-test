/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add custom styles here
      typography: {
        'custom-description': {
          p: {
            color: '#f87171', // Your custom text color
            fontSize: '1.25rem', // Your custom font size
          },
          // Add more custom styles as needed
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}