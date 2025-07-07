





// This file contains mock data for the entire application.
// In a real application, this data would be fetched from a database.

import { v4 as uuidv4 } from 'uuid';

// Accountant Portal
export const mockClients = [
  { id: "1", businessName: "Innovate Inc.", contact: "John Doe", status: "Active", tier: "Professional", onboarded: "2023-01-15" },
  { id: "2", businessName: "Apex Solutions", contact: "Jane Smith", status: "Onboarding", tier: "Enterprise", onboarded: "2023-03-01" },
  { id: "3", businessName: "QuantumLeap Co.", contact: "Peter Jones", status: "Active", tier: "Standard", onboarded: "2022-11-20" },
  { id: "4", businessName: "Stellar Goods", contact: "Mary Johnson", status: "Inactive", tier: "Standard", onboarded: "2022-09-10" },
  { id: "5", businessName: "Momentum LLC", contact: "David Brown", status: "Active", tier: "Professional", onboarded: "2023-05-22" },
  { id: "6", businessName: "Visionary Ventures", contact: "Sarah Wilson", status: "Active", tier: "Enterprise", onboarded: "2021-12-30" },
];

export const mockAccountantDashboard = {
  kpiData: [
    { title: "Active Clients", value: "73", change: "+3 since last month" },
    { title: "Pending Tasks", value: "12", change: "2 overdue" },
    { title: "Revenue YTD", value: "$1.2M", change: "+15% vs last year", changeType: "up" },
    { title: "Client Health", value: "92%", change: "Avg. Satisfaction" },
  ],
  chartData: [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 1800 },
    { month: "Mar", revenue: 5100 },
    { month: "Apr", revenue: 2900 },
    { month: "May", revenue: 6100 },
    { month: "Jun", revenue: 5400 },
    { month: "Jul", revenue: 4800 },
  ],
  upcomingDeadlines: [
    { title: "Q2 Tax Filing", client: "Innovate Inc.", deadline: "3 days", isUrgent: true },
    { title: "Payroll Run", client: "Apex Solutions", deadline: "5 days", isUrgent: true },
    { title: "Financial Statements Review", client: "QuantumLeap Co.", deadline: "1 week", isUrgent: false },
    { title: "Invoice #1024 Due", client: "Stellar Goods", deadline: "2 weeks", isUrgent: false },
  ]
};

export const mockTasks = [
  { id: "TASK-001", task: "Q2 Tax Filing", client: "Innovate Inc.", due: "2024-07-31", priority: "High", status: "In Progress" },
  { id: "TASK-002", task: "Monthly Bookkeeping", client: "Apex Solutions", due: "2024-07-25", priority: "Medium", status: "In Progress" },
  { id: "TASK-003", task: "Review Financials", client: "QuantumLeap Co.", due: "2024-07-28", priority: "Medium", status: "Done" },
  { id: "TASK-004", task: "Onboard New Client", client: "Momentum LLC", due: "2024-08-05", priority: "High", status: "Not Started" },
  { id: "TASK-005", task: "Follow up on Invoice #1024", client: "Stellar Goods", due: "2024-07-22", priority: "Low", status: "Done" },
];

export const mockRecentReports = [
  { client: "Innovate Inc.", type: "Profit & Loss", period: "Last Quarter", generated: "2 days ago" },
  { client: "Apex Solutions", type: "Balance Sheet", period: "YTD", generated: "1 week ago" },
  { client: "QuantumLeap Co.", type: "Cash Flow Statement", period: "This Month", generated: "2 weeks ago" },
];

// Document Management
export const mockFiles = [
  { type: "folder", name: "Tax Documents", modified: "2023-05-10", size: "—" },
  { type: "folder", name: "Financial Statements", modified: "2023-04-22", size: "—" },
  { type: "file", name: "Q1_Balance_Sheet.pdf", modified: "2023-04-20", size: "1.2 MB" },
  { type: "file", name: "Logo_Assets.zip", modified: "2023-03-15", size: "15.7 MB" },
];

export const mockDocRequests = [
    { client: "Innovate Inc.", request: "Signed 2023 Engagement Letter", status: "Pending Client", due: "2024-08-01" },
    { client: "Apex Solutions", request: "Q2 2024 Bank Statements", status: "Completed", due: "2024-07-20" },
    { client: "QuantumLeap Co.", request: "Form W-9", status: "Completed", due: "2024-07-15" },
    { client: "Stellar Goods", request: "Confirmation of Business Address", status: "Pending Client", due: "2024-08-10" },
];

export const mockDocActivities = [
    { user: "Sarah Johnson", avatar: "SJ", action: "uploaded", document: "Q2_Balance_Sheet.pdf", time: "2 hours ago" },
    { user: "John Doe", avatar: "JD", action: "created a request for", document: "Signed 2023 Engagement Letter", time: "5 hours ago" },
    { user: "Sarah Johnson", avatar: "SJ", action: "created a new folder", document: "Client Communications", time: "1 day ago" },
    { user: "Admin", avatar: "A", action: "viewed", document: "2022_Tax_Return.pdf", time: "2 days ago" },
];

// Invoicing
export const mockInvoicingDashboard = {
  kpiData: [
    { title: "Outstanding Invoices", value: "$245,800.00" },
    { title: "Overdue Invoices", value: "$35,200.00" },
    { title: "Paid This Month", value: "$150,600.00" },
    { title: "Average Days to Pay", value: "22 Days" },
  ],
  recentInvoices: [
    { invoice: "#INV-2024-051", customer: "QuantumLeap Co.", amount: "25,000.00", dueDate: "2024-07-31", status: "Sent" },
    { invoice: "#INV-2024-050", customer: "Apex Solutions", amount: "12,500.00", dueDate: "2024-06-20", status: "Paid" },
    { invoice: "#INV-2024-049", customer: "Momentum LLC", amount: "10,000.00", dueDate: "2024-06-20", status: "Overdue" },
    { invoice: "#INV-2024-048", customer: "Stellar Goods", amount: "5,000.00", dueDate: "2024-07-15", status: "Sent" },
  ]
};

export const mockInvoices = [
  { invoice: "#INV-2024-051", customer: "QuantumLeap Co.", amount: "25,000.00", dueDate: "2024-07-31", status: "Sent" },
  { invoice: "#INV-2024-050", customer: "Apex Solutions", amount: "12,500.00", dueDate: "2024-06-20", status: "Paid" },
  { invoice: "#INV-2024-049", customer: "Momentum LLC", amount: "10,000.00", dueDate: "2024-06-20", status: "Overdue" },
  { invoice: "#INV-2024-048", customer: "Stellar Goods", amount: "5,000.00", dueDate: "2024-07-15", status: "Sent" },
  { invoice: "#INV-2024-047", customer: "Innovate Inc.", amount: "50,000.00", dueDate: "2024-06-15", status: "Paid" },
];

export const mockRecurringInvoices = [
  { id: "REC-001", customer: "Innovate Inc.", frequency: "Monthly", nextDate: "2024-08-01", amount: "5,000.00", status: "Active" },
  { id: "REC-002", customer: "Apex Solutions", frequency: "Quarterly", nextDate: "2024-10-01", amount: "15,000.00", status: "Active" },
  { id: "REC-003", customer: "Stellar Goods", frequency: "Monthly", nextDate: "2024-08-15", amount: "1,200.00", status: "Paused" },
];

export const mockEstimates = [
  { id: "EST-001", customer: "Innovate Inc.", date: "2024-07-10", amount: "12,500.00", status: "Sent" },
  { id: "EST-002", customer: "Apex Solutions", date: "2024-07-08", amount: "8,000.00", status: "Accepted" },
  { id: "EST-003", customer: "QuantumLeap Co.", date: "2024-06-25", amount: "2,500.00", status: "Expired" },
  { id: "EST-004", customer: "New Prospect LLC", date: "2024-07-12", amount: "30,000.00", status: "Draft" },
];

export const mockCreditNotes = [
  { id: "CN-001", customer: "Innovate Inc.", date: "2024-07-10", amount: "500.00", status: "Applied" },
  { id: "CN-002", customer: "Apex Solutions", date: "2024-07-05", amount: "250.00", status: "Open" },
  { id: "CN-003", customer: "QuantumLeap Co.", date: "2024-06-20", amount: "100.00", status: "Refunded" },
];

export const mockArAgingData = [
  { customer: "Innovate Inc.", current: "5,000.00", "1-30": "2,500.00", "31-60": "0.00", "61-90": "0.00", "90+": "0.00", total: "7,500.00" },
  { customer: "Apex Solutions", current: "10,000.00", "1-30": "0.00", "31-60": "5,000.00", "61-90": "0.00", "90+": "0.00", total: "15,000.00" },
  { customer: "QuantumLeap Co.", current: "0.00", "1-30": "0.00", "31-60": "1,200.00", "61-90": "800.00", "90+": "0.00", total: "2,000.00" },
  { customer: "Stellar Goods", current: "0.00", "1-30": "0.00", "31-60": "0.00", "61-90": "0.00", "90+": "1,500.00", total: "1,500.00" },
];

export const mockSalesByCustomerData = [
  { customer: "Innovate Inc.", invoices: 12, sales: "75500" },
  { customer: "Apex Solutions", invoices: 8, sales: "62300" },
  { customer: "QuantumLeap Co.", invoices: 25, sales: "45800" },
  { customer: "Stellar Goods", invoices: 5, sales: "21100" },
  { customer: "Momentum LLC", invoices: 15, sales: "18900" },
];

export const mockSalesByItemData = [
  { item: 'Consulting Services', quantity: 450, sales: 225000, category: 'Services' },
  { item: 'Software License', quantity: 120, sales: 120000, category: 'Products' },
  { item: 'Support Retainer', quantity: 50, sales: 75000, category: 'Services' },
  { item: 'Custom Development', quantity: 80, sales: 64000, category: 'Services' },
  { item: 'Hardware', quantity: 25, sales: 37500, category: 'Products' },
];

export const mockTaxSummaryData = [
    { jurisdiction: 'California', taxableSales: 450000, nonTaxableSales: 75000, taxCollected: 39375.00 },
    { jurisdiction: 'New York', taxableSales: 120000, nonTaxableSales: 20000, taxCollected: 10650.00 },
    { jurisdiction: 'Texas', taxableSales: 85000, nonTaxableSales: 15000, taxCollected: 7012.50 },
];

// Reports & Insights
export const mockExpenseAnalyticsData = {
    kpiData: [
        { title: 'Total Expenses (YTD)', value: '$1.8M' },
        { title: 'Top Spending Category', value: 'Cost of Goods Sold' },
        { title: 'Top Vendor', value: 'Raw Materials Co.' },
        { title: 'Transactions Logged', value: '1,245' },
    ],
    expenseByCategory: [
        { name: 'COGS', value: 600000, fill: 'var(--color-chart-1)' },
        { name: 'Salaries', value: 450000, fill: 'var(--color-chart-2)' },
        { name: 'R&D', value: 210000, fill: 'var(--color-chart-3)' },
        { name: "Marketing", value: 120000, fill: 'var(--color-chart-4)' },
        { name: 'Overhead', value: 85000, fill: 'var(--color-chart-5)' },
        { name: 'Other', value: 335000, fill: 'hsl(var(--muted-foreground))' },
    ],
    expenseByVendor: [
        { vendor: 'Raw Materials Co.', amount: 450000, category: 'COGS' },
        { vendor: 'Cloud Services LLC', amount: 150000, category: 'Overhead' },
        { vendor: 'Marketing Agency Co.', amount: 120000, category: 'Marketing' },
        { vendor: 'Component Suppliers Inc.', amount: 95000, category: 'COGS' },
        { vendor: 'Office Supplies Inc.', amount: 35000, category: 'Overhead' },
    ]
};

export const mockTrialBalanceData = {
    accounts: [
      { name: "Cash", debit: 1250320.50, credit: 0 },
      { name: "Accounts Receivable", debit: 245800.00, credit: 0 },
      { name: "Inventory", debit: 1234567.89, credit: 0 },
      { name: "Fixed Assets", debit: 74250.00, credit: 0 },
      { name: "Accounts Payable", debit: 0, credit: 88450.00 },
      { name: "Credit Card Payable", debit: 0, credit: 12500.00 },
      { name: "Owner's Equity", debit: 0, credit: 1053520.50 },
      { name: "Retained Earnings", debit: 0, credit: 430100.00 },
      { name: "Sales Revenue", debit: 0, credit: 1200500.00 },
      { name: "Cost of Goods Sold", debit: 450000.00, credit: 0 },
      { name: "Operating Expenses", debit: 320400.00, credit: 0 },
    ],
    get totals() {
      return this.accounts.reduce(
        (acc, account) => {
          acc.debit += account.debit;
          acc.credit += account.credit;
          return acc;
        },
        { debit: 0, credit: 0 }
      );
    },
};

export const mockSalesAnalyticsData = {
    kpiData: [
        { title: "Total Sales (YTD)", value: "$4.2M", change: "+12.5%" },
        { title: "Avg. Deal Size", value: "$12,850", change: "+3.2%" },
        { title: "Conversion Rate", value: "28%", change: "-1.1%" },
        { title: "Sales Cycle", value: "42 Days", change: "-5 days" },
    ],
    salesOverTime: [
        { month: 'Jan', sales: 350000 },
        { month: 'Feb', sales: 380000 },
        { month: 'Mar', sales: 410000 },
        { month: 'Apr', sales: 400000 },
        { month: 'May', sales: 450000 },
        { month: 'Jun', sales: 480000 },
    ],
    topPerformers: [
        { name: "Olivia Smith", sales: 850000, avatar: "OS" },
        { name: "Noah Williams", sales: 720000, avatar: "NW" },
        { name: "Liam Johnson", sales: 680000, avatar: "LJ" },
    ]
};

export const mockDataValidationResults = [
    { id: 'V001', category: 'General Ledger', issue: 'Unbalanced Journal Entry #JE-003', severity: 'Error', details: 'Debits do not equal credits.' },
    { id: 'V002', category: 'Invoicing', issue: 'Invoice #INV-2024-049 is 32 days overdue', severity: 'Warning', details: 'Customer: Momentum LLC' },
    { id: 'V003', category: 'Bills', issue: 'Bill from Marketing Agency Co. is 15 days overdue', severity: 'Warning', details: 'Amount: $10,500.00' },
    { id: 'V004', category: 'Data Integrity', issue: '5 transactions are missing a category', severity: 'Error', details: 'These transactions cannot be included in financial reports.' },
];


// Accounting
export const mockAccountingDashboard = {
  kpiData: [
    { title: "Bank Accounts", value: "$1,250,320.50", detail: "Total cash balance" },
    { title: "Accounts Receivable", value: "$245,800.00", detail: "$35,200.00 overdue" },
    { title: "Accounts Payable", value: "$88,450.00", detail: "$15,000.00 due soon" },
    { title: "YTD Profit", value: "$430,100.00", detail: "+18% vs last year" },
  ],
  chartData: [
    { month: "Jan", inflow: 120000, outflow: 80000 },
    { month: "Feb", inflow: 150000, outflow: 95000 },
    { month: "Mar", inflow: 135000, outflow: 100000 },
    { month: "Apr", inflow: 160000, outflow: 110000 },
    { month: "May", inflow: 180000, outflow: 125000 },
    { month: "Jun", inflow: 175000, outflow: 115000 },
  ],
  recentActivity: [
    { description: "Invoice #INV-2024-050 paid by Apex Solutions", amount: "+$12,500.00", isIncome: true },
    { description: "Bill #B-2024-112 paid to Office Supplies Inc.", amount: "-$1,200.00", isIncome: false },
    { description: "Expense logged for 'Team Lunch'", amount: "-$350.00", isIncome: false },
    { description: "Invoice #INV-2024-051 created for QuantumLeap Co.", amount: "+$25,000.00", isIncome: true },
  ]
};

export const mockCustomers = [
    { name: "Innovate Inc.", email: "contact@innovate.com", phone: "(555) 123-4567", balance: "50,000.00" },
    { name: "Apex Solutions", email: "accounts@apex.com", phone: "(555) 987-6543", balance: "75,000.00" },
    { name: "QuantumLeap Co.", email: "billing@quantumleap.co", phone: "(555) 555-1212", balance: "15,200.00" },
];

export const mockBills = [
    { bill: "#B-2024-112", vendor: "Office Supplies Inc.", dueDate: "2024-07-15", amount: "1,200.00", status: "Paid" },
    { bill: "#B-2024-113", vendor: "Cloud Services LLC", dueDate: "2024-07-20", amount: "5,000.00", status: "Awaiting Payment" },
    { bill: "#B-2024-114", vendor: "Marketing Agency Co.", dueDate: "2024-06-30", amount: "10,500.00", status: "Overdue" },
];

export const mockVendors = [
    { name: "Office Supplies Inc.", email: "sales@officesupplies.com", balance: "1,200.00" },
    { name: "Cloud Services LLC", email: "billing@cloudservices.com", balance: "5,000.00" },
    { name: "Marketing Agency Co.", email: "accounts@marketing.co", balance: "10,500.00" },
];

export const mockJournalEntries = [
  { date: "2024-06-15", entryNo: "JE-001", ref: "Depreciation", description: "Monthly depreciation expense for office equipment.", debits: "1,500.00", credits: "1,500.00", status: "Posted" },
  { date: "2024-06-10", entryNo: "JE-002", ref: "Owner's Draw", description: "Owner withdrawal for personal use.", debits: "5,000.00", credits: "5,000.00", status: "Posted" },
  { date: "2024-06-01", entryNo: "JE-003", ref: "Accrued Revenue", description: "To recognize revenue earned but not yet invoiced.", debits: "10,000.00", credits: "10,000.00", status: "Draft" },
];

export const mockChartOfAccounts = {
  assets: {
    name: "Assets",
    balance: "1,584,570.50",
    accounts: [
      { 
        name: "Current Assets", code: "1000", type: "Bank", balance: "1,510,320.50",
        subAccounts: [
          { name: "Main Checking Account", code: "1001", type: "Bank", detailType: "Checking", status: "Active", balance: "1,250,320.50", ytd: "5,400,000.00" },
          { name: "Accounts Receivable", code: "1200", type: "Accounts Receivable", detailType: "Accounts Receivable (A/R)", status: "Active", balance: "245,800.00", ytd: "1,200,500.00" },
          { name: "Prepaid Expenses", code: "1300", type: "Other Current Asset", detailType: "Prepaid Expenses", status: "Active", balance: "14,200.00", ytd: "50,000.00" },
        ]
      },
       { 
        name: "Fixed Assets", code: "1500", type: "Fixed Asset", balance: "74,250.00",
        subAccounts: [
          { name: "Machinery & Equipment", code: "1510", type: "Fixed Asset", detailType: "Machinery & Equipment", status: "Active", balance: "150,000.00", ytd: "150,000.00" },
          { name: "Accumulated Depreciation", code: "1520", type: "Fixed Asset", detailType: "Accumulated Depreciation", status: "Active", balance: "-75,750.00", ytd: "-75,750.00" },
        ]
      },
    ]
  },
  liabilities: {
    name: "Liabilities & Equity",
    balance: "1,584,570.50",
    accounts: [
       { 
        name: "Liabilities", code: "2000", type: "Liability", balance: "100,950.00",
        subAccounts: [
          { name: "Accounts Payable", code: "2010", type: "Accounts Payable", detailType: "Accounts Payable (A/P)", status: "Active", balance: "88,450.00", ytd: "750,000.00" },
          { name: "Business Credit Card", code: "2100", type: "Credit Card", detailType: "Credit Card", status: "Active", balance: "12,500.00", ytd: "150,000.00" },
        ]
      },
       { 
        name: "Equity", code: "3000", type: "Equity", balance: "1,483,620.50",
        subAccounts: [
          { name: "Owner's Equity", code: "3100", type: "Equity", detailType: "Owner's Equity", status: "Active", balance: "1,053,520.50", ytd: "1,053,520.50" },
          { name: "Retained Earnings", code: "3200", type: "Equity", detailType: "Retained Earnings", status: "Active", balance: "430,100.00", ytd: "430,100.00" },
        ]
      },
    ]
  },
};

export const mockLedgerTransactions = [
    { date: "2024-06-20", journalNo: "INV-2024-050", description: "Payment from Apex Solutions", debit: "12,500.00", credit: "", balance: "1,250,320.50" },
    { date: "2024-06-18", journalNo: "BILL-2024-112", description: "Payment to Office Supplies Inc.", debit: "", credit: "1,200.00", balance: "1,237,820.50" },
    { date: "2024-06-15", journalNo: "JE-001", description: "Monthly depreciation expense", debit: "", credit: "1,500.00", balance: "1,239,020.50" },
    { date: "2024-06-10", journalNo: "JE-002", description: "Owner withdrawal", debit: "", credit: "5,000.00", balance: "1,240,520.50" },
];

export const mockArDashboard = {
  kpis: [
    { title: "Total Outstanding", value: "$245,800.00" },
    { title: "Current (1-30 Days)", value: "$210,600.00" },
    { title: "Overdue (31-60 Days)", value: "$25,200.00" },
    { title: "Overdue (60+ Days)", value: "$10,000.00" },
  ],
  overdueInvoices: [
    { invoice: "#INV-2024-045", customer: "Stellar Goods", dueDate: "2024-05-30", amount: "10,000.00", status: "60+ Days Overdue" },
    { invoice: "#INV-2024-048", customer: "QuantumLeap Co.", dueDate: "2024-06-15", amount: "15,200.00", status: "45 Days Overdue" },
    { invoice: "#INV-2024-049", customer: "Momentum LLC", dueDate: "2024-06-20", amount: "10,000.00", status: "40 Days Overdue" },
  ]
};

// Banking
export const mockBankAccounts = [
    { id: 'acc_1', name: "Business Checking", bank: "Chase Bank", lastFour: "1234", balance: "1,250,320.50", type: "bank" },
    { id: 'acc_2', name: "Business Credit Card", bank: "American Express", lastFour: "5678", balance: "12,500.00", type: "credit" },
    { id: 'acc_3', name: "Savings Account", bank: "Chase Bank", lastFour: "4321", balance: "500,000.00", type: "bank" },
];

export const mockBankDashboard = {
  accounts: mockBankAccounts,
  transactions: [
    { date: "2024-07-21", description: "STRIPE PAYOUT", account: "Checking", amount: "+$12,500.00" },
    { date: "2024-07-20", description: "GOOGLE WORKSPACE", account: "Credit Card", amount: "-$75.00" },
    { date: "2024-07-20", description: "AMAZON WEB SERVICES", account: "Credit Card", amount: "-$1,234.56" },
    { date: "2024-07-19", description: "OFFICE SUPPLIES INC", account: "Checking", amount: "-$450.23" },
  ]
};

export const mockBankConnections = {
  connectedAccounts: [
    { name: "Business Checking", bank: "Chase", logo: "https://placehold.co/40x40.png", hint: "bank logo", status: "Connected" },
    { name: "Business Credit Card", bank: "American Express", logo: "https://placehold.co/40x40.png", hint: "bank logo", status: "Connected" },
    { name: "Savings Account", bank: "Chase", logo: "https://placehold.co/40x40.png", hint: "bank logo", status: "Error" },
  ],
  popularBanks: [
    { name: "Chase", logo: "https://placehold.co/40x40.png", hint: "bank logo" },
    { name: "Bank of America", logo: "https://placehold.co/40x40.png", hint: "bank logo" },
    { name: "Wells Fargo", logo: "https://placehold.co/40x40.png", hint: "bank logo" },
    { name: "Stripe", logo: "https://placehold.co/40x40.png", hint: "payment processor logo" },
    { name: "PayPal", logo: "https://placehold.co/40x40.png", hint: "payment processor logo" },
  ]
};

export const mockReviewTransactions = [
    { id: 1, date: "2024-07-21", description: "STRIPE PAYOUT", account: "Checking", amount: "+12,500.00", status: "review" },
    { id: 2, date: "2024-07-20", description: "GOOGLE WORKSPACE", account: "Credit Card", amount: "-75.00", status: "review" },
    { id: 3, date: "2024-07-20", description: "AMAZON WEB SERVICES", account: "Credit Card", amount: "-1,234.56", status: "categorized" },
    { id: 4, date: "2024-07-19", description: "Payment from Innovate Inc.", account: "Checking", amount: "+50,000.00", status: "matched" },
];

export const mockTransactionRules = [
    { name: "Google Workspace Subscription", condition: "Description contains 'Google Workspace'", action: "Categorize as 'Software & Subscriptions'" },
    { name: "Stripe Payouts", condition: "Description contains 'STRIPE PAYOUT'", action: "Categorize as 'Sales Revenue'" },
    { name: "Amazon Web Services", condition: "Description contains 'AMAZON WEB SERVICES'", action: "Categorize as 'Cloud Hosting'" },
];

export const mockReconciliationData = {
  payments: [
    { date: "2024-06-25", description: "Cloud Services LLC", amount: "5,000.00" },
    { date: "2024-06-20", description: "Marketing Agency Co.", amount: "10,500.00" },
    { date: "2024-06-18", description: "Office Supplies Inc.", amount: "1,200.00" },
  ],
  deposits: [
    { date: "2024-06-28", description: "Payment from Innovate Inc.", amount: "50,000.00" },
    { date: "2024-06-22", description: "Stripe Payout", amount: "12,500.00" },
  ]
};

// Operations
export const mockOperationsDashboard = {
  kpiData: [
    { title: "Production Efficiency (OEE)", value: "85%" },
    { title: "On-Time Delivery", value: "98.2%" },
    { title: "Quality Rate", value: "99.5%" },
    { title: "Resource Utilization", value: "78%" },
  ],
  workOrders: [
    { id: "WO-00451", job: "Assemble Product X", status: "In Progress", due: "2024-07-25" },
    { id: "WO-00452", job: "Calibrate Machine B", status: "Pending", due: "2024-07-28" },
  ],
  alerts: [
    { message: "Low stock warning for Component Y.", priority: "High" },
    { message: "Machine B maintenance is overdue.", priority: "Medium" },
  ]
};

export const mockPurchaseOrders = [
  { poNumber: "PO-00125", vendor: "Component Suppliers Inc.", status: "Fulfilled", total: 15200.00, orderDate: "2024-06-10", expectedDelivery: "2024-06-20" },
  { poNumber: "PO-00126", vendor: "Raw Materials Co.", status: "Sent", total: 8500.00, orderDate: "2024-06-25", expectedDelivery: "2024-07-05" },
  { poNumber: "PO-00127", vendor: "Packaging Solutions", status: "Draft", total: 2300.00, orderDate: "2024-07-01", expectedDelivery: "2024-07-10" },
  { poNumber: "PO-00128", vendor: "Component Suppliers Inc.", status: "Partially Received", total: 5000.00, orderDate: "2024-07-05", expectedDelivery: "2024-07-15" },
];

export const mockInventory = {
  kpiData: [
    { title: "Total Inventory Value", value: "$1,234,567.89" },
    { title: "Items in Stock", value: "12,450" },
    { title: "Low Stock Items", value: "15" },
  ],
  inventory: [
    { sku: "RM-001", name: "Raw Material A", category: "Raw Materials", location: "Warehouse A", cost: 12.50, quantity: 1500, reorderPoint: 500, status: "In Stock" },
    { sku: "COMP-034", name: "Component B", category: "Components", location: "Assembly Line 1", cost: 5.75, quantity: 250, reorderPoint: 200, status: "Low Stock" },
    { sku: "FG-009", name: "Finished Good C", category: "Finished Goods", location: "Warehouse B", cost: 89.99, quantity: 500, reorderPoint: 100, status: "In Stock" },
    { sku: "RM-002", name: "Raw Material D", category: "Raw Materials", location: "Warehouse A", cost: 25.00, quantity: 10, reorderPoint: 50, status: "Out of Stock" },
  ]
};

export const mockProductionPlans = [
  { id: "PP-001", product: "Widget A", quantity: 1000, status: "In Progress", due: "2024-07-25" },
  { id: "PP-002", product: "Component B", quantity: 5000, status: "Pending", due: "2024-07-28" },
  { id: "PP-003", product: "Assembly C", quantity: 250, status: "Completed", due: "2024-07-22" },
  { id: "PP-004", product: "Widget A - Rush", quantity: 200, status: "In Progress", due: "2024-07-20" },
];

export const mockWorkOrders = [
  { id: "WO-00451", job: "Assemble 500x Product X", status: "In Progress", priority: "High", due: "2024-07-25", assignedTo: "Line 1" },
  { id: "WO-00452", job: "Calibrate Machine B", status: "Pending", priority: "Medium", due: "2024-07-28", assignedTo: "Maintenance Team" },
  { id: "WO-00453", job: "Package Order #1088", status: "Pending", priority: "High", due: "2024-07-22", assignedTo: "Shipping Dept" },
  { id: "WO-00454", job: "QA Check for Batch 72", status: "Completed", priority: "Low", due: "2024-07-20", assignedTo: "QA Team" },
];

export const mockOperationsAnalytics = {
  resourceData: [
    { name: "Line 1", utilization: 85 },
    { name: "Line 2", utilization: 78 },
    { name: "CNC Mill", utilization: 92 },
    { name: "Assembly Team", utilization: 65 },
  ],
  efficiencyData: [
    { month: "Jan", planned: 95, actual: 92 },
    { month: "Feb", planned: 95, actual: 93 },
    { month: "Mar", planned: 95, actual: 94 },
    { month: "Apr", planned: 96, actual: 93 },
    { month: "May", planned: 96, actual: 95 },
    { month: "Jun", planned: 97, actual: 96 },
  ]
};

export const mockProductionTracking = [
  {
    title: "Production Plan PP-001 (Widget A)",
    progress: 60,
    status: "On Track",
    details: "600 of 1,000 units completed.",
  },
  {
    title: "Production Plan PP-004 (Widget A - Rush)",
    progress: 90,
    status: "On Track",
    details: "180 of 200 units completed.",
  },
  {
    title: "Production Plan PP-002 (Component B)",
    progress: 15,
    status: "Delayed",
    details: "750 of 5,000 units completed. Material shortage reported.",
  },
];

export const mockScheduling = {
  scheduleData: [
    { id: "PP-001", task: "Widget A - Cutting", machine: "CNC Mill", start: 0, duration: 3, color: "bg-blue-500" },
    { id: "PP-004", task: "Widget A - Rush", machine: "CNC Mill", start: 3, duration: 1, color: "bg-red-500" },
    { id: "PP-002", task: "Component B", machine: "Laser Cutter", start: 1, duration: 4, color: "bg-green-500" },
    { id: "PP-003", task: "Assembly C", machine: "Assembly Line 1", start: 0, duration: 2, color: "bg-yellow-500" },
    { id: "PP-001-2", task: "Widget A - Assembly", machine: "Assembly Line 1", start: 3, duration: 2, color: "bg-blue-500" },
  ],
  resourceData: [
      { name: "John Doe", role: "CNC Operator", avatar: "JD"},
      { name: "Jane Smith", role: "Laser Operator", avatar: "JS"},
      { name: "Peter Jones", role: "Assembly Lead", avatar: "PJ"},
  ]
};
export const mockShipments = [
    { id: "SH-001", orderId: "SO-1234", carrier: "FedEx", tracking: "784512345678", status: "In Transit", origin: "San Francisco, CA", destination: "New York, NY", estDelivery: "2024-07-25" },
    { id: "SH-002", orderId: "SO-1235", carrier: "UPS", tracking: "1Z9876543210", status: "Delivered", origin: "San Francisco, CA", destination: "Chicago, IL", estDelivery: "2024-07-21" },
    { id: "SH-003", orderId: "PO-00125", carrier: "Freight", tracking: "FR-9876", status: "Out for Delivery", origin: "Los Angeles, CA", destination: "San Francisco, CA", estDelivery: "2024-07-23" },
];
export const mockMaintenanceTasks = [
    { id: 'M-001', asset: 'CNC Mill', type: 'Preventive', status: 'Completed', scheduledDate: '2024-07-15', completedDate: '2024-07-15' },
    { id: 'M-002', asset: 'Forklift', type: 'Corrective', status: 'In Progress', scheduledDate: '2024-07-22', completedDate: null },
    { id: 'M-003', asset: 'Laser Cutter', type: 'Preventive', status: 'Scheduled', scheduledDate: '2024-08-01', completedDate: null },
];

// Payroll
export const mockPayrollDashboard = {
  kpiData: [
    { title: "Total Gross Pay (YTD)", value: "$4.8M" },
    { title: "Total Net Pay (YTD)", value: "$3.5M" },
    { title: "Total Tax Liability (YTD)", value: "$1.3M" },
    { title: "Active Employees", value: "73" },
  ],
  chartData: [
    { month: "Jan", gross: 780000, net: 580000 },
    { month: "Feb", gross: 790000, net: 590000 },
    { month: "Mar", gross: 810000, net: 600000 },
    { month: "Apr", gross: 800000, net: 595000 },
    { month: "May", gross: 820000, net: 610000 },
    { month: "Jun", gross: 830000, net: 620000 },
  ],
  upcomingDeadlines: [
      { title: "Run Payroll: June 16-30", deadline: "Due in 3 days", priority: "High" },
      { title: "Approve Timesheets", deadline: "Due in 2 days", priority: "High" },
      { title: "Submit Federal Tax Deposit", deadline: "Due in 1 week", priority: "Medium" },
  ],
  currentPayRun: {
      progress: 25,
      nextStep: "Review Calculations",
      employees: 73,
  }
};

export const mockEmployees = [
    { id: "1", name: "Liam Johnson", email: "liam.j@innovate.com", department: "Engineering", role: "Software Engineer", status: "Active", hireDate: "2022-08-15" },
    { id: "2", name: "Olivia Smith", email: "olivia.s@innovate.com", department: "Marketing", role: "Marketing Manager", status: "Active", hireDate: "2021-03-01" },
    { id: "3", name: "Noah Williams", email: "noah.w@innovate.com", department: "Sales", role: "Account Executive", status: "On Leave", hireDate: "2023-01-10" },
    { id: "4", name: "Emma Brown", email: "emma.b@innovate.com", department: "Product", role: "Product Manager", status: "Active", hireDate: "2022-05-20" },
    { id: "5", name: "James Jones", email: "james.j@innovate.com", department: "Engineering", role: "QA Engineer", status: "Terminated", hireDate: "2021-11-30" },
];

export const mockPayRuns = [
    { period: "June 1-15, 2024", payDate: "2024-06-20", gross: "415,000.00", taxes: "110,000.00", net: "305,000.00", employees: 73, status: "Processed" },
    { period: "May 16-31, 2024", payDate: "2024-06-05", gross: "412,000.00", taxes: "109,500.00", net: "302,500.00", employees: 72, status: "Processed" },
    { period: "May 1-15, 2024", payDate: "2024-05-20", gross: "410,000.00", taxes: "109,000.00", net: "301,000.00", employees: 72, status: "Processed" },
    { period: "April 16-30, 2024", payDate: "2024-05-05", gross: "400,000.00", taxes: "105,000.00", net: "295,000.00", employees: 70, status: "Processed" },
];

export const mockPaySlips = [
    { id: "1", employee: "Liam Johnson", period: "June 1-15, 2024", payDate: "2024-06-20", netPay: "4,178.08" },
    { id: "2", employee: "Olivia Smith", period: "June 1-15, 2024", payDate: "2024-06-20", netPay: "5,208.33" },
    { id: "3", name: "Noah Williams", period: "June 1-15, 2024", payDate: "2024-06-20", netPay: "4,583.33" },
    { id: "4", name: "Emma Brown", period: "June 1-15, 2024", payDate: "2024-06-20", netPay: "6,250.00" },
    { id: "5", name: "Liam Johnson", period: "May 16-31, 2024", payDate: "2024-06-05", netPay: "4,178.08" },
];

export const mockTaxFilings = [
    { id: "TF-001", form: "Federal Form 941", jurisdiction: "Federal", dueDate: "2024-07-31", status: "Upcoming" },
    { id: "TF-002", form: "CA DE 9/9C", jurisdiction: "California", dueDate: "2024-07-31", status: "Upcoming" },
    { id: "TF-003", form: "Federal Form 940", jurisdiction: "Federal", dueDate: "2025-01-31", status: "Upcoming" },
];

export const mockTaxPayments = [
    { id: "TP-001", type: "Federal Income Tax", amount: "85342.10", dueDate: "2024-07-15", status: "Scheduled" },
    { id: "TP-002", type: "Social Security & Medicare", amount: "31745.50", dueDate: "2024-07-15", status: "Scheduled" },
    { id: "TP-003", type: "CA PIT/SDI", amount: "22810.90", dueDate: "2024-07-15", status: "Scheduled" },
    { id: "TP-004", type: "Federal Unemployment (FUTA)", amount: "1240.00", dueDate: "2024-07-31", status: "Upcoming" },
];

export const mockBenefitsAdmin = {
  kpiData: [
    { title: "Total Enrollment", value: "88%" },
    { title: "Monthly Cost", value: "$42,500" },
    { title: "Active Carriers", value: "4" },
  ],
  benefitPlans: [
      { name: "Medical Plan", provider: "Aetna", participants: 68, status: "Active" },
      { name: "Dental Plan", provider: "Delta Dental", participants: 62, status: "Active" },
      { name: "Vision Plan", provider: "VSP", participants: 55, status: "Active" },
      { name: "401(k) Retirement Plan", provider: "Fidelity", participants: 58, status: "Active" },
  ]
};

export const mockTimeAndAttendance = {
  kpiData: [
    { title: "Pending Timesheets", value: "3" },
    { title: "Pending Leave Requests", value: "2" },
    { title: "Timesheet Exceptions", value: "1" },
  ],
  leaveRequests: [
      { employee: "Noah Williams", type: "Vacation", dates: "July 8 - July 12", status: "Pending" },
      { employee: "Liam Johnson", type: "Sick Leave", dates: "July 1", status: "Pending" },
      { employee: "Olivia Smith", type: "Vacation", dates: "June 20 - June 25", status: "Approved" },
  ]
};

export const mockComplianceItems = [
    { item: "FLSA Overtime Rules", category: "Labor Laws", status: "Compliant", lastChecked: "2024-07-01", description: "Fair Labor Standards Act rules for non-exempt employee overtime." },
    { item: "ACA Reporting", category: "Benefits", status: "Compliant", lastChecked: "2024-06-28", description: "Affordable Care Act reporting requirements (Forms 1094/1095)." },
    { item: "I-9 Employment Verification", category: "Hiring", status: "Compliant", lastChecked: "2024-07-05", description: "Verification of employment eligibility for all new hires." },
    { item: "State Withholding Tax Filings", category: "Tax", status: "Compliant", lastChecked: "2024-07-15", description: "Timely filing of all required state-level payroll tax withholdings." },
    { item: "Minimum Wage Compliance", category: "Needs Review", lastChecked: "2024-06-15", description: "State minimum wage increased on July 1. Review employee wages." },
];

// Investments
export const mockPortfolioOverview = {
  portfolioData: {
    totalValue: 125384.52,
    change24h: 1230.12,
    change24hPercent: 0.99,
    totalGainLoss: 25384.52,
    totalGainLossPercent: 25.38,
  },
  holdings: [
    { name: "Apple Inc.", ticker: "AAPL", quantity: 50, price: 172.25, changePercent: 1.5, value: 8612.50 },
    { name: "Bitcoin", ticker: "BTC", quantity: 0.5, price: 65000.00, changePercent: 2.1, value: 32500.00 },
    { name: "NVIDIA Corp", ticker: "NVDA", quantity: 25, price: 950.02, changePercent: 3.2, value: 23750.50 },
    { name: "Ethereum", ticker: "ETH", quantity: 10, price: 3500.00, changePercent: -0.5, value: 35000.00 },
    { name: "Amazon.com", ticker: "AMZN", quantity: 15, price: 180.38, changePercent: 0.5, value: 2705.70 },
  ],
  chartData: [
    { date: "2023-01", value: 100000 },
    { date: "2023-02", value: 105000 },
    { date: "2023-03", value: 110000 },
    { date: "2023-04", value: 108000 },
    { date: "2023-05", value: 115000 },
    { date: "2023-06", value: 125384 },
  ]
};

export const mockStockData = {
  name: "Apple Inc.",
  ticker: "AAPL",
  price: "172.25",
  change: "+2.50",
  changePercent: "+1.5",
  logo: "https://placehold.co/40x40.png",
  marketCap: "2.65T",
  peRatio: "28.5",
  divYield: "0.55%",
  about: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services.",
  chartData: [
    { date: "9:30", value: 170.50 },
    { date: "10:00", value: 171.00 },
    { date: "11:00", value: 171.75 },
    { date: "12:00", value: 171.25 },
    { date: "1:00", value: 172.00 },
    { date: "2:00", value: 172.50 },
    { date: "3:00", value: 172.10 },
    { date: "4:00", value: 172.25 },
  ]
};

export const mockLearningResources = {
  quizzes: [
    {
      question: "What does 'diversification' in a portfolio mean?",
      options: [
        "Putting all your money in one stock",
        "Spreading investments across various assets to reduce risk",
        "Only investing in technology companies",
        "Investing without a strategy",
      ],
      answer: "Spreading investments across various assets to reduce risk",
    },
    {
      question: "What is a 'bull market'?",
      options: [
        "A market where prices are falling",
        "A market that is stagnant",
        "A market where prices are rising",
        "A market for agricultural goods",
      ],
      answer: "A market where prices are rising",
    },
  ],
  resources: [
    { title: "Introduction to Stock Investing", image: "https://placehold.co/600x400.png", hint: "investment book" },
    { title: "Understanding Cryptocurrency", image: "https://placehold.co/600x400.png", hint: "crypto coins" },
    { title: "Retirement Planning 101", image: "https://placehold.co/600x400.png", hint: "saving piggybank" },
    { title: "How to Read Financial Statements", image: "https://placehold.co/600x400.png", hint: "financial document" },
  ]
};

export const mockTradingData = {
  openPositions: [
    { ticker: "AAPL", shares: 50, avgPrice: 150.00, currentPrice: 172.25, gainLoss: 1112.50 },
    { ticker: "NVDA", shares: 25, avgPrice: 800.00, currentPrice: 950.02, gainLoss: 3750.50 },
  ],
  tradeHistory: [
    { id: 1, type: "Buy", ticker: "AAPL", shares: 50, price: 150.00, date: "2023-10-01" },
    { id: 2, type: "Buy", ticker: "NVDA", shares: 25, price: 800.00, date: "2024-02-15" },
    { id: 3, type: "Sell", ticker: "TSLA", shares: 10, price: 200.00, date: "2024-04-20" },
  ]
};

// Projects
export const mockProjectsDashboardData = {
  kpiData: [
    { title: "Active Projects", value: "3", icon: 'Activity' },
    { title: "Overall Profitability", value: "$4,000", icon: 'DollarSign', isPositive: true },
    { title: "Total Billable Hours", value: "1,240", icon: 'Clock' },
    { title: "Tasks Overdue", value: "2", icon: 'ListChecks', isPositive: false },
  ],
  projectBudgetData: [
    { name: "Website Redesign", budget: 25000, actual: 18000 },
    { name: "Marketing Campaign", budget: 50000, actual: 20000 },
    { name: "Hardware Prototype", budget: 75000, actual: 78000 },
  ],
  recentTimeLogs: [
    { employee: "Liam Johnson", project: "Website Redesign", hours: 8, date: "2024-07-22" },
    { employee: "Emma Brown", project: "Hardware Prototype", hours: 6, date: "2024-07-22" },
    { employee: "Olivia Smith", project: "Marketing Campaign", hours: 4, date: "2024-07-21" },
  ]
};

// Job Costing

export const mockJobsWithDetails = [
  { 
    id: "JOB-001", 
    name: "Retail Store Renovation", 
    customer: "QuantumLeap Co.", 
    status: "In Progress", 
    budget: 55000, 
    spent: 30000, 
    profitability: 25000,
    costEntries: [
        { id: uuidv4(), date: '2024-07-15', type: 'Materials', description: 'Lumber and framing', amount: 15000 },
        { id: uuidv4(), date: '2024-07-18', type: 'Labor', description: 'Framing crew - 80 hours', amount: 10000 },
        { id: uuidv4(), date: '2024-07-20', type: 'Permits', description: 'City building permit', amount: 5000 },
    ],
    changeOrders: [
        { id: 'CO-001', date: '2024-07-19', description: 'Additional wiring for new office outlets.', amount: 2500, status: 'Approved' }
    ]
  },
  { 
    id: "JOB-002", 
    name: "Office Building Construction", 
    customer: "Innovate Inc.", 
    status: "Completed", 
    budget: 1200000, 
    spent: 1150000, 
    profitability: 50000,
    costEntries: [],
    changeOrders: []
  },
  { 
    id: "JOB-003", 
    name: "Custom Machinery Build", 
    customer: "Apex Solutions", 
    status: "On Hold", 
    budget: 250000, 
    spent: 100000, 
    profitability: 150000,
    costEntries: [],
    changeOrders: []
  },
  { 
    id: "JOB-004", 
    name: "Consulting Engagement", 
    customer: "Stellar Goods", 
    status: "In Progress", 
    budget: 75000, 
    spent: 80000, 
    profitability: -5000,
    costEntries: [],
    changeOrders: []
  },
];

export const mockJobs = mockJobsWithDetails.map(({ costEntries, changeOrders, ...job }) => job);

export const mockJobCostingDashboard = {
  kpiData: [
    { title: "Active Jobs", value: "3" },
    { title: "Total Budget", value: "$1,580,000" },
    { title: "Total Spent", value: "$1,360,000" },
    { title: "Overall Profitability", value: "$220,000" },
  ],
  budgetVsActualData: mockJobs.map(j => ({ name: j.name, budget: j.budget, actual: j.spent })).slice(0, 3), // Limit for cleaner chart
  recentCostEntries: [
    { job: "Retail Store Renovation", type: "Materials", amount: "5,000.00", date: "2024-07-22" },
    { job: "Office Building Construction", type: "Labor", amount: "12,000.00", date: "2024-07-22" },
    { job: "Consulting Engagement", type: "Subcontractor", amount: "10,000.00", date: "2024-07-21" },
  ]
};

export const mockTimeLogs = [
    { id: uuidv4(), employee: "Liam Johnson", project: "Website Redesign", task: "Frontend Development", hours: 8, date: "2024-07-22" },
    { id: uuidv4(), employee: "Emma Brown", project: "Hardware Prototype", task: "CAD Design", hours: 6, date: "2024-07-22" },
    { id: uuidv4(), employee: "Olivia Smith", project: "Marketing Campaign", task: "Content Creation", hours: 4, date: "2024-07-21" },
    { id: uuidv4(), employee: "Noah Williams", project: "Website Redesign", task: "Client Meeting", hours: 1.5, date: "2024-07-21" },
];

export const mockJobProfitabilityData = mockJobs.map(job => ({
    id: job.id,
    jobName: job.name,
    customer: job.customer,
    revenue: job.budget + job.profitability, // simplified logic for revenue
    costs: job.spent,
}));

export const mockWipReportData = [
  {
    id: "JOB-001",
    jobName: "Retail Store Renovation",
    contractAmount: 65000,
    estimatedCost: 55000,
    costToDate: 30000,
    percentComplete: 54.5, // (30000 / 55000) * 100
    revenueEarned: 35425, // 65000 * 0.545
    billedToDate: 25000,
    overUnderBilling: 10425, // 35425 - 25000 (overbilled)
  },
  {
    id: "JOB-002",
    jobName: "Office Building Construction",
    contractAmount: 1250000,
    estimatedCost: 1150000,
    costToDate: 1150000,
    percentComplete: 100, 
    revenueEarned: 1250000, 
    billedToDate: 1250000,
    overUnderBilling: 0,
  },
  {
    id: "JOB-004",
    jobName: "Consulting Engagement",
    contractAmount: 80000,
    estimatedCost: 75000,
    costToDate: 78000,
    percentComplete: 100, // Costs exceeded estimate, assume 100% complete
    revenueEarned: 80000, // Capped at contract amount
    billedToDate: 80000,
    overUnderBilling: 0,
  },
  {
    id: "JOB-003",
    jobName: "Custom Machinery Build",
    contractAmount: 250000,
    estimatedCost: 180000,
    costToDate: 100000,
    percentComplete: 55.6, // (100000 / 180000) * 100
    revenueEarned: 139000, // 250000 * 0.556
    billedToDate: 150000,
    overUnderBilling: -11000, // (underbilled)
  }
];

// Client Management
export const mockClientBillingData = [
    { id: "1", clientName: "Innovate Inc.", plan: "Professional", status: "Active", nextBilling: "2024-08-01", amount: 99.00 },
    { id: "2", clientName: "Apex Solutions", plan: "Enterprise", status: "Active", nextBilling: "2024-08-01", amount: 299.00 },
    { id: "3", clientName: "QuantumLeap Co.", plan: "Standard", status: "Past Due", nextBilling: "2024-07-15", amount: 49.00 },
    { id: "4", clientName: "Stellar Goods", plan: "Standard", status: "Canceled", nextBilling: "N/A", amount: 0 },
];
export const mockClientComplianceData = [
    { id: "1", clientName: "Innovate Inc.", overallStatus: "Compliant", engagementLetter: "Signed", w9: "On File", bankStatements: "Up to Date" },
    { id: "2", clientName: "Apex Solutions", overallStatus: "Needs Attention", engagementLetter: "Pending", w9: "On File", bankStatements: "Up to Date" },
    { id: "3", clientName: "QuantumLeap Co.", overallStatus: "Compliant", engagementLetter: "Signed", w9: "On File", bankStatements: "Up to Date" },
    { id: "4", clientName: "Stellar Goods", overallStatus: "Missing Documents", engagementLetter: "Signed", w9: "Missing", bankStatements: "Missing" },
];

// Payments
export const mockPaymentsToProcess = [
    { id: 'PAY-001', customer: 'Innovate Inc.', date: '2024-07-22', amount: 5000.00, method: 'ACH', reference: 'Invoice #INV-2024-055' },
    { id: 'PAY-002', customer: 'Apex Solutions', date: '2024-07-21', amount: 1250.00, method: 'Credit Card', reference: 'Invoice #INV-2024-056' },
    { id: 'PAY-003', customer: 'QuantumLeap Co.', date: '2024-07-21', amount: 750.00, method: 'ACH', reference: 'Retainer' },
];

// Help
export const mockKeyboardShortcuts = [
    { section: 'Global', shortcut: '⌘ + B', action: 'Toggle Sidebar' },
    { section: 'Global', shortcut: '⌘ + K', action: 'Open Command Palette (coming soon)' },
    { section: 'Navigation', shortcut: 'G then D', action: 'Go to Dashboard' },
    { section: 'Navigation', shortcut: 'G then I', action: 'Go to Invoicing' },
    { section: 'Actions', shortcut: 'C', action: 'Create New (Invoice, Bill, etc.)' },
    { section: 'Actions', shortcut: 'S', action: 'Save Current Form' },
];

export const mockDashboardPageData = {
    user: {
      name: "Sarah Johnson",
      initials: "SJ",
      title: "Financial Controller",
      role: "Admin",
    },
    mainKpis: {
        netRevenue: "$2.1M",
        growth: "+12.4%",
        healthScore: "94%",
    },
    navItems: [
        { title: "Executive Overview", description: "Comprehensive business summary", icon: 'BarChart' },
        { title: "Financial Health", description: "Financial metrics and analysis", icon: 'DollarSign' },
        { title: "Serva AI Insights", description: "AI-powered business intelligence", icon: 'Wand2' },
        { title: "Workflow Hub", description: "Team productivity and tasks", icon: 'Users' },
        { title: "Process Visibility", description: "Operations monitoring", icon: 'Eye' },
        { title: "Business Context", description: "Industry benchmarks and insights", icon: 'Briefcase' },
        { title: "Customize Dashboard", description: "Personalize your workspace", icon: 'SlidersHorizontal' },
    ],
    metricCards: [
        { title: "Monthly Expenses", value: "$1,939,079", change: "+5.0%", changeType: "increase", icon: 'TrendingUp', details: null },
        { title: "Net Profit", value: "$2,060,189", details: "Income: $6,538,013\nExpenses: $4,477,824", icon: 'DollarSign', change: null, changeType: null },
        { title: "Sales (30 Days)", value: "$1,803,232", change: "+8.4%", changeType: "increase", icon: 'BarChart3', details: null },
        { title: "A/R Total", value: "$5,753,934", details: "Overdue: $1,812,434", icon: 'Receipt', change: null, changeType: null },
    ],
    performanceMetrics: {
        profitLoss: {
            ytd: `$${(2060189 / 1000000).toFixed(1)}M`,
            change: `+12.4%`,
            changeType: "up",
        },
        cashFlow: {
            incoming: `$${(6538013/1000000).toFixed(1)}M`,
            outgoing: `$${(4477824/1000000).toFixed(1)}M`,
            net: `$${((6538013 - 4477824)/1000000).toFixed(1)}M`,
        },
        accountsReceivable: {
            outstanding: `$${(5753934/1000000).toFixed(1)}M`,
            overdue: `$${(1812434/1000000).toFixed(1)}M`,
        }
    },
    alerts: [
        { id: uuidv4(), type: 'critical', message: 'Invoice #INV-2024-049 from Momentum LLC is 32 days overdue.'},
        { id: uuidv4(), type: 'warning', message: 'Low stock warning for Raw Material D (10 units remaining).'},
    ],
    chartData: [
        { month: "Jan", income: 1050000, expenses: 700000 },
        { month: "Feb", income: 1100000, expenses: 750000 },
        { month: "Mar", income: 1150000, expenses: 800000 },
        { month: "Apr", income: 1080000, expenses: 780000 },
        { month: "May", income: 1250000, expenses: 850000 },
        { month: "Jun", income: 1300000, expenses: 880000 },
    ],
    financialHealthData: {
        kpis: [
            { title: 'Current Ratio', value: '2.1', status: 'Healthy' },
            { title: 'Quick Ratio', value: '1.5', status: 'Healthy' },
            { title: 'Debt-to-Equity', value: '0.4', status: 'Excellent' },
            { title: 'Working Capital', value: '$1.4M', status: '' },
        ],
        cashFlowData: [
            { month: 'Jan', cashFlow: 350 }, { month: 'Feb', cashFlow: 350 },
            { month: 'Mar', cashFlow: 350 }, { month: 'Apr', cashFlow: 300 },
            { month: 'May', cashFlow: 400 }, { month: 'Jun', cashFlow: 420 },
        ],
        profitabilityData: [
            { month: 'Jan', profit: 350, loss: 0 }, { month: 'Feb', profit: 350, loss: 0 },
            { month: 'Mar', profit: 350, loss: 0 }, { month: 'Apr', profit: 300, loss: 0 },
            { month: 'May', profit: 400, loss: 0 }, { month: 'Jun', profit: 420, loss: 0 },
        ],
    },
    servaAiInsightsData: [
        { type: "Anomaly Detection", summary: "A significant revenue dip was detected in April, which is inconsistent with the overall growth trend. This warrants further investigation into sales performance for that month." },
        { type: "Trend Analysis", summary: "Excluding the anomaly in April, your revenue shows a consistent upward trend over the past six months, indicating strong, sustainable growth." },
        { type: "Cash Flow Forecast", summary: "Based on current trends, a potential cash surplus of $500k is projected for Q3. Consider strategic investments or debt repayment." },
        { type: "Key Highlight", summary: "Cost of Goods Sold (COGS) and Salaries are your two largest expense categories, representing 65% of your total operating costs. Optimizing these areas could yield significant savings." },
    ],
    workflowHubData: {
        kpis: [
            { title: 'Pending Approvals', value: 3 },
            { title: 'Overdue Tasks', value: 1 },
            { title: 'Team Capacity', value: '85%' },
        ],
        tasks: [
            { id: '1', name: 'Review Q2 Financials', assignee: 'Sarah Johnson', due: '2 days' },
            { id: '2', name: 'Approve PO-00126', assignee: 'John Doe', due: '1 day' },
            { id: '3', name: 'Finalize Marketing Budget', assignee: 'Olivia Smith', due: '3 days' },
        ],
        teamMembers: [
            { name: 'Sarah Johnson', capacity: 90 },
            { name: 'John Doe', capacity: 75 },
            { name: 'Olivia Smith', capacity: 88 },
        ]
    },
    processVisibilityData: {
      kpiData: [
        { title: "Production Efficiency (OEE)", value: "85%" },
        { title: "On-Time Delivery", value: "98.2%" },
        { title: "Quality Rate", value: "99.5%" },
      ],
      productionPlanData: [
          { name: "Widget A", completed: 600, remaining: 400},
          { name: "Component B", completed: 750, remaining: 4250},
          { name: "Assembly C", completed: 250, remaining: 0},
      ]
    },
    businessContextData: {
      marketTrends: [
          "Increased demand for sustainable products is driving a 15% market shift.",
          "Supply chain disruptions in Southeast Asia may impact component costs by up to 10%.",
          "Adoption of AI in financial planning is becoming a competitive necessity."
      ],
      competitorBenchmarks: {
        revenueGrowth: { self: 12.4, industry: 10.2 },
        profitMargin: { self: 18.9, industry: 16.5 },
      }
    },
    shortcuts: [
        { label: "Run payroll", icon: 'Users', href: "/payroll/pay-runs" },
        { label: "Get paid online", icon: 'DollarSign', href: "/payments/process" },
        { label: "Create invoice", icon: 'FilePlus', href: "/invoicing/new" },
        { label: "Record expense", icon: 'Receipt', href: "/accounting/accounts-payable/bills" },
    ],
    expenseChartData: {
        total: "$1,939,079",
        change: "+296%",
        changeType: "increase",
        breakdown: [
            { name: "Rent & Lease", value: 400000, color: "hsl(var(--chart-1))" },
            { name: "Job Supplies", value: 650000, color: "hsl(var(--chart-2))" },
            { name: "Consultancy", value: 150000, color: "hsl(var(--chart-5))" },
            { name: "Insurance", value: 439079, color: "hsl(var(--chart-3))" },
            { name: "Other", value: 300000, color: "hsl(var(--chart-4))" },
        ],
    },
    salesChartData: {
        total: "$1,803,232.15",
        data: [
            { name: 'Mar 11', Sales: 200000 },
            { name: 'Mar 17', Sales: 800000 },
            { name: 'Mar 24', Sales: 1400000 },
            { name: 'Mar 31', Sales: 1000000 },
            { name: 'Apr 07', Sales: 400000 },
        ],
    },
    arChartData: {
        total: "$5,753,933.55",
        breakdown: [
            { name: "Current", value: 1812434.45, color: "hsl(var(--chart-1))" },
            { name: "1-7 days", value: 1052572.03, color: "hsl(var(--chart-2))" },
            { name: "8-14 days", value: 179919.00, color: "hsl(var(--chart-5))" },
            { name: "15+ days", value: 2709008.07, color: "hsl(var(--chart-3))" },
        ],
    },
    apChartData: {
        total: "$4,357.50",
        breakdown: [
            { name: "Current", value: 0.00, color: "hsl(var(--chart-1))" },
            { name: "1-7 days", value: 100.00, color: "hsl(var(--chart-2))" },
            { name: "8-14 days", value: 0.00, color: "hsl(var(--chart-5))" },
            { name: "15+ days", value: 4257.50, color: "hsl(var(--chart-3))" },
        ],
    },
    bankAccountsList: [
        { name: "(MMA) | Guardian Growth", balance: 782411.38, icon: 'Landmark' },
        { name: "Amazon Credit", balance: 0.00, icon: 'CreditCard' },
        { name: "BOI - Business Checking", balance: -52208.00, icon: 'Landmark' },
        { name: "Checking", balance: -127330.11, icon: 'Landmark' },
    ],
  };
    
