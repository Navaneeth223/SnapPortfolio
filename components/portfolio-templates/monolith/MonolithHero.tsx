import Image from 'next/image';
import { Portfolio } from '@/types/portfolio.types';
import { Github, Linkedin, Twitter, Mail, Globe, FileText } from 'lucide-react';

interface MonolithHeroProps {
  portfolio: Portfolio;
}

export function MonolithHero({ portfolio }: MonolithHeroProps) {
  const isDark = portfolio.colorMode === 'dark';

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-3xl">
        {/* Avatar */}
        <div className="mb-8">
          <Image
            src={portfolio.avatarUrl}
            alt={portfolio.displayName}
            width={80}
            height={80}
            className="rounded-full mx-auto"
          />
        </div>

        {/* Name */}
        <h1
          className="font-display font-semibold mb-4"
          style={{ fontSize: '96px', lineHeight: 1.1, letterSpacing: '-0.02em' }}
        >
          {portfolio.displayName}
        </h1>

        {/* Role */}
        <p
          className={`font-mono uppercase tracking-wider text-sm mb-6 ${
            isDark ? 'text-gray-400' : 'text-[#9A9AA3]'
          }`}
        >
          {portfolio.role}
        </p>

        {/* Tagline */}
        {portfolio.tagline && (
          <p
            className={`text-lg mb-12 ${isDark ? 'text-gray-300' : 'text-[#5C5C66]'}`}
          >
            {portfolio.tagline}
          </p>
        )}

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          {portfolio.links.github && (
            <a
              href={portfolio.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:opacity-70 transition-opacity`}
              style={{ color: 'var(--accent-color)' }}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {portfolio.links.linkedin && (
            <a
              href={portfolio.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:opacity-70 transition-opacity`}
              style={{ color: 'var(--accent-color)' }}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {portfolio.links.twitter && (
            <a
              href={portfolio.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:opacity-70 transition-opacity`}
              style={{ color: 'var(--accent-color)' }}
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {portfolio.links.website && (
            <a
              href={portfolio.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:opacity-70 transition-opacity`}
              style={{ color: 'var(--accent-color)' }}
            >
              <Globe className="w-5 h-5" />
            </a>
          )}
          {portfolio.links.email && (
            <a
              href={`mailto:${portfolio.links.email}`}
              className={`hover:opacity-70 transition-opacity`}
              style={{ color: 'var(--accent-color)' }}
            >
              <Mail className="w-5 h-5" />
            </a>
          )}
          {portfolio.links.resumeUrl && (
            <a
              href={portfolio.links.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:opacity-70 transition-opacity`}
              style={{ color: 'var(--accent-color)' }}
            >
              <FileText className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
