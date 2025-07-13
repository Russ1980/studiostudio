
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { OnboardingProvider } from '@/components/onboarding';
import { ServaAIProvider } from '@/hooks/use-serva-ai';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/components/auth-provider';
import { useEffect } from 'react';
import { Logo } from '@/components/icons';

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
             <div className="flex h-screen w-full">
                <div className="hidden md:block border-r bg-muted/40" style={{width: '16rem'}}>
                    <div className="p-4">
                        <div className="flex items-center gap-2 mb-8">
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                        <div className="space-y-2">
                           {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-6">
                    <header className="flex items-center justify-between mb-6">
                        <Skeleton className="h-8 w-48" />
                        <div className="flex items-center gap-2">
                             <Skeleton className="h-10 w-24" />
                             <Skeleton className="h-10 w-10 rounded-full" />
                             <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    </header>
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-[400px] w-full mt-6" />
                </div>
            </div>
        )
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

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
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
  return <div className="bg-white">{children}</div>;
}
