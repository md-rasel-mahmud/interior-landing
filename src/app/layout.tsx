import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Index";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const helveticaNeueFont = localFont({
  src: [
    // Black
    {
      path: "../fonts/HelveticaNeueBlack.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/HelveticaNeueBlackItalic.otf",
      weight: "900",
      style: "italic",
    },

    // Bold
    {
      path: "../fonts/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/HelveticaNeueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },

    // Heavy
    {
      path: "../fonts/HelveticaNeueHeavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/HelveticaNeueHeavyItalic.otf",
      weight: "800",
      style: "italic",
    },

    // Italic (Standalone)
    {
      path: "../fonts/HelveticaNeueItalic.ttf",
      weight: "400",
      style: "italic",
    },

    // Light
    {
      path: "../fonts/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/HelveticaNeueLightItalic.otf",
      weight: "300",
      style: "italic",
    },

    // Medium
    {
      path: "../fonts/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/HelveticaNeueMediumItalic.otf",
      weight: "500",
      style: "italic",
    },

    // Roman (Regular)
    {
      path: "../fonts/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },

    // Thin
    {
      path: "../fonts/HelveticaNeueThin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/HelveticaNeueThinItalic.otf",
      weight: "100",
      style: "italic",
    },

    // UltraLight
    {
      path: "../fonts/HelveticaNeueUltraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/HelveticaNeueUltraLightItalic.otf",
      weight: "200",
      style: "italic",
    },
  ],
  variable: "--font-helveticaNeue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PLATONIC",
  description: "Luxury Interior Design & Architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="PLATONIC" />
      </head>

      <body className={`${poppins.variable} ${helveticaNeueFont.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
