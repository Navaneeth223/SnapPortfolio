import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">{title}</h1>
        {description && (
          <p className="text-text-secondary">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="text-accent-primary hover:underline font-medium"
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}
