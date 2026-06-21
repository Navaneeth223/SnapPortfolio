'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface PortfolioTrackerProps {
  portfolioId: string;
}

export function PortfolioTracker({ portfolioId }: PortfolioTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    const trackView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            portfolioId,
            path: pathname,
            referrer: document.referrer || 'Direct',
            userAgent: navigator.userAgent,
          }),
        });
      } catch (error) {
        // Fail silently - don't break the page if analytics fails
        console.error('Failed to track view:', error);
      }
    };

    trackView();
  }, [portfolioId, pathname]);

  return null; // This component doesn't render anything
}
