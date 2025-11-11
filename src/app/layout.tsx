import type { Metadata } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { GeometricBackground } from '@/components/ui/geometric-background';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-baskerville',
});


export const metadata: Metadata = {
  title: 'AgoraVote: Real-time Voting Platform',
  description: 'A secure, scalable, and user-friendly real-time voting application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable}`}>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <GeometricBackground />
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
