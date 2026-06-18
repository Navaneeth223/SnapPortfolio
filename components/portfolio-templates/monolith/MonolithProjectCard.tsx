import Image from 'next/image';
import { Project } from '@/types/portfolio.types';
import { LanguageBadge } from '@/components/shared/LanguageBadge';
import { StatPill } from '@/components/shared/StatPill';
import { ExternalLink } from 'lucide-react';

interface MonolithProjectCardProps {
  project: Project;
  accentColor: string;
  isDark: boolean;
}

export function MonolithProjectCard({
  project,
  accentColor,
  isDark,
}: MonolithProjectCardProps) {
  return (
    <article>
      {/* Cover Image */}
      {project.coverImageUrl && (
        <div className="aspect-video w-full mb-6 overflow-hidden">
          <Image
            src={project.coverImageUrl}
            alt={project.displayTitle}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h3 className="font-display text-3xl font-semibold mb-4">
        {project.displayTitle}
      </h3>

      {/* Description */}
      <p
        className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-[#5C5C66]'}`}
        style={{ lineHeight: 1.7 }}
      >
        {project.displayDescription || project.readmeExcerpt}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {project.primaryLanguage && (
          <LanguageBadge
            language={project.primaryLanguage}
            className={isDark ? 'text-gray-400' : 'text-[#9A9AA3]'}
          />
        )}
        <StatPill type="stars" value={project.stars} />
        <StatPill type="forks" value={project.forks} />
      </div>

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-1 rounded ${
                isDark ? 'bg-gray-800 text-gray-400' : 'bg-[#F3F2EE] text-[#5C5C66]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex items-center gap-6">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:underline"
            style={{ color: accentColor }}
          >
            <span>View Live</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:underline"
          style={{ color: accentColor }}
        >
          <span>View Code</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}
