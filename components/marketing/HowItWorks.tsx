export function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="font-display text-3xl font-bold text-center mb-16">
        Three steps. Zero manual work.
      </h2>

      <div className="grid md:grid-cols-3 gap-12">
        <Step
          number="01"
          title="Connect GitHub"
          description="One click, read-only access to public repos"
        />
        <Step
          number="02"
          title="We do the design"
          description="Layout, colors, copy — all generated instantly"
        />
        <Step
          number="03"
          title="Customize & publish"
          description="Tweak anything, or ship it as-is"
        />
      </div>
    </section>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-tint text-accent-primary font-display font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  );
}
