'use client';

import { useState } from 'react';
import { Project } from '@/types/portfolio.types';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';
import { getLanguageColor } from '@/lib/github/languageColors';

interface TerminalFileTreeProps {
  projects: Project[];
  accentColor: string;
}

export function TerminalFileTree({ projects, accentColor }: TerminalFileTreeProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  return (
    <div className="bg-[#16161A] rounded-lg border border-gray-800 p-6">
      <div className="space-y-1">
        {projects.map((project) => {
          const isExpanded = expandedProjects.has(project._id || '');
          const langColor = project.primaryLanguage
            ? getLanguageColor(project.primaryLanguage)
            : '#858585';

          return (
            <div key={project._id}>
              {/* File/Folder Row */}
              <button
                onClick={() => toggleProject(project._id || '')}
                className="flex items-center gap-2 w-full text-left py-2 px-3 hover:bg-[#1C1C21] rounded transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <Folder className="w-4 h-4 text-gray-500" />
                <span className="text-gray-300 text-sm">{project.repoName}/</span>
                <span
                  className="w-2 h-2 rounded-full ml-2"
                  style={{ backgroundColor: langColor }}
                />
                <span className="text-xs text-gray-500 ml-auto">
                  ⭐ {project.stars}
                </span>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="ml-10 mt-2 mb-4 p-4 bg-[#0D0E12] rounded border border-gray-800">
                  <h4
                    className="font-semibold mb-2"
                    style={{ color: accentColor }}
                  >
                    {project.displayTitle}
                  </h4>

                  <p className="text-sm text-gray-400 mb-4">
                    {project.displayDescription || project.readmeExcerpt || 'No description'}
                  </p>

                  {/* Languages */}
                  {project.languages.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">Languages:</div>
                      <div className="flex flex-wrap gap-2">
                        {project.languages.slice(0, 5).map((lang) => (
                          <span
                            key={lang.name}
                            className="text-xs px-2 py-1 bg-[#16161A] rounded"
                            style={{
                              borderLeft: `2px solid ${getLanguageColor(lang.name)}`,
                            }}
                          >
                            {lang.name} {lang.percent.toFixed(1)}%
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {project.tags.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">Tags:</div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-[#16161A] text-gray-400 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex items-center gap-4 text-xs">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        style={{ color: accentColor }}
                      >
                        → Live Demo
                      </a>
                    )}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: accentColor }}
                    >
                      → View Code
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
