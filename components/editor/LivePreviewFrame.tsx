'use client';

import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/hooks/useEditorStore';

interface LivePreviewFrameProps {
  device: 'desktop' | 'mobile';
}

export function LivePreviewFrame({ device }: LivePreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { portfolio, projects } = useEditorStore();

  useEffect(() => {
    // Update iframe content when portfolio or projects change
    // This would send a postMessage to the iframe
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'UPDATE_PORTFOLIO',
          payload: { portfolio, projects },
        },
        '*'
      );
    }
  }, [portfolio, projects]);

  const frameStyles = device === 'mobile' 
    ? 'max-w-[375px] mx-auto' 
    : 'w-full';

  return (
    <div className={`${frameStyles} transition-all duration-300`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-border-subtle">
        {/* Browser Chrome */}
        <div className="bg-bg-muted border-b border-border-subtle px-4 py-2 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 bg-bg-surface rounded px-3 py-1 text-xs text-text-muted font-mono">
            {portfolio?.subdomain || 'username'}.snapportfolio.app
          </div>
        </div>

        {/* Preview Content */}
        <div className={`${device === 'mobile' ? 'h-[667px]' : 'h-[800px]'} overflow-auto`}>
          {portfolio ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">👤</div>
              <h2 className="font-display text-2xl font-semibold mb-2">
                {portfolio.displayName || 'Your Name'}
              </h2>
              <p className="text-text-secondary mb-4">
                {portfolio.role || 'Your Role'}
              </p>
              {portfolio.tagline && (
                <p className="text-text-muted text-sm max-w-md mx-auto">
                  {portfolio.tagline}
                </p>
              )}
              <div className="mt-8 text-xs text-text-muted">
                Preview updates as you type
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-text-muted">
              Loading preview...
            </div>
          )}
        </div>
      </div>

      {/* Device Label */}
      <div className="text-center mt-4 text-xs text-text-muted">
        {device === 'mobile' ? 'Mobile (375px)' : 'Desktop (100%)'}
      </div>
    </div>
  );
}
