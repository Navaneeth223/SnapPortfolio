import Image from 'next/image';
import { Portfolio } from '@/types/portfolio.types';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface BrutalistHeroProps {
  portfolio: Portfolio;
}

export function BrutalistHero({ portfolio }: BrutalistHeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden border-b-[3px] border-black">
      {/* Oversized Name - intentionally overflowing */}
      <div className="relative z-10 text-center">
        <h1
          className="font-display font-black uppercase leading-[0.85] mb-6"
          style={{
            fontSize: 'clamp(60px, 15vw, 180px)',
            letterSpacing: '-0.03em',
          }}
        >
          {portfolio.displayName.split(' ').map((word, i) => (
            <div key={i}>{word}</div>
          ))}
        </h1>

        {/* Role in colored block */}
        <div
          className="inline-block px-8 py-4 border-[3px] border-black font-bold text-xl uppercase mb-8"
          style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
        >
          {portfolio.role}
        </div>

        {/* Tagline */}
        {portfolio.tagline && (
          <p className="text-xl max-w-2xl mx-auto mb-8 border-l-[3px] border-black pl-6">
            {portfolio.tagline}
          </p>
        )}

        {/* Social Links as Bordered Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {portfolio.links.github && (
            <a
              href={portfolio.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center border-[3px] border-black hover:bg-black hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          )}
          {portfolio.links.linkedin && (
            <a
              href={portfolio.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center border-[3px] border-black hover:bg-black hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          )}
          {portfolio.links.twitter && (
            <a
              href={portfolio.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center border-[3px] border-black hover:bg-black hover:text-white transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
          )}
          {portfolio.links.email && (
            <a
              href={`mailto:${portfolio.links.email}`}
              className="w-14 h-14 flex items-center justify-center border-[3px] border-black hover:bg-black hover:text-white transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>

      {/* Avatar as absolute positioned element */}
      <div className="absolute top-8 right-8 w-32 h-32 border-[3px] border-black overflow-hidden">
        <Image
          src={portfolio.avatarUrl}
          alt={portfolio.displayName}
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
