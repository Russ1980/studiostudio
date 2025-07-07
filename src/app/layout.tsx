
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { RootLayoutClient } from './layout-client';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Mardisen Suite',
  description: 'A financial intelligence platform powered by AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-body antialiased">
        <RootLayoutClient>{children}</RootLayoutClient>
        <Toaster />
      </body>
    </html>
  );
}
