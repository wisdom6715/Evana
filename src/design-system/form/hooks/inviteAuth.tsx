// hooks/inviteAuth.tsx
import { useEffect, useState } from 'react';
import { User } from '@/design-system/index';
import { auth, db } from '@/lib/firebaseConfig';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let unsubscribeUser: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          // Set up real-time listener for user document
          unsubscribeUser = onSnapshot(
            doc(db, 'users', firebaseUser.uid),
            (doc) => {
              if (doc.exists()) {
                const userData = doc.data();
                // Ensure all required properties are present
                const user: User = {
                  uid: doc.id,
                  email: userData.email || firebaseUser.email || '',
                  isAdmin: userData.isAdmin || false,
                  createdAt: userData.createdAt,
                  companyId: userData.companyId,
                  displayName: userData.displayName || firebaseUser.displayName || null,
                  photoURL: userData.photoURL || firebaseUser.photoURL || null,
                };
                setUser(user);
              }
              setLoading(false);
            },
            (error) => {
              setError(error);
              setLoading(false);
            }
          );
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    });

    // Cleanup subscriptions
    return () => {
      unsubscribeAuth();
      if (unsubscribeUser) {
        unsubscribeUser();
      }
    };
  }, []);

  return { user, loading, error };
}