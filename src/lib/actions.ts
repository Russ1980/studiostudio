
'use server';

// This file contains server actions that simulate fetching data from a backend.
// In a real application, these functions would interact with a database.

import {
  mockClients,
  mockAccountantDashboard,
  mockTasks,
  mockRecentReports,
  mockFiles,
  mockDocRequests,
  mockDocActivities,
  mockInvoicingDashboard,
  mockInvoices,
  mockRecurringInvoices,
  mockEstimates,
  mockCreditNotes,
  mockArAgingData,
  mockSalesByCustomerData,
  mockAccountingDashboard,
  mockCustomers,
  mockBills,
  mockVendors,
  mockJournalEntries,
  mockChartOfAccounts,
  mockLedgerTransactions,
  mockArDashboard,
  mockBankAccounts,
  mockBankDashboard,
  mockBankConnections,
  mockReviewTransactions,
  mockTransactionRules,
  mockReconciliationData,
  mockOperationsDashboard,
  mockPurchaseOrders,
  mockInventory,
  mockProductionPlans,
  mockWorkOrders,
  mockOperationsAnalytics,
  mockProductionTracking,
  mockScheduling,
  mockPayrollDashboard,
  mockEmployees,
  mockPayRuns,
  mockPaySlips,
  mockTaxFilings,
  mockTaxPayments,
  mockBenefitsAdmin,
  mockTimeAndAttendance,
  mockComplianceItems,
  mockPortfolioOverview,
  mockStockData,
  mockLearningResources,
  mockTradingData,
  mockJobs,
  mockJobCostingDashboard
} from './data';

const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Accountant Portal
export async function getClients() {
  await simulateDelay(50);
  return mockClients;
}
export async function getAccountantDashboardData() {
  await simulateDelay(50);
  return mockAccountantDashboard;
}
export async function getTasks() {
    await simulateDelay(50);
    return mockTasks;
}
export async function getRecentReports() {
    await simulateDelay(50);
    return mockRecentReports;
}

// Document Management
export async function getDocumentManagementData() {
  await simulateDelay(50);
  return {
    files: mockFiles,
    requests: mockDocRequests,
    activities: mockDocActivities,
  };
}

// Invoicing
export async function getInvoicingDashboardData() {
    await simulateDelay(50);
    return mockInvoicingDashboard;
}
export async function getInvoices() {
    await simulateDelay(50);
    return mockInvoices;
}
export async function getRecurringInvoices() {
    await simulateDelay(50);
    return mockRecurringInvoices;
}
export async function getEstimates() {
    await simulateDelay(50);
    return mockEstimates;
}
export async function getCreditNotes() {
    await simulateDelay(50);
    return mockCreditNotes;
}
export async function getArAgingData() {
    await simulateDelay(50);
    return mockArAgingData;
}
export async function getSalesByCustomerData() {
    await simulateDelay(50);
    return mockSalesByCustomerData;
}


// Accounting
export async function getAccountingDashboardData() {
    await simulateDelay(50);
    return mockAccountingDashboard;
}
export async function getCustomers() {
    await simulateDelay(50);
    return mockCustomers;
}
export async function getBills() {
    await simulateDelay(50);
    return mockBills;
}
export async function getVendors() {
    await simulateDelay(50);
    return mockVendors;
}
export async function getJournalEntries() {
    await simulateDelay(50);
    return mockJournalEntries;
}
export async function getChartOfAccounts() {
    await simulateDelay(50);
    return mockChartOfAccounts;
}
export async function getLedgerTransactions() {
    await simulateDelay(50);
    return mockLedgerTransactions;
}
export async function getArDashboardData() {
    await simulateDelay(50);
    return mockArDashboard;
}

// Banking
export async function getBankAccounts() {
    await simulateDelay(50);
    return mockBankAccounts;
}
export async function getBankDashboardData() {
    await simulateDelay(50);
    return mockBankDashboard;
}
export async function getBankConnections() {
    await simulateDelay(50);
    return mockBankConnections;
}
export async function getReviewTransactions() {
    await simulateDelay(50);
    return mockReviewTransactions;
}
export async function getTransactionRules() {
    await simulateDelay(50);
    return mockTransactionRules;
}
export async function getReconciliationData() {
    await simulateDelay(50);
    return mockReconciliationData;
}

// Operations
export async function getOperationsDashboardData() {
    await simulateDelay(50);
    return mockOperationsDashboard;
}
export async function getPurchaseOrders() {
    await simulateDelay(50);
    return mockPurchaseOrders;
}
export async function getInventoryData() {
    await simulateDelay(50);
    return mockInventory;
}
export async function getProductionPlans() {
    await simulateDelay(50);
    return mockProductionPlans;
}
export async function getWorkOrders() {
    await simulateDelay(50);
    return mockWorkOrders;
}
export async function getOperationsAnalytics() {
    await simulateDelay(50);
    return mockOperationsAnalytics;
}
export async function getProductionTrackingData() {
    await simulateDelay(50);
    return mockProductionTracking;
}
export async function getSchedulingData() {
    await simulateDelay(50);
    return mockScheduling;
}
export async function getJobs() {
  await simulateDelay(50);
  return mockJobs;
}
export async function getJobCostingDashboardData() {
  await simulateDelay(50);
  return mockJobCostingDashboard;
}


// Payroll
export async function getPayrollDashboardData() {
    await simulateDelay(50);
    return mockPayrollDashboard;
}
export async function getEmployees() {
    await simulateDelay(50);
    return mockEmployees;
}
export async function getPayRuns() {
    await simulateDelay(50);
    return mockPayRuns;
}
export async function getPaySlips() {
    await simulateDelay(50);
    return mockPaySlips;
}
export async function getTaxFilings() {
    await simulateDelay(50);
    return mockTaxFilings;
}
export async function getTaxPayments() {
    await simulateDelay(50);
    return mockTaxPayments;
}
export async function getBenefitsAdminData() {
    await simulateDelay(50);
    return mockBenefitsAdmin;
}
export async function getTimeAndAttendanceData() {
    await simulateDelay(50);
    return mockTimeAndAttendance;
}
export async function getComplianceItems() {
    await simulateDelay(50);
    return mockComplianceItems;
}

// Investments
export async function getPortfolioOverviewData() {
    await simulateDelay(50);
    return mockPortfolioOverview;
}
export async function getStockData() {
    await simulateDelay(50);
    return mockStockData;
}
export async function getLearningResources() {
    await simulateDelay(50);
    return mockLearningResources;
}
export async function getTradingData() {
    await simulateDelay(50);
    return mockTradingData;
}
