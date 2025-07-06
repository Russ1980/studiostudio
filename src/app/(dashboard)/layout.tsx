
import { AppShell } from '@/components/app-shell';
import { FloatingHelpButton, OnboardingProvider } from '@/components/onboarding';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getMockUser } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMockUser();

  return (
    <SidebarProvider>
      <OnboardingProvider>
        <AppShell user={user}>{children}</AppShell>
        <FloatingHelpButton />
      </OnboardingProvider>
    </SidebarProvider>
  );
}
