
"use client";

import { AuthProvider, useAuth } from '@/components/auth-provider';
import { AppShell } from '@/components/app-shell';
import { OnboardingProvider, OnboardingController } from '@/components/onboarding';
import { ServaAIProvider } from '@/hooks/use-serva-ai';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import React from 'react';

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
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

    return (
        <AppShell user={user}>
            <OnboardingController userRole={user.role} />
            {children}
        </AppShell>
    )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <OnboardingProvider>
            <ServaAIProvider>
                <DashboardLayoutContent>
                    {children}
                </DashboardLayoutContent>
            </ServaAIProvider>
        </OnboardingProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}
