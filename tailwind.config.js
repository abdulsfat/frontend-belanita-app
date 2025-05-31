/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            container: {
                center: true,
            },
            colors: {
                currentColor: "currentColor",
                primary: "#EFADF9",
                secondary: "#632C91",
                tertiary: "#D6F270",
                black: "#201620",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            keyframes: {
                zoomInFade: {
                    "0%": { transform: "scale(1)", opacity: "1" },
                    "50%": { transform: "scale(1.09)", opacity: "1" },
                    "100%": { transform: "scale(1)", opacity: "10" },
                },
                "accordion-down-1": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up-1": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },

                    "accordion-down": {
                        from: {
                            height: "0",
                        },
                        to: {
                            height: "var(--radix-accordion-content-height)",
                        },
                    },
                    "accordion-up": {
                        from: {
                            height: "var(--radix-accordion-content-height)",
                        },
                        to: {
                            height: "0",
                        },
                    },
                },
            },
            animation: {
                zoomInFade: "zoomInFade 10s ",
                "accordion-down-1": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up-1": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [],
};
