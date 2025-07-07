
'use server';

import { firestore } from './firebase-admin';
import { mockLedgerTransactions, mockClients, mockInvoices, mockEmployees, mockJobsWithDetails as mockJobs } from './data';

type TransformFunction<T, U> = (data: T) => U;

interface MigrateOptions<T, U> {
    batchSize?: number;
    transform?: TransformFunction<T, U>;
    idKey: keyof T;
}

export async function migrateData<T extends Record<string, any>, U = T>(
    sourceData: T[],
    targetCollection: string,
    options: MigrateOptions<T, U>
) {
    if (!firestore) {
        return { success: false, error: "Firebase Admin SDK not initialized. Check your environment variables." };
    }

    const { batchSize = 500, transform, idKey } = options;

    try {
        let migratedCount = 0;
        for (let i = 0; i < sourceData.length; i += batchSize) {
            const dataSlice = sourceData.slice(i, i + batchSize);
            const batch = firestore.batch();
            
            dataSlice.forEach((item: T) => {
                const docId = String(item[idKey]).replace(/#/g, '');
                if (!docId) {
                    console.warn('Skipping item with no ID:', item);
                    return;
                }
                const docRef = firestore.collection(targetCollection).doc(docId);
                const transformedData = transform ? transform(item) : item;
                batch.set(docRef, transformedData);
            });

            await batch.commit();
            migratedCount += dataSlice.length;
        }

        return { success: true, migrated: migratedCount };
    } catch (error: any) {
        console.error(`Migration failed for collection ${targetCollection}:`, error);
        return { success: false, error: error.message };
    }
}

export async function migrateTransactionData() {
    return migrateData(mockLedgerTransactions, 'transactions', { idKey: 'journalNo' });
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
