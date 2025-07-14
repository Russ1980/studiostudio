import { AuthProvider } from '@/components/auth-provider';
import { AppShell } from '@/components/app-shell';
import { OnboardingProvider, OnboardingController } from '@/components/onboarding';
import { ServaAIProvider } from '@/hooks/use-serva-ai';
import { SidebarProvider } from '@/components/ui/sidebar';

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
                <AppShell>
                    <OnboardingController />
                    {children}
                </AppShell>
            </ServaAIProvider>
        </OnboardingProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}
