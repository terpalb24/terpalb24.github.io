import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import HeroImage from "@/assets/hero.jpg";
import Footer from "@/components/layout/footer";
import GlowBackground from "@/components/layout/glow-background";
import Header from "@/components/layout/header";
import ProgressBar from "@/components/layout/progress-bar";

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Terpal B24",
  description: "TRPL Pagi B Polibatam Angkatan 2024",
  metadataBase: new URL("https://terpalb24.github.io"),
  openGraph: {
    images: [
      {
        url: HeroImage.src,
        width: HeroImage.width,
        height: HeroImage.height,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased overflow-x-hidden`}>
        <GlowBackground />
        <Header />
        <ProgressBar>{children}</ProgressBar>
        <Footer />
      </body>
    </html>
  );
}
