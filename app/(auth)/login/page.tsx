import { Github, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-accent-primary rounded-md" />
          <span className="font-display font-bold text-2xl">SnapPortfolio</span>
        </Link>

        {/* Card */}
        <div className="bg-bg-surface rounded-lg border border-border-default shadow-md p-8">
          <h1 className="font-display text-2xl font-semibold text-center mb-2">
            Sign in to SnapPortfolio
          </h1>
          <p className="text-center text-text-secondary mb-8">
            Create your portfolio in under a minute
          </p>

          {/* GitHub Login (Primary) */}
          <Button
            variant="primary"
            size="lg"
            className="w-full mb-3"
            onClick={() => {
              // TODO: Implement NextAuth sign in
              // signIn('github', { callbackUrl: '/onboarding/connect' });
            }}
          >
            <Github className="w-5 h-5 mr-2" />
            Continue with GitHub
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-subtle" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-bg-surface text-text-muted">or</span>
            </div>
          </div>

          {/* Google Login (Secondary) */}
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => {
              // TODO: Implement NextAuth sign in
              // signIn('google', { callbackUrl: '/onboarding/connect' });
            }}
          >
            <Chrome className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>

          {/* Privacy Notice */}
          <p className="text-xs text-text-muted text-center mt-6 leading-relaxed">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-text-secondary">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-text-secondary">
              Privacy Policy
            </Link>
            .
          </p>

          {/* Security Note */}
          <div className="mt-6 p-3 bg-bg-muted rounded-md border border-border-subtle">
            <p className="text-xs text-text-secondary">
              🔒 We only request read access to your <strong>public repositories</strong>.
              We never access private repos or write to your account.
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-text-muted hover:text-text-secondary">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
