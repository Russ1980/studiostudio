
'use server';

import { firestore } from './firebase-admin';
import { mockLedgerTransactions } from './data';

type TransformFunction<T, U> = (data: T) => U;

interface MigrateOptions<T, U> {
    batchSize?: number;
    transform?: TransformFunction<T, U>;
}

export async function migrateData<T extends { journalNo: any }, U = T>(
    sourceData: T[],
    targetCollection: string,
    options: MigrateOptions<T, U> = {}
) {
    if (!firestore) {
        return { success: false, error: "Firebase Admin SDK not initialized. Check your environment variables." };
    }

    const { batchSize = 500, transform } = options;

    try {
        let migratedCount = 0;
        for (let i = 0; i < sourceData.length; i += batchSize) {
            const dataSlice = sourceData.slice(i, i + batchSize);
            const batch = firestore.batch();
            
            dataSlice.forEach((item: T) => {
                // Using journalNo as document ID for transactions
                const docId = item.journalNo.toString();
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
    // We'll use the mockLedgerTransactions as the source data
    return migrateData(mockLedgerTransactions, 'transactions');
}
