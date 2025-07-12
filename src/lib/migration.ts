'use server';

import { firestore } from './firebase-admin';
import { type firestore as adminFirestore } from 'firebase-admin';

// Define the shape of the result object.
type MigrationResult = {
  success: boolean;
  migrated?: number;
  error?: string;
};

// Placeholder for the currently logged-in user's ID.
const FAKE_USER_ID = "user-placeholder-id";

// This is our core logic. It's now only used by our Server Actions file.
export async function migrateData(
  db: adminFirestore.Firestore,
  data: any[],
  targetCollection: string,
  idKey: string = 'id'
): Promise<MigrationResult> {
  const batch = db.batch();
  data.forEach(item => {
    // Add the userId to each item before saving
    const itemWithUser = { ...item, userId: FAKE_USER_ID };
    // Use the idKey to dynamically get the document ID
    let docId = item[idKey];
    if (docId) {
      const docRef = db.collection(targetCollection).doc(String(docId));
      batch.set(docRef, itemWithUser);
    } else {
        // If no ID key, let Firestore generate one
        const docRef = db.collection(targetCollection).doc();
        batch.set(docRef, itemWithUser);
    }
  });

  try {
    await batch.commit();
    return { success: true, migrated: data.length };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}

export async function migrateSingleDoc(
    db: adminFirestore.Firestore,
    docData: object,
    collection: string,
    docId: string
): Promise<MigrationResult> {
    try {
        const docWithUser = { ...docData, userId: FAKE_USER_ID };
        await db.collection(collection).doc(docId).set(docWithUser);
        return { success: true, migrated: 1 };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return { success: false, error: errorMessage };
    }
}
