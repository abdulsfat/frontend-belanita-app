import {Red_Hat_Display} from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({subsets: ["latin"]});

export const metadata = {
    title: "Belanita • Championing Women’s Rights",
    description: "Empowering Voices, Ensuring Equality for a Just and Inclusive Future.",
};

export default function RootLayout({children}) {


    return (
        <html lang="en">
        <body className={`${redHatDisplay.className} dark:bg-gray-900`}>
        {children}
        </body>
        </html>
    );
}
