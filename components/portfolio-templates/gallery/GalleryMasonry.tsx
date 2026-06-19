import Image from 'next/image';
import { Project } from '@/types/portfolio.types';
import { LanguageBadge } from '@/components/shared/LanguageBadge';
import { ExternalLink } from 'lucide-react';

interface GalleryMasonryProps {
  projects: Project[];
  accentColor: string;
  featured?: boolean;
}

export function GalleryMasonry({
  projects,
  accentColor,
  featured = false,
}: GalleryMasonryProps) {
  return (
    <div
      className={`grid ${
        featured
          ? 'md:grid-cols-2 gap-6'
          : 'md:grid-cols-2 lg:grid-cols-3 gap-6'
      }`}
    >
      {projects.map((project, index) => {
        const isWide = featured && index === 0;

        return (
          <article
            key={project._id}
            className={`group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
              isWide ? 'md:col-span-2' : ''
            }`}
          >
            {/* Cover Image */}
            <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              {project.coverImageUrl ? (
                <Image
                  src={project.coverImageUrl}
                  alt={project.displayTitle}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
                  }}
                >
                  <span className="text-3xl font-display font-bold opacity-20">
                    {project.displayTitle[0]}
                  </span>
                </div>
              )}

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="flex items-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:underline flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>View Live</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Code</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold mb-2">
                {project.displayTitle}
              </h3>
              <p className="text-[#5C5C66] text-sm mb-4 line-clamp-2">
                {project.displayDescription || project.readmeExcerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-3">
                {project.primaryLanguage && (
                  <LanguageBadge
                    language={project.primaryLanguage}
                    className="text-[#9A9AA3]"
                  />
                )}
                {project.stars > 0 && (
                  <span className="text-xs text-[#9A9AA3]">★ {project.stars}</span>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
