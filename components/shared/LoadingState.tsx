import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({ message, fullScreen = false }: LoadingStateProps) {
  const containerClass = fullScreen
    ? 'min-h-screen bg-bg-base'
    : 'min-h-[400px]';

  return (
    <div className={`${containerClass} flex items-center justify-center`}>
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-accent-primary animate-spin mx-auto mb-4" />
        {message && (
          <p className="text-text-secondary">{message}</p>
        )}
      </div>
    </div>
  );
}
