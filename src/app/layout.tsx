import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/providers/auth-provider';

export const metadata: Metadata = {
  title: 'NovaCart',
  description: 'Modern premium eCommerce experience built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
