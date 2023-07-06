import { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { MyHeader } from '@/components/MyHeader';
import { MyFooter } from '@/components/MyFooter';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Habit Tracker App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <MyHeader />
          <main className='container'>{children}</main>
          <MyFooter />
        </Providers>
      </body>
    </html>
  );
}
