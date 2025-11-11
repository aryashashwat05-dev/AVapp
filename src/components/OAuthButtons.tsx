'use client';

import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const googleProvider = new GoogleAuthProvider();

/**
 * A component that renders OAuth sign-in buttons.
 */
export function OAuthButtons() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const auth = getAuth();

  const handleOAuthSignIn = async (provider: GoogleAuthProvider) => {
    setIsLoading(provider.providerId);
    try {
      await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener in your main provider will handle the redirect.
      toast({
        title: 'Success!',
        description: 'You have successfully signed in.',
      });
    } catch (error: any) {
      console.error('OAuth sign-in error:', error);
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: error.message || 'An unexpected error occurred during sign-in.',
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full"
        disabled={!!isLoading}
        onClick={() => handleOAuthSignIn(googleProvider)}
      >
        {isLoading === 'google.com' ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          // You can add a Google icon here if you have one
          <span className="mr-2">G</span>
        )}
        Sign in with Google
      </Button>
    </div>
  );
}
