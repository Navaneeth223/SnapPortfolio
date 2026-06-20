'use client';

import { useState } from 'react';
import { Project } from '@/types/portfolio.types';
import { LanguageBadge } from '@/components/shared/LanguageBadge';
import { StatPill } from '@/components/shared/StatPill';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  GripVertical, 
  Eye, 
  EyeOff, 
  Pin, 
  Edit, 
  X,
  Check
} from 'lucide-react';
import { useEditorStore } from '@/hooks/useEditorStore';

interface ProjectEditCardProps {
  project: Project;
}

export function ProjectEditCard({ project }: ProjectEditCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { updateProject } = useEditorStore();

  const [editData, setEditData] = useState({
    displayTitle: project.displayTitle,
    displayDescription: project.displayDescription || '',
    liveUrl: project.liveUrl || '',
    tags: project.tags.join(', '),
  });

  const handleSave = () => {
    updateProject(project._id!, {
      ...editData,
      tags: editData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      displayTitle: project.displayTitle,
      displayDescription: project.displayDescription || '',
      liveUrl: project.liveUrl || '',
      tags: project.tags.join(', '),
    });
    setIsEditing(false);
  };

  return (
    <div className="border border-border-default rounded-lg bg-bg-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border-subtle">
        <button className="cursor-grab text-text-muted hover:text-text-primary">
          <GripVertical className="w-4 h-4" />
        </button>

        <button
          onClick={() => updateProject(project._id!, { isIncluded: !project.isIncluded })}
          className={`flex-shrink-0 ${
            project.isIncluded ? 'text-accent-primary' : 'text-text-muted'
          }`}
          title={project.isIncluded ? 'Hide from portfolio' : 'Show on portfolio'}
        >
          {project.isIncluded ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{project.displayTitle}</h3>
          <p className="text-xs text-text-muted truncate">{project.repoName}</p>
        </div>

        <div className="flex items-center gap-2">
          {project.primaryLanguage && (
            <LanguageBadge language={project.primaryLanguage} className="text-xs" />
          )}
          <StatPill type="stars" value={project.stars} />
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => updateProject(project._id!, { isPinned: !project.isPinned })}
            className={`p-2 rounded hover:bg-bg-muted transition-colors ${
              project.isPinned ? 'text-accent-primary' : 'text-text-muted'
            }`}
            title={project.isPinned ? 'Unpin' : 'Pin to top'}
          >
            <Pin className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded hover:bg-bg-muted text-text-muted hover:text-text-primary transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded Edit Form */}
      {isEditing && (
        <div className="p-4 space-y-4 bg-bg-muted">
          <div>
            <Label htmlFor={`title-${project._id}`}>Display Title</Label>
            <Input
              id={`title-${project._id}`}
              value={editData.displayTitle}
              onChange={(e) =>
                setEditData({ ...editData, displayTitle: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor={`desc-${project._id}`}>Description</Label>
            <Textarea
              id={`desc-${project._id}`}
              value={editData.displayDescription}
              onChange={(e) =>
                setEditData({ ...editData, displayDescription: e.target.value })
              }
              rows={3}
              placeholder={project.readmeExcerpt || 'Add a description...'}
            />
            {project.readmeExcerpt && (
              <button
                onClick={() =>
                  setEditData({
                    ...editData,
                    displayDescription: project.readmeExcerpt || '',
                  })
                }
                className="text-xs text-accent-primary hover:underline mt-1"
              >
                Use README excerpt
              </button>
            )}
          </div>

          <div>
            <Label htmlFor={`live-${project._id}`}>Live URL</Label>
            <Input
              id={`live-${project._id}`}
              value={editData.liveUrl}
              onChange={(e) =>
                setEditData({ ...editData, liveUrl: e.target.value })
              }
              placeholder="https://example.com"
            />
          </div>

          <div>
            <Label htmlFor={`tags-${project._id}`}>Tags (comma-separated)</Label>
            <Input
              id={`tags-${project._id}`}
              value={editData.tags}
              onChange={(e) =>
                setEditData({ ...editData, tags: e.target.value })
              }
              placeholder="react, typescript, api"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button size="sm" onClick={handleSave}>
              <Check className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="secondary" size="sm" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
