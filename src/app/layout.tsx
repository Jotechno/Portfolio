import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Juan Sebastián Tamayo Toro | Desarrollador Fullstack y Soporte TI",
  description:
    "Portafolio profesional de Juan Sebastián Tamayo Toro. Desarrollador de Software Fullstack (Angular, Node.js, NestJS, Python, Java, PostgreSQL, MongoDB) y Especialista en Soporte Técnico e Infraestructura TI.",
  keywords: [
    "Juan Sebastián Tamayo Toro",
    "Jotechno",
    "Desarrollador Fullstack",
    "Soporte Técnico",
    "Active Directory",
    "Angular",
    "Node.js",
    "NestJS",
    "Medellín",
    "Antioquia",
    "Infraestructura TI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} dark`}
    >
      <body className="min-h-screen bg-[#05060b] text-slate-100 antialiased font-[family-name:var(--font-sans)] selection:bg-purple-500/30 selection:text-purple-100">
        {children}
      </body>
    </html>
  );
}
