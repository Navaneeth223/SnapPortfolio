import { Portfolio, Project } from '@/types/portfolio.types';
import { BrutalistHero } from './BrutalistHero';
import { BrutalistProjectBlock } from './BrutalistProjectBlock';

interface BrutalistTemplateProps {
  portfolio: Portfolio;
  projects: Project[];
}

export function BrutalistTemplate({ portfolio, projects }: BrutalistTemplateProps) {
  const { sections, accentColor } = portfolio;

  const visibleSections = sections
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  const includedProjects = projects.filter((p) => p.isIncluded);

  return (
    <div
      className="min-h-screen bg-white"
      style={{
        ['--accent-color' as any]: accentColor,
      }}
    >
      {visibleSections.map((section) => {
        switch (section.id) {
          case 'hero':
            return <BrutalistHero key="hero" portfolio={portfolio} />;

          case 'about':
            return (
              <section
                key="about"
                className="max-w-6xl mx-auto px-6 py-16 border-t-[3px] border-black"
              >
                <div
                  className="inline-block px-6 py-2 mb-8 border-[3px] border-black font-display text-2xl font-bold uppercase"
                  style={{ backgroundColor: accentColor, color: 'white' }}
                >
                  About
                </div>
                <p className="text-xl leading-relaxed max-w-3xl border-l-[3px] border-black pl-6">
                  {portfolio.bio}
                </p>
              </section>
            );

          case 'skills':
            if (!portfolio.skills.length) return null;
            return (
              <section
                key="skills"
                className="max-w-6xl mx-auto px-6 py-16 border-t-[3px] border-black"
              >
                <div
                  className="inline-block px-6 py-2 mb-8 border-[3px] border-black font-display text-2xl font-bold uppercase"
                  style={{ backgroundColor: accentColor, color: 'white' }}
                >
                  Skills
                </div>
                <div className="space-y-4">
                  {portfolio.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="border-[3px] border-black p-4 relative overflow-hidden"
                    >
                      <div className="relative z-10 font-bold text-lg uppercase">
                        {skill.name}
                      </div>
                      <div
                        className="absolute inset-0 h-full"
                        style={{
                          width: `${skill.proficiency}%`,
                          backgroundColor: accentColor,
                          opacity: 0.2,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'projects':
            return (
              <section
                key="projects"
                className="max-w-6xl mx-auto px-6 py-16 border-t-[3px] border-black"
              >
                <div
                  className="inline-block px-6 py-2 mb-8 border-[3px] border-black font-display text-2xl font-bold uppercase"
                  style={{ backgroundColor: accentColor, color: 'white' }}
                >
                  Projects
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {includedProjects.map((project) => (
                    <BrutalistProjectBlock
                      key={project._id}
                      project={project}
                      accentColor={accentColor}
                    />
                  ))}
                </div>
              </section>
            );

          case 'contact':
            return (
              <section
                key="contact"
                className="max-w-6xl mx-auto px-6 py-16 border-t-[3px] border-black"
              >
                <div
                  className="inline-block px-6 py-2 mb-8 border-[3px] border-black font-display text-2xl font-bold uppercase"
                  style={{ backgroundColor: accentColor, color: 'white' }}
                >
                  Contact
                </div>
                {portfolio.links.email && (
                  <a
                    href={`mailto:${portfolio.links.email}`}
                    className="inline-block px-8 py-4 border-[3px] border-black font-bold text-xl uppercase hover:bg-black hover:text-white transition-colors"
                  >
                    {portfolio.links.email}
                  </a>
                )}
              </section>
            );

          default:
            return null;
        }
      })}

      {/* Footer */}
      <footer className="bg-black text-white py-8 border-t-[3px] border-black">
        <div className="max-w-6xl mx-auto px-6 text-center font-bold uppercase">
          Built with{' '}
          <a
            href="https://snapportfolio.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: accentColor }}
          >
            SnapPortfolio
          </a>
        </div>
      </footer>
    </div>
  );
}
