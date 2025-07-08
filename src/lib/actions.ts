
'use server';

import { firestore } from './firebase-admin';
import {
  mockClients,
  mockAccountantDashboard,
  mockDashboardPageData,
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
  mockScheduledReports,
  mockKeyboardShortcuts,
  mockTroubleshootingFAQs,
  mockDataManagementDashboard,
  mockBackupRestoreData,
  mockExportHistory,
} from './data';
import { getMockUser } from './auth';
import { getRevenueDataTool } from '@/ai/tools/get-revenue-data';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import admin from 'firebase-admin';
import { migrateData, migrateSingleDoc } from './migration';


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
    if (!firestore) {
        return mockAccountantDashboard;
    }
    try {
        const clientsSnapshot = await firestore.collection('clients').get();
        const tasksSnapshot = await firestore.collection('tasks').get();
        const invoicesSnapshot = await firestore.collection('invoices').get();

        const activeClients = clientsSnapshot.docs.filter(doc => doc.data().status === 'Active').length;
        const tasks = tasksSnapshot.docs.map(doc => doc.data());
        const pendingTasks = tasks.filter(task => task.status !== 'Done').length;
        const overdueTasks = tasks.filter(task => task.status !== 'Done' && new Date(task.due) < new Date()).length;
        
        const revenueYTD = invoicesSnapshot.docs.reduce((acc, doc) => {
            if (doc.data().status === 'Paid') {
                return acc + parseFloat(doc.data().amount.replace(/,/g, ''));
            }
            return acc;
        }, 0);

        return {
            ...mockAccountantDashboard, // keep mock for deadlines & chart for now
            kpiData: [
                { title: "Active Clients", value: activeClients.toString(), change: "" },
                { title: "Pending Tasks", value: pendingTasks.toString(), change: `${overdueTasks} overdue` },
                { title: "Revenue YTD", value: `$${(revenueYTD / 1000000).toFixed(1)}M`, change: "+15% vs last year", changeType: "up" },
                { title: "Client Health", value: "92%", change: "Avg. Satisfaction" },
            ],
        };

    } catch (e) {
        console.error("Error fetching accountant dashboard data:", e);
        return mockAccountantDashboard;
    }
}

export async function getTasks() {
    if (!firestore) {
        console.log("Firestore not initialized, returning mock data for tasks.");
        return mockTasks;
    }
    try {
        const tasksSnapshot = await firestore.collection('tasks').orderBy('due').get();
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

const ClientSchema = z.object({
    businessName: z.string().min(1, 'Business name is required'),
    businessType: z.string().min(1, 'Business type is required'),
    ein: z.string().optional(),
    industry: z.string().optional(),
    contactName: z.string().min(1, 'Contact name is required'),
    contactEmail: z.string().email('Invalid email address'),
    contactPhone: z.string().optional(),
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
});

export async function addNewClient(values: z.infer<typeof ClientSchema>) {
    if (!firestore) {
        return { success: false, error: "Firestore not initialized." };
    }
    const validatedFields = ClientSchema.safeParse(values);
    if (!validatedFields.success) {
        return { success: false, error: "Invalid form data." };
    }

    try {
        await firestore.collection('clients').add({
            ...validatedFields.data,
            onboarded: new Date().toISOString().split('T')[0],
            status: "Active", // Defaulting to Active for simplicity
            contact: validatedFields.data.contactName, // using contact name as primary contact
            tier: validatedFields.data.businessType, // using business type as tier
        });
        revalidatePath('/accountant-portal/client-list');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

const TaskSchema = z.object({
    task: z.string().min(1, 'Task name is required'),
    client: z.string().min(1, 'Client is required'),
    due: z.string().min(1, 'Due date is required'),
    priority: z.enum(['High', 'Medium', 'Low']),
    status: z.enum(['Not Started', 'In Progress', 'Done']),
});

export async function addNewTask(values: z.infer<typeof TaskSchema>) {
    if (!firestore) {
        return { success: false, error: "Firestore not initialized." };
    }

    const validatedFields = TaskSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, error: "Invalid form data." };
    }

    try {
        await firestore.collection('tasks').add(validatedFields.data);
        revalidatePath('/accountant-portal/task-management');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

const EmployeeSchema = z.object({
    name: z.string().min(1, 'Employee name is required'),
    email: z.string().email('Invalid email address'),
    department: z.string().min(1, 'Department is required'),
    role: z.string().min(1, 'Role is required'),
    hireDate: z.string().min(1, 'Hire date is required'),
    status: z.enum(['Active', 'On Leave', 'Terminated']),
    salary: z.coerce.number().positive('Salary must be a positive number'),
});

export async function addNewEmployee(values: z.infer<typeof EmployeeSchema>) {
    if (!firestore) {
        return { success: false, error: "Firestore not initialized." };
    }

    const validatedFields = EmployeeSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, error: "Invalid form data." };
    }

    try {
        await firestore.collection('employees').add(validatedFields.data);
        revalidatePath('/payroll/employee-management');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
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
    const invoicesSnapshot = await firestore.collection('invoices').orderBy('invoiceNumber', 'desc').get();
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

const InvoiceFormSchema = z.object({
  customer: z.string().min(1),
  invoiceDate: z.string().min(1),
  dueDate: z.string().min(1),
  invoiceNumber: z.string().min(1),
  lineItems: z.array(z.object({
    description: z.string().min(1),
    quantity: z.coerce.number().min(0.01),
    rate: z.coerce.number().min(0),
  })).min(1),
  notes: z.string().optional(),
});

export async function addNewInvoice(values: z.infer<typeof InvoiceFormSchema>) {
    if (!firestore) {
        return { success: false, error: "Firestore not initialized." };
    }

    const validatedFields = InvoiceFormSchema.safeParse(values);
    if (!validatedFields.success) {
        return { success: false, error: "Invalid form data." };
    }

    try {
        const { lineItems, ...invoiceData } = validatedFields.data;

        const subtotal = lineItems.reduce((acc, item) => acc + item.quantity * item.rate, 0);
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + tax;

        const newInvoice = {
            ...invoiceData,
            invoice: invoiceData.invoiceNumber, // Match field name in data
            amount: total.toFixed(2),
            status: 'Sent', // Default status
        };

        // Use invoiceNumber as the document ID for idempotency
        await firestore.collection('invoices').doc(newInvoice.invoiceNumber).set(newInvoice);
        revalidatePath('/invoicing/invoices');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
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
    if (!firestore) return mockArAgingData;

    try {
        const invoicesSnapshot = await firestore.collection('invoices').where('status', '!=', 'Paid').get();
        if (invoicesSnapshot.empty) return mockArAgingData;

        const agingData: { [key: string]: { current: number; "1-30": number; "31-60": number; "61-90": number; "90+": number; total: number } } = {};
        const now = new Date();

        invoicesSnapshot.forEach(doc => {
            const invoice = doc.data();
            const customer = invoice.customer || 'Unknown Customer';
            if (!agingData[customer]) {
                agingData[customer] = { current: 0, "1-30": 0, "31-60": 0, "61-90": 0, "90+": 0, total: 0 };
            }

            const dueDate = new Date(invoice.dueDate);
            const amount = parseFloat(invoice.amount.replace(/,/g, ''));
            const daysOverdue = Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));

            if (daysOverdue <= 0) {
                agingData[customer].current += amount;
            } else if (daysOverdue <= 30) {
                agingData[customer]["1-30"] += amount;
            } else if (daysOverdue <= 60) {
                agingData[customer]["31-60"] += amount;
            } else if (daysOverdue <= 90) {
                agingData[customer]["61-90"] += amount;
            } else {
                agingData[customer]["90+"] += amount;
            }
            agingData[customer].total += amount;
        });

        return Object.entries(agingData).map(([customer, data]) => ({
            customer,
            current: data.current.toFixed(2),
            "1-30": data["1-30"].toFixed(2),
            "31-60": data["31-60"].toFixed(2),
            "61-90": data["61-90"].toFixed(2),
            "90+": data["90+"].toFixed(2),
            total: data.total.toFixed(2),
        }));

    } catch (e) {
        console.error("Error fetching A/R Aging data:", e);
        return mockArAgingData;
    }
}

export async function getSalesByCustomerData() {
    if (!firestore) return mockSalesByCustomerData;
    try {
        const invoicesSnapshot = await firestore.collection('invoices').where('status', '==', 'Paid').get();
        if (invoicesSnapshot.empty) return mockSalesByCustomerData;

        const salesData: { [key: string]: { invoices: number; sales: number } } = {};
        invoicesSnapshot.forEach(doc => {
            const invoice = doc.data();
            const customer = invoice.customer || 'Unknown Customer';
            if (!salesData[customer]) {
                salesData[customer] = { invoices: 0, sales: 0 };
            }
            salesData[customer].invoices += 1;
            salesData[customer].sales += parseFloat(invoice.amount.replace(/,/g, ''));
        });

        return Object.entries(salesData)
            .map(([customer, data]) => ({
                customer,
                invoices: data.invoices,
                sales: data.sales.toString(),
            }))
            .sort((a, b) => parseFloat(b.sales) - parseFloat(a.sales));

    } catch (e) {
        console.error("Error fetching Sales by Customer data:", e);
        return mockSalesByCustomerData;
    }
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
export async function getScheduledReports() {
    await simulateDelay(50);
    return mockScheduledReports;
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
  if (!firestore) return mockJournalEntries;
  try {
    const snapshot = await firestore.collection('journalEntries').orderBy('date', 'desc').get();
    if (snapshot.empty) return mockJournalEntries;
    return snapshot.docs.map(doc => doc.data()) as typeof mockJournalEntries;
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return mockJournalEntries;
  }
}

export async function getChartOfAccounts() {
  if (!firestore) return mockChartOfAccounts;
  try {
    const docRef = firestore.collection('chartOfAccounts').doc('main');
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
        // If it doesn't exist, create it from mock data
        await docRef.set(mockChartOfAccounts);
        return mockChartOfAccounts;
    }
    return docSnap.data() as typeof mockChartOfAccounts;
  } catch (error) {
    console.error("Error fetching chart of accounts:", error);
    return mockChartOfAccounts;
  }
}

const AccountSchema = z.object({
    name: z.string().min(2, { message: "Account name must be at least 2 characters." }),
    code: z.string().optional(),
    type: z.enum(["Asset", "Liability", "Equity", "Income", "Expense"]),
    detailType: z.string().min(2, { message: "Detail type is required." }),
    balance: z.coerce.number().optional().default(0),
});

export async function addChartOfAccount(values: z.infer<typeof AccountSchema>) {
  if (!firestore) {
    return { success: false, error: "Firestore not initialized." };
  }

  const validatedFields = AccountSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data." };
  }
  
  const { name, code, type, detailType, balance } = validatedFields.data;

  try {
    const docRef = firestore.collection('chartOfAccounts').doc('main');
    
    await firestore.runTransaction(async (transaction) => {
        const doc = await transaction.get(docRef);
        if (!doc.exists) {
            throw new Error("Chart of Accounts document not found!");
        }

        const data = doc.data();
        if (!data) {
             throw new Error("Chart of Accounts data is empty!");
        }

        // Simplified: add to a new parent account category within the type
        const newAccount = {
            name,
            code: code || '',
            type,
            detailType,
            status: "Active",
            balance,
            ytd: balance,
            subAccounts: []
        };
        
        // This is a simplified approach. A real app would need a more robust way
        // to determine where to place the account (e.g., under Current Assets vs Fixed Assets).
        // For now, we add it as a new main account under the primary category.
        const categoryMap = {
            Asset: "assets",
            Liability: "liabilities",
            Equity: "liabilities", // Equity is nested under Liabilities in the mock data
            Income: "income",
            Expense: "expenses",
        };
        
        const categoryKey = categoryMap[type] as keyof typeof categoryMap;

        // Create category if it doesn't exist
        if (!data[categoryKey]) {
            data[categoryKey] = { name: type, balance: 0, accounts: [] };
        }
        
        // Create a new parent-level account entry
        const newParentAccount = {
            name: name,
            code: code || '',
            type: type,
            balance: balance,
            subAccounts: [
                {...newAccount, balance: balance, ytd: balance}
            ]
        }
        
        // This logic is flawed. Let's simplify and add to the first group within a category.
        // e.g. for Asset, add to Current Assets. This is a heuristic.
        const updatedData = { ...data };
        
        const targetCategoryKey = type === 'Asset' ? 'assets' : 'liabilities'; // Simplified
        const targetCategory = updatedData[targetCategoryKey];

        if(targetCategory && targetCategory.accounts) {
             targetCategory.accounts.push({
                 name: newAccount.name,
                 code: newAccount.code,
                 type: newAccount.type,
                 detailType: newAccount.detailType,
                 status: newAccount.status,
                 balance: newAccount.balance,
                 ytd: newAccount.ytd,
             });
        }
        
        transaction.update(docRef, { [targetCategoryKey]: targetCategory });
    });
    
    revalidatePath('/accounting/chart-of-accounts');
    return { success: true };
  } catch (error: any) {
    console.error("Error adding chart of account:", error);
    return { success: false, error: error.message };
  }
}

export async function getLedgerTransactions() {
    if (!firestore) return mockLedgerTransactions;
    try {
        const snapshot = await firestore.collection('journalEntries').orderBy('date', 'desc').get();
        if (snapshot.empty) return mockLedgerTransactions;

        // This is a simplified ledger for one account. A real one would be much more complex.
        let runningBalance = 1250320.50; // Starting balance from mock
        const transactions = snapshot.docs.map(doc => {
            const entry = doc.data();
            const debit = parseFloat(entry.debits) || 0;
            const credit = parseFloat(entry.credits) || 0;
            // Assuming this is a cash account ledger
            const newBalance = runningBalance - credit + debit;
            runningBalance = newBalance;
            return {
                date: entry.date,
                journalNo: entry.entryNo,
                description: entry.description,
                debit: debit > 0 ? debit.toFixed(2) : "",
                credit: credit > 0 ? credit.toFixed(2) : "",
                balance: newBalance.toLocaleString('en-US', {minimumFractionDigits: 2}),
            };
        }).reverse(); // Reverse to show oldest first

        return {
            transactions: transactions.reverse(), // reverse back for display
            currentBalance: runningBalance.toLocaleString('en-US', {minimumFractionDigits: 2}),
        };
    } catch(e) {
        console.error("Error fetching ledger transactions:", e);
        return mockLedgerTransactions;
    }
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
    if (!firestore) return mockPurchaseOrders;
    try {
        const snapshot = await firestore.collection('purchaseOrders').get();
        if (snapshot.empty) return mockPurchaseOrders;
        return snapshot.docs.map(doc => doc.data()) as typeof mockPurchaseOrders;
    } catch (error) {
        return mockPurchaseOrders;
    }
}
export async function getInventoryData() {
    if (!firestore) return { kpiData: mockInventory.kpiData, inventory: mockInventory.inventory };
    try {
        const snapshot = await firestore.collection('inventory').get();
        const inventory = snapshot.empty ? mockInventory.inventory : snapshot.docs.map(doc => doc.data());

        const totalValue = inventory.reduce((acc, item) => acc + item.cost * item.quantity, 0);
        const lowStockItems = inventory.filter(item => item.quantity <= item.reorderPoint).length;
        
        return {
            kpiData: [
                { title: "Total Inventory Value", value: `$${totalValue.toLocaleString('en-US', {minimumFractionDigits: 2})}`, icon: "DollarSign" },
                { title: "Items in Stock", value: inventory.length.toLocaleString(), icon: "Package" },
                { title: "Low Stock Items", value: lowStockItems, icon: "AlertCircle" },
            ],
            inventory: inventory as typeof mockInventory.inventory,
        }
    } catch (error) {
        return { kpiData: mockInventory.kpiData, inventory: mockInventory.inventory };
    }
}
export async function getProductionPlans() {
    if (!firestore) return mockProductionPlans;
    try {
        const snapshot = await firestore.collection('productionPlans').get();
        if (snapshot.empty) return mockProductionPlans;
        return snapshot.docs.map(doc => doc.data()) as typeof mockProductionPlans;
    } catch (error) {
        return mockProductionPlans;
    }
}
export async function getWorkOrders() {
    if (!firestore) return mockWorkOrders;
    try {
        const snapshot = await firestore.collection('workOrders').get();
        if (snapshot.empty) return mockWorkOrders;
        return snapshot.docs.map(doc => doc.data()) as typeof mockWorkOrders;
    } catch (error) {
        return mockWorkOrders;
    }
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
export async function getJobCostingDashboardData() {
  if (!firestore) {
    console.log("Firestore not initialized, returning mock job costing data.");
    return mockJobCostingDashboard;
  }
  try {
    const jobsSnapshot = await firestore.collection('jobs').get();
    if (jobsSnapshot.empty) {
        return mockJobCostingDashboard;
    }
    const jobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));

    const activeJobs = jobs.filter(j => j.status === 'In Progress').length;
    const totalBudget = jobs.reduce((acc, job) => acc + job.budget, 0);
    const totalSpent = jobs.reduce((acc, job) => acc + job.spent, 0);
    const overallProfitability = jobs.reduce((acc, job) => acc + job.profitability, 0);

    return {
        kpiData: [
            { title: "Active Jobs", value: activeJobs.toString() },
            { title: "Total Budget", value: `$${totalBudget.toLocaleString()}` },
            { title: "Total Spent", value: `$${totalSpent.toLocaleString()}` },
            { title: "Overall Profitability", value: `$${overallProfitability.toLocaleString()}` },
        ],
        budgetVsActualData: jobs.map(j => ({ name: j.name, budget: j.budget, actual: j.spent })).slice(0, 3),
        recentCostEntries: mockJobCostingDashboard.recentCostEntries, // Keep mock for now
    };
  } catch (error) {
    console.error("Error fetching job costing dashboard data:", error);
    return mockJobCostingDashboard;
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

// Asset Management
export async function getAssetLocationsData() {
    await simulateDelay(50);
    return {
        physicalAssets: [],
        digitalAssets: []
    }
}

// Help
export async function getKeyboardShortcuts() {
    await simulateDelay(50);
    return mockKeyboardShortcuts;
}

export async function getTroubleshootingFAQs() {
    await simulateDelay(50);
    return mockTroubleshootingFAQs;
}

// Data Management
export async function getDataManagementDashboardData() {
  await simulateDelay(50);
  return mockDataManagementDashboard;
}

export async function getBackupRestoreData() {
    await simulateDelay(50);
    return mockBackupRestoreData;
}

export async function getExportHistory() {
    await simulateDelay(50);
    return mockExportHistory;
}

// MIGRATION SERVER ACTIONS
export const migrateClientData = async () => migrateData(mockClients, 'clients');
export const migrateInvoiceData = async () => migrateData(mockInvoices, 'invoices', undefined, 'invoice');
export const migrateEmployeeData = async () => migrateData(mockEmployees, 'employees');
export const migrateJobData = async () => migrateData(mockJobs, 'jobs');
export const migrateTaxFilings = async () => migrateData(mockTaxFilings, 'taxFilings');
export const migrateTaxPayments = async () => migrateData(mockTaxPayments, 'taxPayments');
export const migrateBankAccounts = async () => migrateData(mockBankAccounts, 'bankAccounts');
export const migrateTaskData = async () => migrateData(mockTasks, 'tasks');
export const migrateTimeLogs = async () => migrateData(mockTimeLogs, 'timeLogs');
export const migrateJournalEntries = async () => migrateData(mockJournalEntries, 'journalEntries', undefined, 'entryNo');
export const migratePurchaseOrders = async () => migrateData(mockPurchaseOrders, 'purchaseOrders', undefined, 'poNumber');
export const migrateInventory = async () => migrateData(mockInventory.inventory, 'inventory', undefined, 'sku');
export const migrateProductionPlans = async () => migrateData(mockProductionPlans, 'productionPlans');
export const migrateWorkOrders = async () => migrateData(mockWorkOrders, 'workOrders');
export const migrateChartOfAccounts = async () => migrateSingleDoc(mockChartOfAccounts, 'chartOfAccounts', 'main');
