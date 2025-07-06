
export interface OnboardingStep {
    id: string;
    title: string;
    content: string;
    targetElement: string;
    placement?: 'top' | 'right' | 'bottom' | 'left';
    ctaText?: string;
    ctaAction?: () => void;
  }
  
  export const businessOwnerSteps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Mardisen Suite!',
      content: 'This short tour will guide you through the key features for your business.',
      targetElement: '[data-onboarding="user-profile"]',
      placement: 'bottom',
    },
    {
      id: 'dashboard-kpis',
      title: 'Your Financial Dashboard',
      content: 'Get a real-time snapshot of your key business metrics right here.',
      targetElement: '[data-onboarding="dashboard-kpis"]',
      placement: 'bottom',
    },
    {
      id: 'invoicing',
      title: 'Professional Invoicing',
      content: 'Create and send professional invoices to your clients in just a few clicks.',
      targetElement: '[data-onboarding="invoicing-link"]',
      placement: 'right',
    },
    {
      id: 'expenses',
      title: 'Smart Expense Tracking',
      content: 'Connect your bank accounts to automatically track and categorize business expenses.',
      targetElement: '[data-onboarding="banking-link"]',
      placement: 'right',
    },
    {
        id: 'reports',
        title: 'Tax-Ready Reports',
        content: 'Generate financial statements and tax reports effortlessly.',
        targetElement: '[data-onboarding="reports-link"]',
        placement: 'right',
    },
  ];
  
  // For now, all roles will use the same onboarding flow.
  // These can be customized with different steps in the future.
  export const accountantSteps: OnboardingStep[] = businessOwnerSteps;
  export const bookkeeperSteps: OnboardingStep[] = businessOwnerSteps;
