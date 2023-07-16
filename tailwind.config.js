import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            colors: {
                audius: {
                    50: "#f4f1fc",
                    100: "#ece6f9",
                    200: "#dcd2f3",
                    300: "#c8b6eb",
                    400: "#b899e0",
                    500: "#a97fd5",
                    600: "#9c66c5",
                    700: "#8955ad",
                    800: "#6e478c",
                    900: "#593f70",
                    950: "#30213b",
                },
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
