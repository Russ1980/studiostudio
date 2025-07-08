
'use server';

import { firestore } from './firebase-admin';
import { mockClients, mockInvoices, mockEmployees, mockJobsWithDetails as mockJobs, mockTaxFilings, mockTaxPayments, mockBankAccounts, mockTasks, mockChartOfAccounts, mockTimeLogs, mockJournalEntries, mockPurchaseOrders, mockInventory, mockProductionPlans, mockWorkOrders } from './data';

// Define the shape of the result object for clarity
type MigrationResult = {
  success: boolean;
  migrated?: number;
  error?: string;
};

// The function now correctly returns a Promise of our result object
export async function migrateData(
  data: any[],
  targetCollection: string,
  transform?: (item: any) => any
): Promise<MigrationResult> {
  
  // THE CRITICAL NULL CHECK: Happens once, at the very beginning.
  if (!firestore) {
    console.error("CRITICAL: Firestore is not initialized. Aborting migration.");
    return { success: false, error: "Database not initialized." };
  }

  const batch = firestore.batch();

  data.forEach(item => {
    const docId = item.id;
    if (!docId) {
      console.warn("Skipping item in migration due to missing ID:", item);
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
    console.error("Error committing migration batch:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}


export async function migrateClientData() {
    return newMigrateData(mockClients, 'clients');
}

export async function migrateInvoiceData() {
    return newMigrateData(mockInvoices, 'invoices');
}

export async function migrateEmployeeData() {
    return newMigrateData(mockEmployees, 'employees');
}

export async function migrateJobData() {
    return newMigrateData(mockJobs, 'jobs');
}

export async function migrateTaxFilings() {
    return newMigrateData(mockTaxFilings, 'taxFilings');
}

export async function migrateTaxPayments() {
    return newMigrateData(mockTaxPayments, 'taxPayments');
}

export async function migrateBankAccounts() {
    return newMigrateData(mockBankAccounts, 'bankAccounts');
}

export async function migrateTaskData() {
    return newMigrateData(mockTasks, 'tasks');
}

export async function migrateChartOfAccounts(): Promise<MigrationResult> {
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
    return newMigrateData(mockTimeLogs, 'timeLogs');
}

export async function migrateJournalEntries() {
    return newMigrateData(mockJournalEntries, 'journalEntries');
}

export async function migratePurchaseOrders() {
    return newMigrateData(mockPurchaseOrders, 'purchaseOrders');
}

export async function migrateInventory() {
    return newMigrateData(mockInventory.inventory, 'inventory');
}

export async function migrateProductionPlans() {
    return newMigrateData(mockProductionPlans, 'productionPlans');
}

export async function migrateWorkOrders() {
    return newMigrateData(mockWorkOrders, 'workOrders');
}


export async function newMigrateData(
  data: any[],
  targetCollection: string,
  transform?: (item: any) => any
) {
  if (!firestore) {
    console.error("NEW_MIGRATE_DATA: Firestore is not initialized.");
    return { success: false, error: "Database not initialized." };
  }

  const batch = firestore.batch();

  data.forEach(item => {
    const docId = item.id;
    if (!docId) {
      return;
    }
    const docRef = firestore.collection(targetCollection).doc(docId);
    const transformedData = transform ? transform(item) : item;
    batch.set(docRef, transformedData);
  });

  try {
    await batch.commit();
    return { success: true, migrated: data.length };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}
