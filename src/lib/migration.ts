
'use server';

import { firestore } from './firebase-admin';

// Define the shape of the result object that the MigrationButton expects.
type MigrationResult = {
  success: boolean;
  migrated?: number;
  error?: string;
};

// This is the core, corrected migration logic. This function is NOT exported.
// It is only used by the helper functions in actions.ts
export async function migrateData(
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
export async function migrateSingleDoc(docData: object, collection: string, docId: string): Promise<MigrationResult> {
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
