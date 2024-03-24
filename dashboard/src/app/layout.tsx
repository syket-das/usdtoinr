import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { SideNavbar } from '@/components/side-navbar';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: 'Dashboard ⤐ %s',
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen w-full bg-white text-black flex',
          inter.className
        )}
      >
        <SideNavbar />
        <div className="w-full">
          <Header />

          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
