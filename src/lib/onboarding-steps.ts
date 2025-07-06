
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
  
  export const accountantSteps: OnboardingStep[] = [
    {
      id: 'welcome-accountant',
      title: 'Welcome, Accountant!',
      content: 'This tour highlights features designed for accounting professionals.',
      targetElement: '[data-onboarding="user-profile"]',
      placement: 'bottom',
    },
    {
      id: 'chart-of-accounts',
      title: 'Professional Chart of Accounts',
      content: 'Manage complex account structures, codes, and classifications with ease.',
      targetElement: '[data-onboarding="chart-of-accounts-link"]',
      placement: 'right',
    },
    {
      id: 'financial-reports',
      title: 'Advanced Financial Reports',
      content: 'Generate detailed financial statements like P&L, Balance Sheets, and Cash Flow statements.',
      targetElement: '[data-onboarding="financial-reports-link"]',
      placement: 'right',
    },
    {
      id: 'journal-entries',
      title: 'Complex Journal Entries',
      content: 'Make manual adjustments, accruals, and other non-standard entries with full control.',
      targetElement: '[data-onboarding="journal-entries-link"]',
      placement: 'right',
    },
    {
      id: 'audit-trail',
      title: 'Complete Audit Trail',
      content: 'Manage user roles and permissions to ensure a complete audit trail for all financial activities.',
      targetElement: '[data-onboarding="team-settings-link"]',
      placement: 'right',
    },
  ];

  export const bookkeeperSteps: OnboardingStep[] = [
    {
      id: 'welcome-bookkeeper',
      title: 'Welcome, Bookkeeper!',
      content: 'This tour will show you the key tools for your daily tasks.',
      targetElement: '[data-onboarding="user-profile"]',
      placement: 'bottom',
    },
    {
      id: 'daily-transactions',
      title: 'Daily Transaction Entry',
      content: 'Quickly record new transactions like journal entries right from the file menu.',
      targetElement: '[data-onboarding="new-transaction-link"]',
      placement: 'bottom',
    },
    {
      id: 'bank-reconciliation',
      title: 'Bank Reconciliation',
      content: 'Match bank transactions to your books and ensure everything is accurate.',
      targetElement: '[data-onboarding="bank-reconciliation-link"]',
      placement: 'right',
    },
    {
      id: 'client-reports',
      title: 'Client-Ready Reports',
      content: 'Generate professional reports for your clients or management team.',
      targetElement: '[data-onboarding="reports-link"]',
      placement: 'right',
    },
  ];
