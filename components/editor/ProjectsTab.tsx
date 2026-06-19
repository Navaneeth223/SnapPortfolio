'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Search, Pin, Eye, EyeOff, Edit } from 'lucide-react';
import { LanguageBadge } from '@/components/shared/LanguageBadge';
import { StatPill } from '@/components/shared/StatPill';

// Mock project data
const mockProjects = [
  {
    _id: '1',
    repoName: 'freelanceflow',
    displayTitle: 'FreelanceFlow',
    displayDescription: 'Freelance management SaaS platform',
    primaryLanguage: 'TypeScript',
    stars: 14,
    forks: 3,
    isPinned: true,
    isIncluded: true,
  },
  {
    _id: '2',
    repoName: 'portfolio-v2',
    displayTitle: 'Portfolio v2',
    displayDescription: 'Personal portfolio website',
    primaryLanguage: 'JavaScript',
    stars: 3,
    forks: 0,
    isPinned: false,
    isIncluded: true,
  },
  {
    _id: '3',
    repoName: 'cli-tool',
    displayTitle: 'CLI Tool',
    displayDescription: 'Command line productivity tool',
    primaryLanguage: 'Go',
    stars: 8,
    forks: 2,
    isPinned: false,
    isIncluded: false,
  },
];

export function ProjectsTab() {
  const [projects, setProjects] = useState(mockProjects);
  const [filter, setFilter] = useState<'all' | 'included' | 'excluded' | 'pinned'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.displayTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (filter) {
      case 'included':
        return project.isIncluded && matchesSearch;
      case 'excluded':
        return !project.isIncluded && matchesSearch;
      case 'pinned':
        return project.isPinned && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  const togglePin = (id: string) => {
    setProjects(projects.map(p => 
      p._id === id ? { ...p, isPinned: !p.isPinned } : p
    ));
  };

  const toggleIncluded = (id: string) => {
    setProjects(projects.map(p => 
      p._id === id ? { ...p, isIncluded: !p.isIncluded } : p
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold mb-1">Projects</h2>
        <p className="text-sm text-text-secondary">
          {projects.length} repos found · {projects.filter(p => p.isIncluded).length} shown on portfolio
        </p>
      </div>

      {/* Sync Button */}
      <Button variant="secondary" size="sm">
        <RefreshCw className="w-4 h-4 mr-2" />
        Re-sync from GitHub
      </Button>

      {/* Filter Bar */}
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
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-accent-tint text-accent-primary'
                  : 'text-text-secondary hover:bg-bg-muted'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onTogglePin={() => togglePin(project._id)}
            onToggleIncluded={() => toggleIncluded(project._id)}
          />
        ))}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            No projects found
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onTogglePin,
  onToggleIncluded,
}: {
  project: typeof mockProjects[0];
  onTogglePin: () => void;
  onToggleIncluded: () => void;
}) {
  return (
    <div
      className={`p-4 rounded-lg border transition-all ${
        project.isIncluded
          ? 'border-border-default bg-bg-surface'
          : 'border-border-subtle bg-bg-muted opacity-60'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={project.isIncluded}
          onChange={onToggleIncluded}
          className="mt-1"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold">{project.displayTitle}</h3>
              <p className="text-sm text-text-muted font-mono">
                {project.repoName}
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={onTogglePin}
                className={`p-2 rounded transition-colors ${
                  project.isPinned
                    ? 'text-accent-primary bg-accent-tint'
                    : 'text-text-muted hover:bg-bg-muted'
                }`}
                title={project.isPinned ? 'Unpin' : 'Pin to top'}
              >
                <Pin className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded text-text-muted hover:bg-bg-muted transition-colors"
                title="Edit project"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-sm text-text-secondary mb-3">
            {project.displayDescription}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3">
            {project.primaryLanguage && (
              <LanguageBadge language={project.primaryLanguage} />
            )}
            <StatPill type="stars" value={project.stars} />
            <StatPill type="forks" value={project.forks} />
          </div>
        </div>
      </div>
    </div>
  );
}
