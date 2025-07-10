// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const inter = Inter({ subsets: ["latin"] });

// Tus metadatos para SEO permanecen intactos
export const metadata: Metadata = {
  title: "López Labrin - Análisis Jurídico, Político y Económico",
  description: "Blog de análisis crítico sobre derecho, política y economía con perspectiva.",
  // Aquí puedes mantener todos tus otros metadatos (keywords, authors, etc.)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* Aplicamos los estilos de fondo y texto base directamente al body */}
      <body className={`${inter.className} bg-[#121212] text-white`}>
        {/* Esta estructura flex asegura que el footer siempre esté al fondo */}
        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          {/* 'flex-grow' hace que el contenido principal ocupe todo el espacio disponible */}
          <main className="flex-grow">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}