import Image from 'next/image';
import { Portfolio } from '@/types/portfolio.types';
import { Github, Linkedin, Twitter, Mail, Globe } from 'lucide-react';

interface GalleryHeroProps {
  portfolio: Portfolio;
}

export function GalleryHero({ portfolio }: GalleryHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#F3F2EE] to-[#E8E7E1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 leading-tight">
              {portfolio.displayName}
            </h1>
            <p className="text-xl text-[#5C5C66] mb-3">{portfolio.role}</p>
            {portfolio.tagline && (
              <p className="text-lg text-[#9A9AA3] mb-8">{portfolio.tagline}</p>
            )}

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {portfolio.links.github && (
                <a
                  href={portfolio.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
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
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
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
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
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
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                  style={{ color: 'var(--accent-color)' }}
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
              {portfolio.links.email && (
                <a
                  href={`mailto:${portfolio.links.email}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
                  style={{ color: 'var(--accent-color)' }}
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Right: Avatar/Abstract Shape */}
          <div className="relative">
            <div
              className="w-full aspect-square rounded-3xl overflow-hidden shadow-lg"
              style={{
                background: `linear-gradient(135deg, var(--accent-color) 0%, ${portfolio.accentColor}80 100%)`,
              }}
            >
              <Image
                src={portfolio.avatarUrl}
                alt={portfolio.displayName}
                width={600}
                height={600}
                className="w-full h-full object-cover mix-blend-overlay opacity-60"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
