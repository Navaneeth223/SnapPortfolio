import { TEMPLATES } from '@/lib/constants';
import Link from 'next/link';

export function TemplateShowcase() {
  return (
    <section className="bg-bg-muted py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-3xl font-bold text-center mb-4">
          Four templates. <br />
          Four completely different vibes.
        </h2>
        <p className="text-center text-text-secondary mb-16 max-w-2xl mx-auto">
          Choose the one that matches your style, or switch between them anytime.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="bg-bg-surface rounded-lg border border-border-subtle shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-text-muted font-mono text-sm">
                  [{template.id}]
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {template.description}
                </p>
                <p className="text-xs text-text-muted mb-4">
                  Best for: {template.bestFor}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/templates"
            className="text-accent-primary hover:underline font-medium"
          >
            View all templates →
          </Link>
        </div>
      </div>
    </section>
  );
}
