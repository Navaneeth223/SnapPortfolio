import { Project } from '@/types/portfolio.types';
import { LanguageBadge } from '@/components/shared/LanguageBadge';
import { ExternalLink } from 'lucide-react';

interface BrutalistProjectBlockProps {
  project: Project;
  accentColor: string;
}

export function BrutalistProjectBlock({
  project,
  accentColor,
}: BrutalistProjectBlockProps) {
  return (
    <article className="border-[3px] border-black overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
      {/* Title Block */}
      <div
        className="px-6 py-4 border-b-[3px] border-black"
        style={{ backgroundColor: accentColor }}
      >
        <h3 className="font-display text-2xl font-bold uppercase text-white">
          {project.displayTitle}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 bg-white">
        <p className="text-lg mb-4 leading-relaxed">
          {project.displayDescription || project.readmeExcerpt}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {project.primaryLanguage && (
            <span className="px-3 py-1 border-[2px] border-black font-mono text-sm uppercase">
              {project.primaryLanguage}
            </span>
          )}
          {project.stars > 0 && (
            <span className="px-3 py-1 border-[2px] border-black font-mono text-sm">
              ★ {project.stars}
            </span>
          )}
        </div>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs border-[2px] border-black uppercase font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border-[3px] border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
            >
              <span>View</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border-[3px] border-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
          >
            <span>Code</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
