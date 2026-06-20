'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Search, Pin, Eye, EyeOff } from 'lucide-react';
import { ProjectEditCard } from './ProjectEditCard';
import { useEditorStore } from '@/hooks/useEditorStore';

type FilterType = 'all' | 'included' | 'excluded' | 'pinned';

export function ProjectsTab() {
  const { projects } = useEditorStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) => {
    // Apply search filter
    const matchesSearch =
      project.displayTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.displayDescription.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Apply type filter
    switch (filter) {
      case 'included':
        return project.isIncluded;
      case 'excluded':
        return !project.isIncluded;
      case 'pinned':
        return project.isPinned;
      default:
        return true;
    }
  });

  const stats = {
    total: projects.length,
    included: projects.filter((p) => p.isIncluded).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold mb-1">Projects</h2>
        <p className="text-sm text-text-secondary">
          {stats.total} repos found · {stats.included} shown on portfolio
        </p>
      </div>

      {/* Sync Button */}
      <Button variant="secondary" size="sm" className="w-full">
        <RefreshCw className="w-4 h-4 mr-2" />
        Re-sync from GitHub
      </Button>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'included', 'excluded', 'pinned'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${
                filter === f
                  ? 'bg-accent-primary text-white'
                  : 'bg-bg-muted text-text-secondary hover:bg-border-subtle'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-3">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted">No projects found</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectEditCard key={project._id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}
