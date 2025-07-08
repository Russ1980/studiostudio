
'use server';

import { firestore } from './firebase-admin';
import { mockClients, mockInvoices, mockEmployees, mockJobsWithDetails as mockJobs, mockTaxFilings, mockTaxPayments, mockBankAccounts, mockTasks, mockChartOfAccounts, mockTimeLogs, mockJournalEntries, mockPurchaseOrders, mockInventory, mockProductionPlans, mockWorkOrders } from './data';

// Define the shape of the result object that the MigrationButton expects.
type MigrationResult = {
  success: boolean;
  migrated?: number;
  error?: string;
};

// This is the complete and correct function.
// It returns a Promise that resolves with the MigrationResult object.
export async function migrateData(
  data: any[],
  targetCollection: string,
  transform?: (item: any) => any
): Promise<MigrationResult> {
  
  // 1. Get the database instance.
  // const firestore = getFirestoreInstance();

  // 2. THIS IS THE CRITICAL NULL CHECK.
  //    It happens ONCE, at the very beginning, BEFORE the loop.
  if (!firestore) {
    console.error("MIGRATION FAILED: Firestore database is not initialized.");
    // Return an object that matches the MigrationResult type.
    return { success: false, error: "Database not initialized." };
  }

  // 3. Since the check passed, it is now safe to use firestore.
  const batch = firestore.batch();

  data.forEach(item => {
    const docId = item.id;
    if (!docId) {
      return; // Skip this item
    }
    
    // This line is now safe because of the check in step 2.
    const docRef = firestore.collection(targetCollection).doc(docId);
    const transformedData = transform ? transform(item) : item;
    batch.set(docRef, transformedData);
  });

  // 4. Commit the batch and return the final status object.
  try {
    await batch.commit();
    return { success: true, migrated: data.length };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
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
