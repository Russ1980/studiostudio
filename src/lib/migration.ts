
import { firestore } from './firebase-admin';
import {
  mockClients,
  mockInvoices,
  mockEmployees,
  mockJobs,
  mockTaxFilings,
  mockTaxPayments,
  mockBankAccounts,
  mockTasks,
  mockChartOfAccounts,
  mockTimeLogs,
  mockJournalEntries,
  mockPurchaseOrders,
  mockInventory,
  mockProductionPlans,
  mockWorkOrders,
} from './data';

// Define the shape of the result object that the MigrationButton expects.
type MigrationResult = {
  success: boolean;
  migrated?: number;
  error?: string;
};

// This is the core, corrected migration logic. This function is NOT exported.
// It is only used by the helper functions below.
async function migrateData(
  data: any[],
  targetCollection: string,
  transform?: (item: any) => any,
  idKey: string = 'id'
): Promise<MigrationResult> {
  if (!firestore) {
    console.error("MIGRATION FAILED: Firestore is not initialized.");
    return { success: false, error: "Database not initialized." };
  }

  const batch = firestore.batch();
  let migratedCount = 0;
  data.forEach(item => {
    const docId = item[idKey] || item.id;
    if (docId) {
      const docRef = firestore.collection(targetCollection).doc(String(docId));
      const transformedData = transform ? transform(item) : item;
      batch.set(docRef, transformedData);
      migratedCount++;
    } else {
        console.warn(`Skipping item in ${targetCollection} migration due to missing ID with key '${idKey}':`, item);
    }
  });

  try {
    await batch.commit();
    return { success: true, migrated: migratedCount };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}

// Special case for chart of accounts since it's a single document
async function migrateSingleDoc(docData: object, collection: string, docId: string): Promise<MigrationResult> {
    if (!firestore) {
        console.error("MIGRATION FAILED: Firestore is not initialized.");
        return { success: false, error: "Database not initialized." };
    }
    try {
        await firestore.collection(collection).doc(docId).set(docData);
        return { success: true, migrated: 1 };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return { success: false, error: errorMessage };
    }
}


// === EXPORTED HELPER FUNCTIONS ===
// These are the functions your page needs. They all call the core logic.

export const migrateClientData = () => migrateData(mockClients, 'clients');
export const migrateInvoiceData = () => migrateData(mockInvoices, 'invoices', undefined, 'invoice');
export const migrateEmployeeData = () => migrateData(mockEmployees, 'employees');
export const migrateJobData = () => migrateData(mockJobs, 'jobs');
export const migrateTaxFilings = () => migrateData(mockTaxFilings, 'taxFilings');
export const migrateTaxPayments = () => migrateData(mockTaxPayments, 'taxPayments');
export const migrateBankAccounts = () => migrateData(mockBankAccounts, 'bankAccounts');
export const migrateTaskData = () => migrateData(mockTasks, 'tasks');
export const migrateTimeLogs = () => migrateData(mockTimeLogs, 'timeLogs');
export const migrateJournalEntries = () => migrateData(mockJournalEntries, 'journalEntries', undefined, 'entryNo');
export const migratePurchaseOrders = () => migrateData(mockPurchaseOrders, 'purchaseOrders', undefined, 'poNumber');
export const migrateInventory = () => migrateData(mockInventory.inventory, 'inventory', undefined, 'sku');
export const migrateProductionPlans = () => migrateData(mockProductionPlans, 'productionPlans');
export const migrateWorkOrders = () => migrateData(mockWorkOrders, 'workOrders');
export const migrateChartOfAccounts = () => migrateSingleDoc(mockChartOfAccounts, 'chartOfAccounts', 'main');
