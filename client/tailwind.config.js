/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                },
                gaming: {
                    dark: '#0f172a',
                    accent: '#10b981',
                }
            },
            backgroundColor: {
                'gray-750': '#374151',
            }
        },
    },
    plugins: [],
} 