'use client';
import ThemeContextProvider from '@/context/theme-context';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </SessionProvider>
  );
}
