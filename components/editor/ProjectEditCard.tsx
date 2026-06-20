'use client';

import { useState } from 'react';
import { Project } from '@/types/portfolio.types';
import { LanguageBadge } from '@/components/shared/LanguageBadge';
import { StatPill } from '@/components/shared/StatPill';
import { ChevronDown, ChevronRight, Pin, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/hooks/useEditorStore';

interface ProjectEditCardProps {
  project: Project;
}

export function ProjectEditCard({ project }: ProjectEditCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { updateProject } = useEditorStore();

  const toggleIncluded = () => {
    updateProject(project._id!, { isIncluded: !project.isIncluded });
  };

  const togglePinned = () => {
    updateProject(project._id!, { isPinned: !project.isPinned });
  };

  return (
    <div className={`border rounded-lg transition-all ${
      project.isIncluded 
        ? 'border-border-default bg-bg-surface' 
        : 'border-border-subtle bg-bg-muted opacity-60'
    }`}>
      {/* Header */}
      <div className="p-4 flex items-start gap-3">
        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1 text-text-muted hover:text-text-primary"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-semibold truncate">{project.displayTitle}</h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={togglePinned}
                className={`p-1 rounded hover:bg-bg-muted transition-colors ${
                  project.isPinned ? 'text-accent-primary' : 'text-text-muted'
                }`}
                title={project.isPinned ? 'Unpin' : 'Pin to featured'}
              >
                <Pin className="w-4 h-4" />
              </button>
              <button
                onClick={toggleIncluded}
                className="p-1 rounded hover:bg-bg-muted transition-colors"
                title={project.isIncluded ? 'Hide from portfolio' : 'Show on portfolio'}
              >
                {project.isIncluded ? (
                  <Eye className="w-4 h-4 text-accent-primary" />
                ) : (
                  <EyeOff className="w-4 h-4 text-text-muted" />
                )}
              </button>
            </div>
          </div>

          <p className="text-sm text-text-secondary line-clamp-2 mb-2">
            {project.displayDescription || project.readmeExcerpt}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            {project.primaryLanguage && (
              <LanguageBadge
                language={project.primaryLanguage}
                className="text-text-muted"
              />
            )}
            <StatPill type="stars" value={project.stars} />
            <StatPill type="forks" value={project.forks} />
          </div>
        </div>
      </div>

      {/* Expanded Edit Form */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border-subtle pt-4">
          <div>
            <Label htmlFor={`title-${project._id}`}>Display Title</Label>
            <Input
              id={`title-${project._id}`}
              defaultValue={project.displayTitle}
              onBlur={(e) =>
                updateProject(project._id!, { displayTitle: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor={`desc-${project._id}`}>Description</Label>
            <Textarea
              id={`desc-${project._id}`}
              defaultValue={project.displayDescription}
              onBlur={(e) =>
                updateProject(project._id!, {
                  displayDescription: e.target.value,
                })
              }
              rows={3}
            />
            <p className="text-xs text-text-muted mt-1">
              Original from GitHub:{' '}
              {project.readmeExcerpt || 'No description available'}
            </p>
          </div>

          <div>
            <Label htmlFor={`live-${project._id}`}>Live URL</Label>
            <Input
              id={`live-${project._id}`}
              type="url"
              defaultValue={project.liveUrl || ''}
              onBlur={(e) =>
                updateProject(project._id!, { liveUrl: e.target.value })
              }
              placeholder="https://example.com"
            />
          </div>

          <div>
            <Label htmlFor={`cover-${project._id}`}>Cover Image URL</Label>
            <Input
              id={`cover-${project._id}`}
              type="url"
              defaultValue={project.coverImageUrl || ''}
              onBlur={(e) =>
                updateProject(project._id!, { coverImageUrl: e.target.value })
              }
              placeholder="https://example.com/image.png"
            />
            <Button variant="secondary" size="sm" className="mt-2">
              Upload Image
            </Button>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-bg-muted text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
              <Button variant="ghost" size="sm">
                + Add tag
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
