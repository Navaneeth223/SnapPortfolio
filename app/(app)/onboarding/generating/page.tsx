'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

type Step = {
  id: string;
  label: string;
  status: 'pending' | 'loading' | 'complete';
};

function GeneratingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  const [steps, setSteps] = useState<Step[]>([
    { id: 'profile', label: 'Fetching your profile', status: 'pending' },
    { id: 'repos', label: 'Found 0 repositories', status: 'pending' },
    { id: 'languages', label: 'Analyzing your top languages...', status: 'pending' },
    { id: 'descriptions', label: 'Generating project descriptions', status: 'pending' },
    { id: 'theme', label: 'Picking your color theme', status: 'pending' },
    { id: 'build', label: 'Putting it all together', status: 'pending' },
  ]);

  useEffect(() => {
    if (!username) {
      router.push('/');
      return;
    }

    // Simulate generation steps
    const runGeneration = async () => {
      const stepTimings = [1000, 1500, 2000, 1800, 1200, 1500];

      for (let i = 0; i < steps.length; i++) {
        // Set current step to loading
        setSteps((prev) =>
          prev.map((step, idx) =>
            idx === i ? { ...step, status: 'loading' } : step
          )
        );

        // Wait
        await new Promise((resolve) => setTimeout(resolve, stepTimings[i]));

        // Mark as complete
        setSteps((prev) =>
          prev.map((step, idx) =>
            idx === i ? { ...step, status: 'complete' } : step
          )
        );

        // Update repo count on second step
        if (i === 1) {
          setSteps((prev) =>
            prev.map((step) =>
              step.id === 'repos'
                ? { ...step, label: 'Found 34 repositories' }
                : step
            )
          );
        }
      }

      // Navigate to customize page
      setTimeout(() => {
        router.push('/onboarding/customize');
      }, 800);
    };

    runGeneration();
  }, [username, router]);

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <h1 className="font-display text-3xl font-bold text-center mb-12">
          Building your portfolio...
        </h1>

        <div className="space-y-4">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                {step.status === 'complete' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 rounded-full bg-accent-green text-white flex items-center justify-center"
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                )}
                {step.status === 'loading' && (
                  <Loader2 className="w-6 h-6 text-accent-primary animate-spin" />
                )}
                {step.status === 'pending' && (
                  <div className="w-6 h-6 rounded-full border-2 border-border-default" />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-lg ${
                  step.status === 'complete'
                    ? 'text-text-primary'
                    : step.status === 'loading'
                    ? 'text-text-primary font-medium'
                    : 'text-text-muted'
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Subtle background animation */}
        <div className="mt-12 text-center">
          <p className="text-sm text-text-muted">
            Analyzing <span className="font-mono">{username}</span>&apos;s GitHub data...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GeneratingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg-base flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-accent-primary animate-spin" />
        </div>
      }
    >
      <GeneratingContent />
    </Suspense>
  );
}
