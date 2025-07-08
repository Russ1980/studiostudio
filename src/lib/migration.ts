
'use server';

import { firestore } from './firebase-admin';

type MigrationResult = {
  success: boolean;
  migrated?: number;
  error?: string;
};

export async function migrateData(
  data: any[],
  targetCollection: string,
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
      batch.set(docRef, item);
      migratedCount++;
    }
  });

  try {
    await batch.commit();
    return { success: true, migrated: migratedCount };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
}

export async function migrateSingleDoc(
    docData: object,
    collection: string,
    docId: string
): Promise<MigrationResult> {
    if (!firestore) {
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

    