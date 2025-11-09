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
  title: 'ContentGen - Generate SEO-Ready Articles, Blogs & Social Posts in Seconds',
  description: 'AI-powered content generation platform for creating high-quality, SEO-optimized articles, blog posts, and social media content in seconds.',
  keywords: ['content generation', 'AI writing', 'SEO articles', 'blog posts', 'social media content'],
  authors: [{ name: 'ContentGen' }],
  openGraph: {
    title: 'ContentGen - AI-Powered Content Generation',
    description: 'Generate SEO-ready articles, blogs & social posts in seconds',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ContentGen - AI-Powered Content Generation',
    description: 'Generate SEO-ready articles, blogs & social posts in seconds',
  },
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
