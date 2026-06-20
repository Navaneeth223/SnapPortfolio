'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, AlertCircle, ExternalLink, Copy, Lock } from 'lucide-react';
import { useEditorStore } from '@/hooks/useEditorStore';
import { RESERVED_SUBDOMAINS } from '@/lib/constants';
import { toast } from 'sonner';

export function DomainTab() {
  const { portfolio, updatePortfolio } = useEditorStore();
  const [subdomain, setSubdomain] = useState(portfolio?.subdomain || '');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [customDomain, setCustomDomain] = useState(portfolio?.customDomain || '');

  const checkSubdomain = async () => {
    if (!subdomain || subdomain.length < 3) {
      toast.error('Subdomain must be at least 3 characters');
      return;
    }

    if (RESERVED_SUBDOMAINS.includes(subdomain as any)) {
      setIsAvailable(false);
      toast.error('This subdomain is reserved');
      return;
    }

    setIsChecking(true);
    // TODO: API call to check availability
    setTimeout(() => {
      setIsAvailable(true);
      setIsChecking(false);
      toast.success('Subdomain is available!');
    }, 1000);
  };

  const saveSubdomain = () => {
    if (isAvailable) {
      updatePortfolio({ subdomain });
      toast.success('Subdomain updated!');
    }
  };

  const copyDNSRecord = (record: string) => {
    navigator.clipboard.writeText(record);
    toast.success('Copied to clipboard!');
  };

  const isPro = false; // TODO: Get from user plan

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-semibold mb-1">Domain</h2>
        <p className="text-sm text-text-secondary">
          Configure your portfolio URL
        </p>
      </div>

      {/* Subdomain */}
      <section className="space-y-4">
        <Label>Your portfolio is live at:</Label>
        
        <div className="p-4 bg-bg-muted border border-border-subtle rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-accent-primary font-semibold">
              {portfolio?.subdomain || 'username'}.snapportfolio.app
            </span>
            <a
              href={`https://${portfolio?.subdomain}.snapportfolio.app`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <Button variant="secondary" size="sm">
            Change subdomain
          </Button>
        </div>

        {/* Change Subdomain (hidden by default) */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 flex items-center border border-border-default rounded-md overflow-hidden">
              <Input
                value={subdomain}
                onChange={(e) => {
                  setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
                  setIsAvailable(null);
                }}
                placeholder="username"
                className="border-0 focus:ring-0"
              />
              <span className="px-3 text-text-muted text-sm whitespace-nowrap">
                .snapportfolio.app
              </span>
            </div>
            <Button
              variant="secondary"
              onClick={checkSubdomain}
              disabled={isChecking}
            >
              {isChecking ? 'Checking...' : 'Check'}
            </Button>
          </div>

          {isAvailable !== null && (
            <div
              className={`flex items-center gap-2 text-sm ${
                isAvailable ? 'text-accent-green' : 'text-red-500'
              }`}
            >
              {isAvailable ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Available! Click to save.</span>
                  <Button size="sm" onClick={saveSubdomain}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span>Not available. Try another.</span>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Custom Domain */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Custom Domain</Label>
          {!isPro && (
            <span className="text-xs px-2 py-1 bg-accent-tint text-accent-primary rounded font-semibold">
              PRO
            </span>
          )}
        </div>

        {!isPro ? (
          <div className="p-6 border-2 border-border-subtle rounded-lg text-center">
            <Lock className="w-8 h-8 text-text-muted mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Use your own domain</h3>
            <p className="text-sm text-text-secondary mb-4">
              Connect a custom domain like <span className="font-mono">yourname.dev</span> with Pro
            </p>
            <Button>Upgrade to Pro →</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="customDomain">Domain Name</Label>
              <Input
                id="customDomain"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="yourname.dev"
              />
            </div>

            {customDomain && (
              <div className="p-4 bg-bg-muted border border-border-subtle rounded-lg space-y-3">
                <h4 className="font-semibold text-sm">DNS Configuration</h4>
                <p className="text-xs text-text-secondary">
                  Add the following CNAME record to your DNS provider:
                </p>

                <div className="bg-bg-surface p-3 rounded font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Type:</span>
                    <span>CNAME</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Name:</span>
                    <div className="flex items-center gap-2">
                      <span>@</span>
                      <button
                        onClick={() => copyDNSRecord('@')}
                        className="text-text-muted hover:text-text-primary"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Value:</span>
                    <div className="flex items-center gap-2">
                      <span>cname.snapportfolio.app</span>
                      <button
                        onClick={() => copyDNSRecord('cname.snapportfolio.app')}
                        className="text-text-muted hover:text-text-primary"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-text-secondary">
                    Waiting for DNS verification...
                  </span>
                </div>

                <Button variant="secondary" size="sm" className="w-full">
                  Check verification status
                </Button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
