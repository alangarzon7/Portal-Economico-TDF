import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal Económico Tierra del Fuego",
  description: "Monitor de alta frecuencia para indicadores macroeconómicos de Tierra del Fuego",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
