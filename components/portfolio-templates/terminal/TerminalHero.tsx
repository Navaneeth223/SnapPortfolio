'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Portfolio } from '@/types/portfolio.types';
import { Github, Linkedin, Twitter, Mail, Globe } from 'lucide-react';

interface TerminalHeroProps {
  portfolio: Portfolio;
}

export function TerminalHero({ portfolio }: TerminalHeroProps) {
  const [displayedName, setDisplayedName] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<'name' | 'role' | 'complete'>('name');

  // Typewriter effect
  useEffect(() => {
    if (phase === 'name') {
      if (displayedName.length < portfolio.displayName.length) {
        const timeout = setTimeout(() => {
          setDisplayedName(
            portfolio.displayName.slice(0, displayedName.length + 1)
          );
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => setPhase('role'), 300);
      }
    }
  }, [displayedName, portfolio.displayName, phase]);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-4xl">
        {/* Terminal Window Chrome */}
        <div className="bg-[#16161A] rounded-lg border border-gray-800 overflow-hidden">
          {/* Title Bar */}
          <div className="bg-[#1C1C21] px-4 py-3 flex items-center gap-2 border-b border-gray-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="ml-4 text-xs text-gray-500">
              {portfolio.githubUsername || 'terminal'} — zsh
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-8 min-h-[400px]">
            <div className="mb-6">
              <span className="text-gray-500">$ </span>
              <span className="text-gray-300">whoami</span>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={portfolio.avatarUrl}
                  alt={portfolio.displayName}
                  width={48}
                  height={48}
                  className="rounded"
                />
                <div>
                  <div className="text-xl" style={{ color: 'var(--accent-color)' }}>
                    {displayedName}
                    {phase === 'name' && showCursor && (
                      <span className="animate-pulse">█</span>
                    )}
                  </div>
                </div>
              </div>

              {phase !== 'name' && (
                <div className="text-gray-400 text-sm mt-2">
                  <span className="text-gray-500">// </span>
                  {portfolio.role}
                </div>
              )}

              {phase === 'complete' && portfolio.tagline && (
                <div className="text-gray-400 text-sm mt-2">
                  <span className="text-gray-500">// </span>
                  {portfolio.tagline}
                </div>
              )}
            </div>

            {phase !== 'name' && (
              <>
                {/* Location */}
                {portfolio.location && (
                  <div className="mb-4 text-sm">
                    <span className="text-gray-500">📍 </span>
                    <span className="text-gray-400">{portfolio.location}</span>
                  </div>
                )}

                {/* Links */}
                <div className="space-y-2 text-sm">
                  {portfolio.links.github && (
                    <div>
                      <span className="text-gray-500">$ git remote -v</span>
                      <br />
                      <a
                        href={portfolio.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:underline ml-4"
                        style={{ color: 'var(--accent-color)' }}
                      >
                        {portfolio.links.github}
                      </a>
                    </div>
                  )}

                  {portfolio.links.email && (
                    <div className="mt-4">
                      <span className="text-gray-500">$ echo $EMAIL</span>
                      <br />
                      <a
                        href={`mailto:${portfolio.links.email}`}
                        className="text-gray-400 hover:underline ml-4"
                      >
                        {portfolio.links.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 mt-8">
                  {portfolio.links.linkedin && (
                    <a
                      href={portfolio.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {portfolio.links.twitter && (
                    <a
                      href={portfolio.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-300"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {portfolio.links.website && (
                    <a
                      href={portfolio.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-300"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </>
            )}

            {phase === 'complete' && (
              <div className="mt-8">
                <span className="text-gray-500">$ </span>
                <span className="animate-pulse">█</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
