import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/app/_components/header';
import { Footer } from '@/app/_components/footer';
import { Toaster } from '@/components/ui/toaster';
import { WhatsAppButton } from './_components/whatsapp-button';
import { CartProvider } from '@/lib/cart-context';

export const metadata: Metadata = {
  title: 'DeporteY Aventura Next',
  description: 'Your next adventure starts here.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <WhatsAppButton />
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
