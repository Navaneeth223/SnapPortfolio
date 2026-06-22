export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-4 bg-bg-muted rounded w-3/4 mb-2" />
      <div className="h-4 bg-bg-muted rounded w-1/2" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-bg-surface rounded-lg border border-border-default p-6 animate-pulse">
      <div className="h-6 bg-bg-muted rounded w-1/3 mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-bg-muted rounded w-full" />
        <div className="h-4 bg-bg-muted rounded w-5/6" />
        <div className="h-4 bg-bg-muted rounded w-4/6" />
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-bg-surface rounded-lg border border-border-default overflow-hidden animate-pulse">
      <div className="aspect-video bg-bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-bg-muted rounded w-2/3" />
        <div className="h-4 bg-bg-muted rounded w-full" />
        <div className="h-4 bg-bg-muted rounded w-5/6" />
      </div>
    </div>
  );
}
