

'use server';

import { firestore } from './firebase-admin';
import { mockClients, mockInvoices, mockEmployees, mockJobsWithDetails as mockJobs, mockTaxFilings, mockTaxPayments, mockBankAccounts, mockTasks, mockChartOfAccounts } from './data';

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
        return { success: true, migrated: 1 }; // Migrated 1 document
    } catch (error: any) {
        console.error(`Migration failed for collection chartOfAccounts:`, error);
        return { success: false, error: error.message };
    }
}
