/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        screens: {
            // Mobile-first approach using max-width
            sm: { max: "639px" }, // Small screens
            md: { max: "767px" }, // Medium screens
            lg: { max: "1023px" }, // Large screens
            xl: { max: "1279px" }, // Extra large screens
        },
    },
    daisyui: {
        themes: false,
    },
    plugins: [require("daisyui")],
};
