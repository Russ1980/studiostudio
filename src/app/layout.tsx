
'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { getMockUser } from '@/lib/auth';
import { useEffect, useState } from 'react';
import type { User } from '@/lib/auth';
import { OnboardingProvider } from '@/components/onboarding';
import { ServaAIProvider } from '@/hooks/use-serva-ai';
import { SidebarProvider } from '@/components/ui/sidebar';
import LandingLayout from './(landing)/layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Metadata can't be conditional, so we set a generic one.
// In a real app, you might handle this differently.
export const metadata: Metadata = {
  title: 'Mardisen Suite',
  description: 'Mardisen Suite',
};

function AppLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getMockUser().then(setUser);
    }, []);

    if (!user) {
        // You can return a loading spinner here
        return <div>Loading...</div>; 
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAppRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/signin');

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-body antialiased">
        {isAppRoute ? <AppLayout>{children}</AppLayout> : <LandingLayout>{children}</LandingLayout>}
        <Toaster />
      </body>
    </html>
  );
}
