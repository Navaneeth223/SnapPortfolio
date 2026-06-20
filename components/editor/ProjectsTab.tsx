'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Search } from 'lucide-react';
import { ProjectEditCard } from './ProjectEditCard';
import { useEditorStore } from '@/hooks/useEditorStore';

type FilterType = 'all' | 'included' | 'excluded' | 'pinned';
type SortType = 'manual' | 'stars' | 'recent';

export function ProjectsTab() {
  const { projects } = useEditorStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('manual');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        project.repoName.toLowerCase().includes(query) ||
        project.displayDescription.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Type filter
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

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sort) {
      case 'stars':
        return b.stars - a.stars;
      case 'recent':
        return new Date(b.lastCommitDate).getTime() - new Date(a.lastCommitDate).getTime();
      default:
        return a.order - b.order;
    }
  });

  const includedCount = projects.filter((p) => p.isIncluded).length;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display text-xl font-semibold">Projects</h2>
          <Button variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Re-sync from GitHub
          </Button>
        </div>
        <p className="text-sm text-text-secondary">
          {projects.length} repos found · {includedCount} shown on portfolio
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 pb-4 border-b border-border-subtle">
        {(['all', 'included', 'excluded', 'pinned'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-accent-tint text-accent-primary'
                : 'text-text-secondary hover:bg-bg-muted'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-text-muted">Sort:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            className="text-xs border border-border-default rounded px-2 py-1 bg-bg-surface"
          >
            <option value="manual">Manual order</option>
            <option value="stars">Most stars</option>
            <option value="recent">Most recent</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {sortedProjects.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            <p>No projects found</p>
          </div>
        ) : (
          sortedProjects.map((project) => (
            <ProjectEditCard key={project._id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}
