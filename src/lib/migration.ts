
'use server';

import { firestore } from './firebase-admin';
import { mockClients, mockInvoices, mockEmployees, mockJobsWithDetails as mockJobs, mockTaxFilings, mockTaxPayments, mockBankAccounts, mockTasks, mockChartOfAccounts, mockTimeLogs, mockJournalEntries, mockPurchaseOrders, mockInventory, mockProductionPlans, mockWorkOrders } from './data';

export async function migrateData(data: any[], targetCollection: string, transform?: (item: any) => any) {
    
    if (!firestore) {
        console.error("CRITICAL: Firestore is not initialized.");
        return { success: false, error: "Database not initialized." };
    }

    const batch = firestore.batch();

    data.forEach(item => {
        const docId = item.id;
        if (!docId) {
            console.warn("Skipping item with no ID:", item);
            return;
        }
        const docRef = firestore.collection(targetCollection).doc(docId); 
        const transformedData = transform ? transform(item) : item;
        batch.set(docRef, transformedData);
    });

    try {
        await batch.commit();
        console.log(`Success! Migrated ${data.length} docs to ${targetCollection}.`);
        return { success: true, migrated: data.length };
    } catch (error) {
        console.error("Error committing batch:", error);
        return { success: false, error: (error as Error).message };
    }
}


export async function migrateClientData() {
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
