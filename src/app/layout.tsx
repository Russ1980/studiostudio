
"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/components/auth-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { usePathname, useRouter } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { OnboardingProvider } from '@/components/onboarding';
import { ServaAIProvider } from '@/hooks/use-serva-ai';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useEffect } from 'react';
import { Logo } from '@/components/icons';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

function AppLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/signin');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
             <div className="flex h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Logo className="h-12 w-12 animate-pulse" />
                    <p className="text-muted-foreground">Loading Mardisen Suite...</p>
                </div>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <OnboardingProvider>
                <ServaAIProvider>
                    <AppShell user={user}>{children}</AppShell>
                </ServaAIProvider>
            </OnboardingProvider>
        </SidebarProvider>
    );
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = /^\/(dashboard|accountant-portal|accounting|banking|invoicing|operations|payroll|portfolio|tax|projects|reports-insights|client-management|payments|asset-management|data-management|communications|settings|help|search|trading|learn)/.test(pathname);
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user && isAppRoute) {
        router.push('/signin');
    }
  }, [user, loading, isAppRoute, router]);

  if (isAppRoute) {
    if (loading || !user) {
         return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Logo className="h-12 w-12 animate-pulse" />
                    <p className="text-muted-foreground">Loading Mardisen Suite...</p>
                </div>
            </div>
          )
    }
    return <AppLayout>{children}</AppLayout>;
  }
  
  return <div className="bg-background">{children}</div>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <title>Mardisen Suite</title>
        <meta name="description" content="The Financial Intelligence Platform for Modern Business" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <AuthProvider>
              <RootLayoutContent>{children}</RootLayoutContent>
            </AuthProvider>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
