import { Metadata } from 'next';
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | T&T',
    default: 'Sistema | T&T',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased bg-gray-200/70`}>
        {children}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000
          }}
        />
      </body>
    </html>
  );
}
