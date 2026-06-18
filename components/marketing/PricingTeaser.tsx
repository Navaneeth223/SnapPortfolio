import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function PricingTeaser() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="font-display text-3xl font-bold text-center mb-16">
        Simple pricing. No surprises.
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free */}
        <div className="bg-bg-surface rounded-lg border border-border-default p-8">
          <h3 className="font-display text-2xl font-bold mb-2">Free</h3>
          <div className="mb-6">
            <span className="text-4xl font-bold">$0</span>
            <span className="text-text-secondary">/month</span>
          </div>
          <ul className="space-y-3 mb-8">
            <PricingFeature text="1 portfolio" />
            <PricingFeature text="username.snapportfolio.app subdomain" />
            <PricingFeature text="All templates" />
            <PricingFeature text="Unlimited projects" />
            <PricingFeature text="Basic analytics (7 days)" />
          </ul>
          <Link href="/login">
            <Button variant="secondary" className="w-full">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Pro */}
        <div className="bg-bg-surface rounded-lg border-2 border-accent-primary p-8 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-primary text-text-on-accent px-3 py-1 rounded-full text-xs font-semibold">
            Popular
          </div>
          <h3 className="font-display text-2xl font-bold mb-2">Pro</h3>
          <div className="mb-6">
            <span className="text-4xl font-bold">$9</span>
            <span className="text-text-secondary">/month</span>
          </div>
          <ul className="space-y-3 mb-8">
            <PricingFeature text="Everything in Free" />
            <PricingFeature text="Custom domain support" />
            <PricingFeature text="Full analytics history" />
            <PricingFeature text="Remove SnapPortfolio branding" />
            <PricingFeature text="Multiple portfolios" />
            <PricingFeature text="Priority support" />
          </ul>
          <Link href="/login">
            <Button className="w-full">
              Upgrade to Pro
            </Button>
          </Link>
        </div>
      </div>

      <p className="text-center text-text-muted text-sm mt-8">
        <Link href="/pricing" className="hover:underline">
          View full pricing details →
        </Link>
      </p>
    </section>
  );
}

function PricingFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2">
      <Check className="w-5 h-5 text-accent-green flex-shrink-0" />
      <span className="text-text-secondary">{text}</span>
    </li>
  );
}
