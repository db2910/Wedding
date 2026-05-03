import type { Metadata } from "next";
import { Inter, Great_Vibes, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Wedding Invitation",
  description: "Join us for our special day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${greatVibes.variable} ${cinzel.variable} ${playfair.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
