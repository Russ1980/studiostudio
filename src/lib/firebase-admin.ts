
import admin from 'firebase-admin';

// Check if the service account details are provided
const serviceAccountKeyProvided = 
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY;

const serviceAccount = serviceAccountKeyProvided ? {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
} : null;

if (!admin.apps.length) {
    if (serviceAccount) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        } catch (error) {
            console.error('Firebase admin initialization error:', error);
        }
    } else {
        console.warn('Firebase Admin SDK service account credentials not provided. Server-side Firebase features will be disabled.');
    }
}

export const firestore = admin.apps.length ? admin.firestore() : null;
