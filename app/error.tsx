'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold mb-3">
          Something went wrong
        </h1>
        <p className="text-text-secondary mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={() => window.location.href = '/'}>
            Go Home
          </Button>
          <Button onClick={reset}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
