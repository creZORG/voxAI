import type { Metadata } from 'next';
import { Inter, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import { CurrencyProvider } from '@/contexts/currency-context';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthContextProvider } from '@/firebase/auth/auth-context';
import { FirebaseClientProvider } from '@/firebase/client-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'], variable: '--font-source-code-pro' });

export const metadata: Metadata = {
  title: 'Voxa AI',
  description: 'The AI That Doesn\'t Just Talk. It Acts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background text-slate-900 font-sans selection:bg-violet-500/30', inter.variable, sourceCodePro.variable, 'dark:bg-slate-950 dark:text-slate-50')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <AuthContextProvider>
              <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-[128px]" />
              </div>
              <CurrencyProvider>
                <Header />
                <main className="relative z-10 pt-20">{children}</main>
                <Toaster />
              </CurrencyProvider>
            </AuthContextProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
