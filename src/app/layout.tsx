import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css"; // Ruta correcta desde src/app/

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Pizzeria Raffaello | Auténtica Experiencia Italiana",
  description: "Disfruta de la pizza artesanal más exclusiva en un ambiente señorial y moderno.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}