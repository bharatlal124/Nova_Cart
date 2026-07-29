import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/providers/auth-provider';
import Script from "next/script";

export const metadata: Metadata = {
  title: 'NovaCart',
  description: 'Modern premium eCommerce experience built with Next.js',
   icons: {
    icon: "/icon2.png",
    shortcut: "/icon2.png", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Script
    src="https://checkout.razorpay.com/v1/checkout.js"
    strategy="lazyOnload"
/>
      </body>
    </html>
  );
}
