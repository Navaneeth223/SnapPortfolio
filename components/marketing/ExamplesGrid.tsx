export function ExamplesGrid() {
  const examples = [
    {
      name: 'Sarah Chen',
      role: 'Senior Backend Engineer',
      template: 'Terminal',
    },
    {
      name: 'Alex Morgan',
      role: 'Full Stack Developer',
      template: 'Gallery',
    },
    {
      name: 'Jordan Lee',
      role: 'Indie iOS Developer',
      template: 'Monolith',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="font-display text-3xl font-bold text-center mb-4">
        Real portfolios. Real developers.
      </h2>
      <p className="text-center text-text-secondary mb-16">
        1,200+ developers ship their portfolio with SnapPortfolio
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {examples.map((example) => (
          <div
            key={example.name}
            className="bg-bg-surface rounded-lg border border-border-subtle overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-text-muted font-mono text-sm">
                [{example.template}]
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-semibold">{example.name}</h3>
              <p className="text-sm text-text-secondary">{example.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
