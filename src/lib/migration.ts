
'use server';

import { firestore } from './firebase-admin';
import { supabase } from './supabase-client';

type TransformFunction<T, U> = (data: T) => U;

interface MigrateOptions<T, U> {
    batchSize?: number;
    transform?: TransformFunction<T, U>;
}

export async function migrateTable<T extends { id: any }, U = T>(
    sourceTable: string,
    targetCollection: string,
    options: MigrateOptions<T, U> = {}
) {
    if (!firestore) {
        return { success: false, error: "Firebase Admin SDK not initialized. Check your environment variables." };
    }

    const { batchSize = 500, transform } = options;

    try {
        const { count, error: countError } = await supabase
            .from(sourceTable)
            .select('*', { count: 'exact', head: true });

        if (countError) throw countError;
        if (count === null) throw new Error('Could not get count of records from Supabase.');

        let migratedCount = 0;
        for (let i = 0; i < count; i += batchSize) {
            const { data, error } = await supabase
                .from(sourceTable)
                .select('*')
                .range(i, i + batchSize - 1);

            if (error) throw error;
            if (!data) continue;

            const batch = firestore.batch();
            data.forEach((item: any) => {
                const docId = item.id.toString();
                const docRef = firestore.collection(targetCollection).doc(docId);
                const transformedData = transform ? transform(item as T) : item;
                batch.set(docRef, transformedData);
            });

            await batch.commit();
            migratedCount += data.length;
        }

        return { success: true, migrated: migratedCount };
    } catch (error: any) {
        console.error(`Migration failed for table ${sourceTable}:`, error);
        return { success: false, error: error.message };
    }
}

export async function migrateTransactionData() {
    return migrateTable('transactions', 'transactions', { batchSize: 100 });
}
