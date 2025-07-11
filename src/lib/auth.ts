import type { User as FirebaseUser } from 'firebase/auth';

export type AuthUser = {
  uid: string;
  name: string;
  initials: string;
  email: string | null;
  title: string;
  role: string;
};

// This function maps a Firebase User object to our app's AuthUser type
export function mapFirebaseUserToAuthUser(firebaseUser: FirebaseUser): AuthUser {
  const name = firebaseUser.displayName || 'New User';
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return {
    uid: firebaseUser.uid,
    name,
    initials,
    email: firebaseUser.email,
    title: 'User', // You can enhance this with custom claims
    role: 'Admin', // Default role, can be enhanced
  };
}
