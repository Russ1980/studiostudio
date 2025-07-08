
'use server';

import { firestore } from './firebase-admin';
import { mockClients, mockInvoices, mockEmployees, mockJobsWithDetails as mockJobs, mockTaxFilings, mockTaxPayments, mockBankAccounts, mockTasks, mockChartOfAccounts, mockTimeLogs, mockJournalEntries, mockPurchaseOrders, mockInventory, mockProductionPlans, mockWorkOrders } from './data';

/**
 * A generic function to migrate an array of mock data into a specified Firestore collection.
 * It handles batching and sanitizes the document ID.
 * @param sourceData The array of data to migrate.
 * @param targetCollection The name of the Firestore collection.
 * @param options An object containing migration options like the key to use for the document ID.
 * @returns An object indicating success or failure.
 */
export async function migrateData<T extends Record<string, any>>(
    sourceData: T[],
    targetCollection: string,
    options: { idKey: keyof T; batchSize?: number }
) {
    // Part 1: THE FIX - Check the database object *before* doing anything else.
    // This 'if' block MUST be here, outside and before the loop.
    if (!firestore) {
        console.error("CRITICAL ERROR: Firestore database is not initialized. Cannot run migration.");
        return { success: false, error: "Firestore not initialized." }; // Stop the entire function
    }

    // Part 2: Now that the check is done, it is safe to use firestore.
    console.log(`Firestore is initialized. Starting batch migration for ${targetCollection}...`);
    const { idKey, batchSize = 400 } = options;

    try {
        let migratedCount = 0;
        for (let i = 0; i < sourceData.length; i += batchSize) {
            const batch = firestore.batch(); // It's now safe to create the batch
            const dataSlice = sourceData.slice(i, i + batchSize);

            dataSlice.forEach((item: T) => {
                const docIdValue = item[idKey];
                if (!docIdValue) {
                    console.warn("Skipping item in migration due to missing ID:", item);
                    return; // Skips this item in the forEach loop
                }
                
                // Sanitize the ID for Firestore
                const docId = String(docIdValue).replace(/[\/\s#]/g, '_');

                // This line is now safe because of the check in Part 2.
                const docRef = firestore.collection(targetCollection).doc(docId);
                batch.set(docRef, item);
            });

            await batch.commit();
            migratedCount += dataSlice.length;
        }

        console.log(`Success! Batch commit of ${migratedCount} documents to ${targetCollection} is complete.`);
        return { success: true, migrated: migratedCount };
    } catch (error: any) {
        console.error(`Error during final batch commit for ${targetCollection}:`, error);
        return { success: false, error: error.message };
    }
}


export async function migrateClientData() {
    return migrateData(mockClients, 'clients', { idKey: 'id' });
}

export async function migrateInvoiceData() {
    return migrateData(mockInvoices, 'invoices', { idKey: 'invoice' });
}

export async function migrateEmployeeData() {
    return migrateData(mockEmployees, 'employees', { idKey: 'id' });
}

export async function migrateJobData() {
    return migrateData(mockJobs, 'jobs', { idKey: 'id' });
}

export async function migrateTaxFilings() {
    return migrateData(mockTaxFilings, 'taxFilings', { idKey: 'id' });
}

export async function migrateTaxPayments() {
    return migrateData(mockTaxPayments, 'taxPayments', { idKey: 'id' });
}

export async function migrateBankAccounts() {
    return migrateData(mockBankAccounts, 'bankAccounts', { idKey: 'id' });
}

export async function migrateTaskData() {
    return migrateData(mockTasks, 'tasks', { idKey: 'id' });
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
    return migrateData(mockTimeLogs, 'timeLogs', { idKey: 'id' });
}

export async function migrateJournalEntries() {
    return migrateData(mockJournalEntries, 'journalEntries', { idKey: 'entryNo' });
}

export async function migratePurchaseOrders() {
    return migrateData(mockPurchaseOrders, 'purchaseOrders', { idKey: 'poNumber' });
}

export async function migrateInventory() {
    return migrateData(mockInventory.inventory, 'inventory', { idKey: 'sku' });
}

export async function migrateProductionPlans() {
    return migrateData(mockProductionPlans, 'productionPlans', { idKey: 'id' });
}

export async function migrateWorkOrders() {
    return migrateData(mockWorkOrders, 'workOrders', { idKey: 'id' });
}
