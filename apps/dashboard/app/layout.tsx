import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Inter font from Google Fonts
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dashboard - ContentGen',
  description: 'Manage your AI-powered content generation with ContentGen dashboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external font sources */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        {/* Load Satoshi from FontShare */}
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
