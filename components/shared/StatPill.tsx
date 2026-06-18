import { Star, GitFork, Eye } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface StatPillProps {
  type: 'stars' | 'forks' | 'views';
  value: number;
  className?: string;
}

export function StatPill({ type, value, className = '' }: StatPillProps) {
  const icons = {
    stars: Star,
    forks: GitFork,
    views: Eye,
  };

  const Icon = icons[type];

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs text-text-muted ${className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{formatNumber(value)}</span>
    </span>
  );
}
