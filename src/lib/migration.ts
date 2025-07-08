
'use server';

import { firestore } from './firebase-admin';
import { mockClients, mockInvoices, mockEmployees, mockJobsWithDetails as mockJobs, mockTaxFilings, mockTaxPayments, mockBankAccounts, mockTasks, mockChartOfAccounts, mockTimeLogs, mockJournalEntries, mockPurchaseOrders, mockInventory, mockProductionPlans, mockWorkOrders } from './data';

//
// === PASTE THIS EXACT TEST CODE INTO YOUR EDITOR ===
// === IT REPLACES THE OLD migrateData FUNCTION COMPLETELY ===
//
export async function migrateData(data: any[], targetCollection: string, transform?: (item: any) => any) {
    
    // This is a test to see if our changes are deploying.
    // This code has an INTENTIONAL and OBVIOUS error.
    const testVariable = "This is a test";
    testVariable.thisFunctionDoesNotExist(); // THIS LINE SHOULD CAUSE THE BUILD TO FAIL

}


export async function migrateClientData() {
    // This will likely fail due to the new signature, which is part of the test.
    return migrateData(mockClients, 'clients');
}

export async function migrateInvoiceData() {
    return migrateData(mockInvoices, 'invoices');
}

export async function migrateEmployeeData() {
    return migrateData(mockEmployees, 'employees');
}

export async function migrateJobData() {
    return migrateData(mockJobs, 'jobs');
}

export async function migrateTaxFilings() {
    return migrateData(mockTaxFilings, 'taxFilings');
}

export async function migrateTaxPayments() {
    return migrateData(mockTaxPayments, 'taxPayments');
}

export async function migrateBankAccounts() {
    return migrateData(mockBankAccounts, 'bankAccounts');
}

export async function migrateTaskData() {
    return migrateData(mockTasks, 'tasks');
}

export async function migrateChartOfAccounts() {
    if (!firestore) {
        return { success: false, error: "Firebase Admin SDK not initialized." };
    }
    try {
        const docRef = firestore.collection('chartOfAccounts').doc('main');
        await docRef.set(mockChartOfAccounts);
        return { success: true, migrated: 1 };
    } catch (error: any) {
        console.error(`Migration failed for collection chartOfAccounts:`, error);
        return { success: false, error: error.message };
    }
}

export async function migrateTimeLogs() {
    return migrateData(mockTimeLogs, 'timeLogs');
}

export async function migrateJournalEntries() {
    return migrateData(mockJournalEntries, 'journalEntries');
}

export async function migratePurchaseOrders() {
    return migrateData(mockPurchaseOrders, 'purchaseOrders');
}

export async function migrateInventory() {
    return migrateData(mockInventory.inventory, 'inventory');
}

export async function migrateProductionPlans() {
    return migrateData(mockProductionPlans, 'productionPlans');
}

export async function migrateWorkOrders() {
    return migrateData(mockWorkOrders, 'workOrders');
}
