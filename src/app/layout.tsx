import type { Metadata } from "next";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CartHeader } from "@/components/CartHeader";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaio Imports",
  description: "Aqui você encontra os mais variados produtos importados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black transition-colors duration-300`}
      >
        <ThemeProvider>
          <CartProvider>
            <header className="w-full border-b border-b-amber-400 pl-2 pr-4 md:px-20 bg-black">
              <nav className="flex justify-between items-center">
                <Image
                  src="/logo.png"
                  alt="Logo kaio imports"
                  width={80}
                  height={80}
                />
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <CartHeader />
                </div>
              </nav>
            </header>
            {children}
            <Toaster richColors position="top-right" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
