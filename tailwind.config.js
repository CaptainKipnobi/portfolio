/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [".**/*.{html,js}"],
    darkMode: 'class', // Enable dark mode
    theme: {
        extend: {
            colors:{
                primary: '#e34900',
                secondary: '#ffb71f',
                accent: '#a80000',
                dark:{
                    primary: '#e34900',
                    secondary: '#ffb71f',
                    accent: '#a80000',
                    text: '#fff',
                    'text-secondary': '#888',
                    background: '#000',
                    'background-secondary': '#111',
                    'background-tertiary': '#171717',
                    border: '#333',
                }
            },
            fontFamily: {
                sans: ['inter', 'sans-serif'],
            },
            boxShadow:{
                'custom': '0 4px 14px rgba(0, 0, 0, 0.1)',
                'dark': '0 4px 14px rgba(0, 0, 0, 0.25)',
            },
            animation: {
                'morph': 'morph 8s ease-in-out infinite',
                'pulse-slow': 'pulse 10s infinite',
                'rgb-glow': 'rgb-glow 3s linear infinite',
                'dark-glow': 'dark-glow 3s linear infinite',
            },
            keyframes: {
                morph: {
                    '0%': { borderRadius: '60% 40% 30% 70%/ 60% 30% 70% 40%' },
                    '50%': { borderRadius: '30% 60% 70% 40%/ 50% 60% 30% 60%' },
                    '100%': { borderRadius: '60% 40% 30% 70%/ 60% 30% 70% 40%' },
                },
                pulse: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                }
            }
        },
    },
    plugins: [],
}