import { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.intuitionlabs.com.ng'),
  title: {
    default: 'intuitionLabs | AI-Powered Business Automation',
    template: `%s - Smarter Solutions | intuitionLabs`
  },
  description: 'Transform your business with AI-powered solutions by intuitionLabs. Smarter automation for customer support, scheduling, and sales.',
  keywords: [
    'AI Virtual Assistant', 
    'Virtual Assistant Services', 
    'AI Customer Service', 
    'AI Customer Support', 
    'Business Automation', 
    'AI Solutions for Businesses'
  ],
  openGraph: {
    title: 'intuitionLabs: Smarter Business Automation',
    description: 'Transform your business with AI-powered solutions by intuitionLabs. Smarter automation for customer support, scheduling, and sales.',
    type: 'website',
    url: 'https://www.intuitionlabs.com.ng',
    images: [
      {
        url: '@/app/assets/images/Screenshot 2025-01-11 090739.png',
        width: 1200,
        height: 630,
        alt: 'intuitionLabs AI solutions',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'intuitionLabs: Smarter Business Automation',
    description: 'Streamline your business with AI-powered solutions for customer support, scheduling, and more.',
    images: ['@/app/assets/images/Screenshot 2025-01-11 090739.png']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      </Head>
      <body>{children}</body>
    </html>
  );
}