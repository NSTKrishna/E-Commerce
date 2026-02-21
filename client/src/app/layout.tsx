import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Corrected font import
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers"; // Import the provider

const inter = Inter({ subsets: ["latin"] }); // Initialize font

export const metadata: Metadata = {
  title: "ShopEasy",
  description: "Your favorite online store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="container mx-auto py-4 px-4 bg-gray-50 min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
