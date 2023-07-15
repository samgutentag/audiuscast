import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            "colors": {
                "audius": {
                    50: "#F4E8FC",
                    100: "#EAD6FA",
                    200: "#D6AEF4",
                    300: "#C185EF",
                    400: "#AA58E9",
                    500: "#9630E3",
                    600: "#7E1BCB",
                    700: "#601499",
                    800: "#410E68",
                    900: "#1F0732",
                    950: "#11041B"
                }
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
