'use client';

import { useState } from 'react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export function Hero() {
  const [username, setUsername] = useState('');

  return (
    <div className="relative bg-bg-base">
      {/* Header */}
      <header className="border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-primary rounded-md" />
            <span className="font-display font-bold text-xl">SnapPortfolio</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/templates"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Templates
            </Link>
            <Link
              href="/pricing"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="sm">
                <Github className="w-4 h-4 mr-2" />
                Sign in with GitHub
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-hero leading-tight text-balance mb-6">
          Your GitHub. <br />
          Your portfolio. <br />
          <span className="text-accent-primary">In 30 seconds.</span>
        </h1>

        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 text-balance">
          Paste your username. We&apos;ll turn your repos into a portfolio that
          actually looks like you made it with a designer.
        </p>

        {/* Input */}
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 p-2 bg-bg-surface rounded-lg border border-border-default shadow-md">
            <Github className="w-5 h-5 text-text-muted ml-2" />
            <span className="text-text-secondary">github.com/</span>
            <Input
              type="text"
              placeholder="navaneeth223"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-0 focus:ring-0 flex-1"
            />
            <Button
              size="lg"
              disabled={!username}
              onClick={() => {
                if (username) {
                  window.location.href = `/onboarding/generating?username=${username}`;
                }
              }}
            >
              Generate →
            </Button>
          </div>
          <p className="text-sm text-text-muted mt-4">
            No signup required to preview. ✦ Free forever for 1 portfolio.
          </p>
        </div>
      </section>
    </div>
  );
}
