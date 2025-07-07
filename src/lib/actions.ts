
'use server';

import { firestore } from './firebase-admin';
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
  mockJobCostingDashboard,
  mockJobsWithDetails,
  mockTimeLogs,
  mockJobProfitabilityData,
  mockWipReportData,
  mockSalesByItemData,
  mockTaxSummaryData,
  mockExpenseAnalyticsData,
  mockProjectsDashboardData,
  mockTrialBalanceData,
  mockSalesAnalyticsData,
  mockClientBillingData,
  mockClientComplianceData,
  mockShipments,
  mockMaintenanceTasks,
  mockPaymentsToProcess,
  mockDataValidationResults,
  mockKeyboardShortcuts,
  mockDashboardPageData,
} from './data';
import { getMockUser } from './auth';
import { getRevenueDataTool } from '@/ai/tools/get-revenue-data';
import { revalidatePath } from 'next/cache';

const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getDashboardPageData() {
    if (!firestore) {
        return mockDashboardPageData;
    }
    try {
        const user = await getMockUser();
        const invoicesSnapshot = await firestore.collection('invoices').get();
        const invoices = invoicesSnapshot.docs.map(doc => doc.data());
        const revenueData = await getRevenueDataTool({});

        const now = new Date();
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        let totalRevenue = 0;
        let totalExpenses = 0;
        let outstandingReceivables = 0;
        let overdueReceivables = 0;
        let salesLast30Days = 0;

        invoices.forEach(invoice => {
            const amount = parseFloat(invoice.amount.replace(/,/g, ''));
            const dueDate = new Date(invoice.dueDate);
            
            totalRevenue += amount; // Simplified: assumes all invoices are revenue

            if (invoice.status === 'Paid') {
                const paidDate = dueDate; // Mock paid date
                if (paidDate > new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)) {
                    salesLast30Days += amount;
                }
            } else {
                outstandingReceivables += amount;
                if (dueDate < now) {
                    overdueReceivables += amount;
                }
            }
        });
        
        // Mock expenses for cash flow
        totalExpenses = totalRevenue * 0.65; // Assuming total expenses are 65% of revenue
        const netProfit = totalRevenue - totalExpenses;

        const formatCurrency = (value: number) => {
            if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
            if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
            return `$${value.toFixed(2)}`;
        }
        
        return {
            ...mockDashboardPageData, // Keep other mock data for now
            user,
            mainKpis: {
                netRevenue: formatCurrency(totalRevenue),
                growth: "+12.4%", // Mocked
                healthScore: "94%", // Mocked
            },
            metricCards: [
                { title: "Monthly Expenses", value: formatCurrency(totalExpenses / 12), change: "+5.0%", changeType: "increase", icon: 'TrendingUp', details: null },
                { title: "Net Profit", value: formatCurrency(netProfit), details: `Income: ${formatCurrency(totalRevenue)}\nExpenses: ${formatCurrency(totalExpenses)}`, icon: 'DollarSign', change: null, changeType: null },
                { title: "Sales (30 Days)", value: formatCurrency(salesLast30Days), change: "+8.4%", changeType: "increase", icon: 'BarChart3', details: null },
                { title: "A/R Total", value: formatCurrency(outstandingReceivables), details: `Overdue: ${formatCurrency(overdueReceivables)}`, icon: 'Receipt', change: null, changeType: null },
            ],
            performanceMetrics: {
                ...mockDashboardPageData.performanceMetrics,
                accountsReceivable: {
                    outstanding: formatCurrency(outstandingReceivables),
                    overdue: formatCurrency(overdueReceivables),
                }
            },
            alerts: invoices.filter(i => i.status === 'Overdue').slice(0, 2).map((i: any, idx: number) => ({
                id: idx,
                type: 'critical',
                message: `Invoice #${i.invoice} is ${Math.round((now.getTime() - new Date(i.dueDate).getTime()) / (1000*60*60*24))} days overdue.`
            })),
            chartData: revenueData.data.map(d => ({ month: d.month, income: d.revenue, expenses: d.revenue * 0.6 })), // Mock expenses
        };
    } catch(e) {
        console.error("Error fetching dashboard data, returning mock data", e);
        return mockDashboardPageData;
    }
}

// Accountant Portal
export async function getClients() {
  if (!firestore) {
    console.log("Firestore not initialized, returning mock data.");
    return mockClients;
  }
  try {
    const clientsSnapshot = await firestore.collection('clients').get();
    if (clientsSnapshot.empty) {
      console.log("No clients found in Firestore, returning mock data as fallback.");
      return mockClients;
    }
    const clients = clientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return clients as typeof mockClients;
  } catch (error) {
    console.error("Error fetching clients from Firestore:", error);
    // Fallback to mock data in case of error
    return mockClients;
  }
}

export async function onboardNewClient(formData: any) {
  if (!firestore) {
    return { success: false, error: 'Firestore not initialized' };
  }

  try {
    const primaryContactUser = formData.clientUsers?.find((u: any) => u.role === 'Admin') || formData.clientUsers?.[0];

    const newClientData = {
      businessName: formData.legalName || 'Unnamed Client',
      ein: formData.ein || '',
      address: formData.address || '',
      tier: formData.subscriptionTier || 'Standard',
      status: 'Onboarding',
      onboarded: new Date().toISOString().split('T')[0],
      contact: primaryContactUser ? primaryContactUser.email : 'N/A',
      // Store other fields as well for completeness
      fiscalYearEnd: formData.fiscalYear || '',
      addons: {
        payroll: formData.payrollAddon || false,
        tax: formData.taxAddon || false,
        advisory: formData.advisoryAddon || false,
      },
      chartOfAccountsSetup: formData.chartOfAccountsSetup || '',
    };

    const clientRef = await firestore.collection('clients').add(newClientData);
    
    // Also save users to a subcollection if they exist
    if (formData.clientUsers && formData.clientUsers.length > 0) {
      const usersBatch = firestore.batch();
      formData.clientUsers.forEach((user: any) => {
        const userRef = clientRef.collection('users').doc();
        usersBatch.set(userRef, user);
      });
      await usersBatch.commit();
    }

    revalidatePath('/accountant-portal/client-list');
    return { success: true, clientId: clientRef.id };
  } catch (error: any) {
    console.error("Error onboarding new client:", error);
    return { success: false, error: error.message };
  }
}

export async function getAccountantDashboardData() {
  await simulateDelay(50);
  return mockAccountantDashboard;
}
export async function getTasks() {
    if (!firestore) {
        console.log("Firestore not initialized, returning mock data for tasks.");
        return mockTasks;
    }
    try {
        const tasksSnapshot = await firestore.collection('tasks').get();
        if (tasksSnapshot.empty) {
            console.log("No tasks found in Firestore, returning mock data as fallback.");
            return mockTasks;
        }
        const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return tasks as typeof mockTasks;
    } catch (error) {
        console.error("Error fetching tasks from Firestore:", error);
        return mockTasks;
    }
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
    if (!firestore) {
        console.log("Firestore not initialized, returning mock invoicing dashboard data.");
        return mockInvoicingDashboard;
    }

    try {
        const invoicesSnapshot = await firestore.collection('invoices').get();
        if (invoicesSnapshot.empty) {
            console.log("No invoices found in Firestore, returning mock invoicing dashboard data.");
            return mockInvoicingDashboard;
        }

        const invoices: any[] = invoicesSnapshot.docs.map(doc => doc.data());
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        let outstanding = 0;
        let overdue = 0;
        let paidThisMonth = 0;

        invoices.forEach(invoice => {
            const amount = parseFloat(invoice.amount.replace(/,/g, ''));
            const dueDate = new Date(invoice.dueDate);
            
            if (invoice.status !== 'Paid') {
                outstanding += amount;
                if (dueDate < now) {
                    overdue += amount;
                }
            } else {
                // Assuming a 'paidDate' field would exist on a paid invoice.
                // For this example, we'll just use the due date.
                if (dueDate >= startOfMonth && dueDate <= now) {
                    paidThisMonth += amount;
                }
            }
        });

        // For "Average Days to Pay", a more complex calculation involving paidDate is needed.
        // We will keep a mock value for this KPI for now.
        
        const recentInvoices = invoices
            .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
            .slice(0, 4);

        return {
            kpiData: [
                { title: "Outstanding Invoices", value: `$${outstanding.toLocaleString('en-US', {minimumFractionDigits: 2})}` },
                { title: "Overdue Invoices", value: `$${overdue.toLocaleString('en-US', {minimumFractionDigits: 2})}` },
                { title: "Paid This Month", value: `$${paidThisMonth.toLocaleString('en-US', {minimumFractionDigits: 2})}` },
                { title: "Average Days to Pay", value: "22 Days" }, // Mock value
            ],
            recentInvoices: recentInvoices,
        };

    } catch (error) {
        console.error("Error fetching invoicing dashboard data from Firestore:", error);
        return mockInvoicingDashboard; // Fallback to mock data
    }
}
export async function getInvoices() {
  if (!firestore) {
    console.log("Firestore not initialized, returning mock data for invoices.");
    return mockInvoices;
  }
  try {
    const invoicesSnapshot = await firestore.collection('invoices').get();
    if (invoicesSnapshot.empty) {
      console.log("No invoices found in Firestore, returning mock data as fallback.");
      return mockInvoices;
    }
    const invoices = invoicesSnapshot.docs.map(doc => doc.data());
    return invoices as typeof mockInvoices;
  } catch (error) {
    console.error("Error fetching invoices from Firestore:", error);
    return mockInvoices;
  }
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
export async function getSalesByItemData() {
    await simulateDelay(50);
    return mockSalesByItemData;
}
export async function getTaxSummaryData() {
    await simulateDelay(50);
    return mockTaxSummaryData;
}

// Reports & Insights
export async function getExpenseAnalyticsData() {
    await simulateDelay(50);
    return mockExpenseAnalyticsData;
}
export async function getTrialBalanceData() {
    await simulateDelay(50);
    return mockTrialBalanceData;
}
export async function getSalesAnalyticsData() {
    await simulateDelay(50);
    return mockSalesAnalyticsData;
}
export async function getDataValidationResults() {
    await simulateDelay(50);
    return mockDataValidationResults;
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
  if (!firestore) {
    console.log("Firestore not initialized, returning mock data for chart of accounts.");
    return mockChartOfAccounts;
  }
  try {
    const docRef = firestore.collection('chartOfAccounts').doc('main');
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.log('No chart of accounts document found, returning mock data as fallback.');
      return mockChartOfAccounts;
    }
    
    return docSnap.data() as typeof mockChartOfAccounts;
  } catch (error) {
    console.error("Error fetching chart of accounts from Firestore:", error);
    // Fallback to mock data in case of error
    return mockChartOfAccounts;
  }
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
    if (!firestore) {
        console.log("Firestore not initialized, returning mock data for bank accounts.");
        return mockBankAccounts;
    }
    try {
        const snapshot = await firestore.collection('bankAccounts').get();
        if (snapshot.empty) {
            console.log("No bank accounts found in Firestore, returning mock data as fallback.");
            return mockBankAccounts;
        }
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data as typeof mockBankAccounts;
    } catch (error) {
        console.error("Error fetching bank accounts from Firestore:", error);
        return mockBankAccounts; // Fallback
    }
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
export async function getJobCostingDashboardData() {
  await simulateDelay(50);
  return mockJobCostingDashboard;
}
export async function getJobDetails(id: string) {
  if (!firestore) {
    console.log("Firestore not initialized, returning mock data for job details.");
    const job = mockJobsWithDetails.find(job => job.id === id) || null;
    return JSON.parse(JSON.stringify(job)); // Serialize and deserialize to handle non-plain objects
  }
  try {
    const docRef = firestore.collection('jobs').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.log('No such document!');
      return null;
    }

    const data = docSnap.data();
    // This is a simplified example. In a real app, you might need to handle nested timestamps.
    for (const key in data) {
      if (data[key] && typeof data[key].toDate === 'function') {
        data[key] = data[key].toDate().toISOString();
      }
    }
    
    return { id: docSnap.id, ...data };
  } catch (error) {
    console.error("Error fetching job details from Firestore:", error);
    const job = mockJobsWithDetails.find(job => job.id === id) || null; // Fallback
    return JSON.parse(JSON.stringify(job)); // Serialize and deserialize
  }
}
export async function getJobProfitabilityData() {
    await simulateDelay(50);
    return mockJobProfitabilityData;
}
export async function getWipReportData() {
  await simulateDelay(50);
  return mockWipReportData;
}
export async function getLogisticsData() {
  await simulateDelay(50);
  return { shipments: mockShipments };
}
export async function getMaintenanceData() {
  await simulateDelay(50);
  return { tasks: mockMaintenanceTasks };
}

// Payroll
export async function getPayrollDashboardData() {
    await simulateDelay(50);
    return mockPayrollDashboard;
}
export async function getEmployees() {
    if (!firestore) {
        console.log("Firestore not initialized, returning mock data for employees.");
        return mockEmployees;
    }
    try {
        const employeesSnapshot = await firestore.collection('employees').get();
        if (employeesSnapshot.empty) {
            console.log("No employees found in Firestore, returning mock data as fallback.");
            return mockEmployees;
        }
        const employees = employeesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return employees as typeof mockEmployees;
    } catch (error) {
        console.error("Error fetching employees from Firestore:", error);
        return mockEmployees;
    }
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
    if (!firestore) {
        console.log("Firestore not initialized, returning mock data for tax filings.");
        return mockTaxFilings;
    }
    try {
        const snapshot = await firestore.collection('taxFilings').get();
        if (snapshot.empty) {
            console.log("No tax filings found in Firestore, returning mock data as fallback.");
            return mockTaxFilings;
        }
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data as typeof mockTaxFilings;
    } catch (error) {
        console.error("Error fetching tax filings from Firestore:", error);
        return mockTaxFilings; // Fallback
    }
}
export async function getTaxPayments() {
     if (!firestore) {
        console.log("Firestore not initialized, returning mock data for tax payments.");
        return mockTaxPayments;
    }
    try {
        const snapshot = await firestore.collection('taxPayments').get();
        if (snapshot.empty) {
            console.log("No tax payments found in Firestore, returning mock data as fallback.");
            return mockTaxPayments;
        }
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data as typeof mockTaxPayments;
    } catch (error) {
        console.error("Error fetching tax payments from Firestore:", error);
        return mockTaxPayments; // Fallback
    }
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

// Projects
export async function getProjectsDashboardData() {
    if (!firestore) {
        console.log("Firestore not initialized, returning mock project dashboard data.");
        return mockProjectsDashboardData;
    }
    try {
        const jobs = await getJobs();
        const timeLogs = await getTimeLogs();
        const tasks = await getTasks();

        const activeProjects = jobs.filter(j => j.status === 'In Progress').length;
        const overallProfitability = jobs.reduce((acc, job) => acc + job.profitability, 0);
        const totalBillableHours = timeLogs.reduce((acc, log) => acc + log.hours, 0);
        const overdueTasks = tasks.filter(t => t.status !== 'Done' && new Date(t.due) < new Date()).length;

        const kpiData = [
            { title: "Active Projects", value: activeProjects, icon: 'Activity' },
            { title: "Overall Profitability", value: `$${overallProfitability.toLocaleString()}`, icon: 'DollarSign', isPositive: overallProfitability >= 0 },
            { title: "Total Billable Hours", value: totalBillableHours.toLocaleString(), icon: 'Clock' },
            { title: "Tasks Overdue", value: overdueTasks, icon: 'ListChecks', isPositive: overdueTasks === 0 },
        ];

        const projectBudgetData = jobs.slice(0, 3).map(job => ({
            name: job.name,
            budget: job.budget,
            actual: job.spent,
        }));

        const recentTimeLogs = timeLogs.slice(0, 3);

        return {
            kpiData,
            projectBudgetData,
            recentTimeLogs,
        };

    } catch (error) {
        console.error("Error fetching projects dashboard data:", error);
        return mockProjectsDashboardData;
    }
}
export async function getJobs() {
  if (!firestore) {
    console.log("Firestore not initialized, returning mock data for jobs.");
    return mockJobs;
  }
  try {
    const jobsSnapshot = await firestore.collection('jobs').get();
    if (jobsSnapshot.empty) {
      console.log("No jobs found in Firestore, returning mock data as fallback.");
      return mockJobs;
    }
    const jobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return jobs as typeof mockJobs;
  } catch (error) {
    console.error("Error fetching jobs from Firestore:", error);
    return mockJobs;
  }
}
export async function getTimeLogs() {
    if (!firestore) {
        console.log("Firestore not initialized, returning mock data for time logs.");
        return mockTimeLogs;
    }
    try {
        const snapshot = await firestore.collection('timeLogs').orderBy('date', 'desc').limit(10).get();
        if (snapshot.empty) {
            console.log("No time logs found in Firestore, returning mock data as fallback.");
            return mockTimeLogs;
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as typeof mockTimeLogs;
    } catch (error) {
        console.error("Error fetching time logs from Firestore:", error);
        return mockTimeLogs;
    }
}

// Client Management
export async function getClientBillingData() {
    await simulateDelay(50);
    return mockClientBillingData;
}
export async function getClientComplianceData() {
    await simulateDelay(50);
    return mockClientComplianceData;
}

// Payments
export async function getPaymentsToProcess() {
    await simulateDelay(50);
    return mockPaymentsToProcess;
}

// Help
export async function getKeyboardShortcuts() {
    await simulateDelay(50);
    return mockKeyboardShortcuts;
}
