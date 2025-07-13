
import type { User as FirebaseUser } from 'firebase/auth';

export type AuthUser = {
  uid: string;
  name: string;
  initials: string;
  email: string | null;
  title: string;
  role: string;
};

// This is the UID for the designated admin user.
const ADMIN_UID = 'hDk9W59tFlW6rFOF1ownI4gV4Wa2';

// This function maps a Firebase User object to our app's AuthUser type
export function mapFirebaseUserToAuthUser(firebaseUser: FirebaseUser): AuthUser {
  const name = firebaseUser.displayName || 'Sarah Johnson'; // Default name for demo
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  // Check if the logged-in user is the designated admin
  const is_admin = firebaseUser.uid === ADMIN_UID;

  return {
    uid: firebaseUser.uid,
    name,
    initials,
    email: firebaseUser.email,
    // Assign role and title based on whether the user is an admin
    title: is_admin ? 'Financial Controller' : 'User',
    role: is_admin ? 'Admin' : 'User',
  };
}
