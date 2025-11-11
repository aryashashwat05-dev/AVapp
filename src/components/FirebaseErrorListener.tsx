'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter as firebaseErrorEmitter } from '@/firebase/error-emitter';

/**
 * A client component that listens for globally emitted Firebase errors
 * and displays them using the application's toast notification system.
 */
export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: any) => {
      console.error('A global Firebase permission error was caught:', error);
      
      toast({
        variant: 'destructive',
        title: 'Permission Denied',
        description: error.message || 'A Firestore operation was blocked by security rules.',
      });
    };

    firebaseErrorEmitter.on('permission-error', handleError);

    // Clean up the subscription when the component unmounts
    return () => {
      firebaseErrorEmitter.off('permission-error', handleError);
    };
  }, [toast]);

  // This component does not render anything to the DOM
  return null;
}
