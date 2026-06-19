'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { TEMPLATES } from '@/lib/constants';
import confetti from 'canvas-confetti';

export default function CustomizePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState('monolith');

  const handleContinue = () => {
    // Fire confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Navigate to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="border-b border-border-subtle bg-bg-surface sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-semibold">
            🎉 Your portfolio is ready!
          </h1>
          <Button onClick={handleContinue}>
            Looks good, continue →
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Template Selector */}
        <div className="mb-8">
          <h2 className="font-display text-lg font-semibold mb-4">
            Choose your template
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedTemplate === template.id
                    ? 'border-accent-primary bg-accent-tint'
                    : 'border-border-default hover:border-border-strong'
                }`}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-3 flex items-center justify-center">
                  <span className="text-xs font-mono text-text-muted">
                    [{template.id}]
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{template.name}</h3>
                <p className="text-xs text-text-secondary">
                  {template.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg border border-border-default shadow-sm overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">👤</div>
              <h2 className="font-display text-2xl font-semibold mb-2">
                Your Name
              </h2>
              <p className="text-text-secondary">Full Stack Developer</p>
            </div>
          </div>
          <div className="p-6 text-center">
            <p className="text-text-secondary mb-4">
              This is a preview of your portfolio with the <strong>{selectedTemplate}</strong> template.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="secondary" onClick={() => router.push('/editor')}>
                Customize this
              </Button>
              <Button onClick={handleContinue}>
                Continue
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <p className="text-text-secondary text-sm">
            You can always customize your portfolio later from the editor
          </p>
        </div>
      </div>
    </div>
  );
}
