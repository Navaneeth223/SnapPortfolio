'use client';

import { useState, useEffect } from 'react';
import { Portfolio } from '@/types/portfolio.types';

interface TerminalHeroProps {
  portfolio: Portfolio;
}

export function TerminalHero({ portfolio }: TerminalHeroProps) {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-16">
      {/* Terminal Window Chrome */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden">
        {/* Traffic Lights */}
        <div className="bg-[#0D1117] px-4 py-3 flex items-center gap-2 border-b border-[#30363D]">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>

        {/* Terminal Content */}
        <div className="p-6 min-h-[400px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#7D8590]">$</span>
            <span className="text-[#E6EDF3]">whoami</span>
          </div>

          <div className="ml-4 mb-6">
            <div className="text-4xl font-bold mb-2 text-[#E6EDF3]">
              {portfolio.displayName}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#7D8590]">//</span>
            <span className="text-[#7D8590]">{portfolio.role}</span>
          </div>

          {portfolio.tagline && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[#7D8590]">//</span>
              <span className="text-[#7D8590]">{portfolio.tagline}</span>
            </div>
          )}

          {portfolio.location && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#7D8590]">$</span>
              <span className="text-[#E6EDF3]">pwd</span>
            </div>
          )}

          {portfolio.location && (
            <div className="ml-4 text-[#7D8590] mb-6">{portfolio.location}</div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-[#7D8590]">$</span>
            <span className="text-[#E6EDF3]">ls projects/</span>
            <span
              className={`inline-block w-2 h-4 ml-1 ${
                showCursor ? 'bg-[#E6EDF3]' : 'bg-transparent'
              }`}
            >
              █
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
