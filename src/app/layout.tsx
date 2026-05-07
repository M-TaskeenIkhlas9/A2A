import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURELION | Premium Clothing Brand",
  description:
    "Discover luxury fashion that embodies elegance and sophistication. Timeless pieces crafted for the modern individual.",
  keywords: ["fashion", "luxury", "clothing", "premium", "style", "elegance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
