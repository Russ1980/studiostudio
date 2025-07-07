
'use client'
import { AppShell } from '@/components/app-shell';
import { OnboardingProvider } from '@/components/onboarding/onboarding-controller';
import { ServaAIProvider } from '@/hooks/use-serva-ai';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getMockUser } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { type User } from '@/lib/auth';
import dynamic from 'next/dynamic';

const FloatingHelpButton = dynamic(
  () => import('@/components/onboarding/floating-help-button').then((mod) => mod.FloatingHelpButton),
  { ssr: false }
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMockUser().then(setUser);
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <SidebarProvider>
      <OnboardingProvider>
        <ServaAIProvider>
          <AppShell user={user}>{children}</AppShell>
          <FloatingHelpButton />
        </ServaAIProvider>
      </OnboardingProvider>
    </SidebarProvider>
  );
}
