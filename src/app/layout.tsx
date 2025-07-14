
"use client";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/components/auth-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { usePathname, useRouter } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { OnboardingProvider } from '@/components/onboarding/onboarding-controller';
import { ServaAIProvider } from '@/hooks/use-serva-ai';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import { Logo } from '@/components/icons';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// This is a new component that replaces the old AppLayout
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
    // If we're not loading, there's no user, and we're on a protected app route, redirect to signin
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
  
  // This is for public pages like the landing page, signin, etc.
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
        <title>FinView Reimagined</title>
        <meta name="description" content="A financial intelligence platform powered by AI." />
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
