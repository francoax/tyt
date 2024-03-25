import { Metadata } from 'next';
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth/auth';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | T&T',
    default: 'Sistema | T&T',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased bg-gray-200/70`}>
        <SessionProvider session={session}>
          {children}
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 3000
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
