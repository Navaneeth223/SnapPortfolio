import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <FileQuestion className="w-16 h-16 text-text-muted mx-auto mb-6" />
        <h1 className="font-display text-6xl font-bold mb-3">404</h1>
        <h2 className="font-display text-2xl font-semibold mb-3">
          Page not found
        </h2>
        <p className="text-text-secondary mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button variant="secondary">Go Home</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
