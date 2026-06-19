'use client';

import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/hooks/useEditorStore';
import { cn } from '@/lib/utils';

interface LivePreviewFrameProps {
  device: 'desktop' | 'mobile';
}

export function LivePreviewFrame({ device }: LivePreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { portfolio, projects } = useEditorStore();

  useEffect(() => {
    // Send updated data to iframe
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'PORTFOLIO_UPDATE',
          payload: { portfolio, projects },
        },
        '*'
      );
    }
  }, [portfolio, projects]);

  return (
    <div
      className={cn(
        'mx-auto bg-white shadow-lg transition-all duration-300',
        device === 'desktop' ? 'w-full h-full' : 'w-[375px] h-full'
      )}
      style={{
        maxWidth: device === 'desktop' ? '100%' : '375px',
      }}
    >
      <iframe
        ref={iframeRef}
        src="/preview"
        className="w-full h-full border-0"
        title="Portfolio Preview"
      />
    </div>
  );
}
