'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Search } from 'lucide-react';
import { ProjectEditCard } from './ProjectEditCard';
import { useEditorStore } from '@/hooks/useEditorStore';

export function ProjectsTab() {
  const { projects } = useEditorStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'included' | 'excluded' | 'pinned'>('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.displayTitle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    const matchesFilter =
      filter === 'all' ||
      (filter === 'included' && project.isIncluded) ||
      (filter === 'excluded' && !project.isIncluded) ||
      (filter === 'pinned' && project.isPinned);

    return matchesSearch && matchesFilter;
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
      <div>
        <Button variant="secondary" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Re-sync from GitHub
        </Button>
        <p className="text-xs text-text-muted mt-2">
          Last synced 2 hours ago
        </p>
      </div>

      {/* Search & Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'included', 'excluded', 'pinned'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? 'bg-accent-tint text-accent-primary'
                  : 'bg-bg-muted text-text-secondary hover:bg-border-subtle'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectEditCard key={project._id} project={project} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-text-muted">No projects found</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-accent-primary hover:underline mt-2"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
