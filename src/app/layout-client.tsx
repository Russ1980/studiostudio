
'use client';

import { usePathname } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { OnboardingProvider } from '@/components/onboarding';
import { ServaAIProvider } from '@/hooks/use-serva-ai';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
                <div className="hidden md:block border-r" style={{width: '16rem'}}>
                    <div className="p-4">
                        <Skeleton className="h-8 w-32 mb-8" />
                        <div className="space-y-2">
                           {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-[200px] w-full mt-4" />
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

  if (loading) {
      return (
        <div className="flex h-screen items-center justify-center">
            <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      )
  }

  if (isAppRoute) {
    return <AppLayout>{children}</AppLayout>;
  }
  
  // This is for public pages like the landing page, signin, etc.
  return <div className="bg-white">{children}</div>;
}
