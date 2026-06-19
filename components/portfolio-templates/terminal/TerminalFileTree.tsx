'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';
import { Project } from '@/types/portfolio.types';
import { LanguageBadge } from '@/components/shared/LanguageBadge';
import { StatPill } from '@/components/shared/StatPill';

interface TerminalFileTreeProps {
  projects: Project[];
  accentColor: string;
}

export function TerminalFileTree({ projects, accentColor }: TerminalFileTreeProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(projectId)) {
        next.delete(projectId);
      } else {
        next.add(projectId);
      }
      return next;
    });
  };

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
      <div className="space-y-1">
        {projects.map((project) => {
          const isExpanded = expandedProjects.has(project._id!);

          return (
            <div key={project._id}>
              {/* File Tree Item */}
              <button
                onClick={() => toggleProject(project._id!)}
                className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-[#1C2128] rounded transition-colors text-left"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-[#7D8590] flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#7D8590] flex-shrink-0" />
                )}
                <Folder className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} />
                <span className="text-[#E6EDF3] flex-1">{project.repoName}/</span>
                {project.primaryLanguage && (
                  <LanguageBadge
                    language={project.primaryLanguage}
                    className="text-[#7D8590]"
                  />
                )}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="ml-6 mt-2 mb-4 pl-4 border-l border-[#30363D]">
                  <div className="mb-3">
                    <h4 className="text-[#E6EDF3] font-semibold mb-1">
                      {project.displayTitle}
                    </h4>
                    <p className="text-[#7D8590] text-sm leading-relaxed">
                      {project.displayDescription || project.readmeExcerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <StatPill type="stars" value={project.stars} />
                    <StatPill type="forks" value={project.forks} />
                  </div>

                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-[#1C2128] text-[#7D8590] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        style={{ color: accentColor }}
                      >
                        View Live →
                      </a>
                    )}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: accentColor }}
                    >
                      View Code →
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
