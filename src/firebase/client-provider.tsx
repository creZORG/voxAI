'use client';
import {useEffect, useState} from 'react';
import {FirebaseProvider} from '@/firebase/provider';
import {getApps} from 'firebase/app';
import {initializeFirebase} from '.';

export function FirebaseClientProvider({children}: {children: React.ReactNode}) {
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(
    getApps().length > 0
  );

  useEffect(() => {
    if (!isFirebaseInitialized) {
      initializeFirebase();
      setIsFirebaseInitialized(true);
    }
  }, [isFirebaseInitialized]);

  if (!isFirebaseInitialized) {
    return null; // Or a loading spinner
  }

  return <FirebaseProvider>{children}</FirebaseProvider>;
}
