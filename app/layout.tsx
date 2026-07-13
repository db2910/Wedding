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

const SITE_URL = "https://wedding-tau-coral.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : SITE_URL
  ),
  title: "Mignone & Amzan | Wedding Invitation",
  description: "Join us in Kigali to celebrate the wedding of Mignone & Amzan.",
  openGraph: {
    title: "Mignone & Amzan | Wedding Invitation",
    description: "Join us in Kigali to celebrate the wedding of Mignone & Amzan.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mignone & Amzan | Wedding Invitation",
    description: "Join us in Kigali to celebrate the wedding of Mignone & Amzan.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${greatVibes.variable} ${cinzel.variable} ${playfair.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}
