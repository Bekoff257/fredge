import './globals.css';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/components/layout/language-provider';
import { Header } from '@/components/layout/header';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz">
      <body>
        <LanguageProvider>
          <Header />
          {children}
          <Toaster position="top-right" />
        </LanguageProvider>
      </body>
    </html>
  );
}
