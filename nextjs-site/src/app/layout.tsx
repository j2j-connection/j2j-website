import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "J2J Connection - AI That Works for Everyone",
  description: "J2J builds AI tools that actually work for real people and communities. Practical artificial intelligence solutions that solve real problems.",
  keywords: ["AI tools", "community solutions", "practical AI", "local business AI", "artificial intelligence", "custom AI solutions"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white`}>
        <Header />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
