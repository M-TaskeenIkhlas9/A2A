import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'AURELION - Premium Clothing Brand',
  description: 'Discover luxury fashion at AURELION. Premium clothing for those who appreciate elegance and quality in every detail.',
  keywords: ['luxury fashion', 'premium clothing', 'designer wear', 'AURELION'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
