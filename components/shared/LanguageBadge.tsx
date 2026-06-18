import { getLanguageColor } from '@/lib/github/languageColors';

interface LanguageBadgeProps {
  language: string;
  showDot?: boolean;
  className?: string;
}

export function LanguageBadge({
  language,
  showDot = true,
  className = '',
}: LanguageBadgeProps) {
  const color = getLanguageColor(language);

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-mono ${className}`}
    >
      {showDot && (
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      {language}
    </span>
  );
}
