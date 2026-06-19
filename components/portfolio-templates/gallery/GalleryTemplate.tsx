import { Portfolio, Project } from '@/types/portfolio.types';
import { GalleryHero } from './GalleryHero';
import { GalleryMasonry } from './GalleryMasonry';

interface GalleryTemplateProps {
  portfolio: Portfolio;
  projects: Project[];
}

export function GalleryTemplate({ portfolio, projects }: GalleryTemplateProps) {
  const { sections, accentColor } = portfolio;

  const visibleSections = sections
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  const pinnedProjects = projects.filter((p) => p.isPinned && p.isIncluded);
  const regularProjects = projects.filter((p) => !p.isPinned && p.isIncluded);

  return (
    <div
      className="min-h-screen bg-[#FAFAF8]"
      style={{
        ['--accent-color' as any]: accentColor,
      }}
    >
      {visibleSections.map((section) => {
        switch (section.id) {
          case 'hero':
            return <GalleryHero key="hero" portfolio={portfolio} />;

          case 'about':
            return (
              <section
                key="about"
                className="max-w-6xl mx-auto px-6 py-16"
              >
                <h2
                  className="font-display text-3xl font-semibold mb-6"
                  style={{ color: accentColor }}
                >
                  About
                </h2>
                <p className="text-lg text-[#5C5C66] leading-relaxed max-w-3xl">
                  {portfolio.bio}
                </p>
              </section>
            );

          case 'skills':
            if (!portfolio.skills.length) return null;
            return (
              <section
                key="skills"
                className="max-w-6xl mx-auto px-6 py-16 bg-white"
              >
                <h2
                  className="font-display text-3xl font-semibold mb-8"
                  style={{ color: accentColor }}
                >
                  Skills
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {portfolio.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="text-center p-4 bg-[#F3F2EE] rounded-lg"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-xl">
                        {skill.name[0]}
                      </div>
                      <div className="font-medium text-sm">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'projects':
            return (
              <section key="projects" className="max-w-7xl mx-auto px-6 py-16">
                {pinnedProjects.length > 0 && (
                  <div className="mb-16">
                    <h2
                      className="font-display text-3xl font-semibold mb-8"
                      style={{ color: accentColor }}
                    >
                      Featured Projects
                    </h2>
                    <GalleryMasonry
                      projects={pinnedProjects}
                      accentColor={accentColor}
                      featured
                    />
                  </div>
                )}

                {regularProjects.length > 0 && (
                  <div>
                    <h2
                      className="font-display text-3xl font-semibold mb-8"
                      style={{ color: accentColor }}
                    >
                      {pinnedProjects.length > 0 ? 'More Projects' : 'Projects'}
                    </h2>
                    <GalleryMasonry
                      projects={regularProjects}
                      accentColor={accentColor}
                    />
                  </div>
                )}
              </section>
            );

          case 'contact':
            return (
              <section
                key="contact"
                className="bg-white border-t border-[#ECEBE6] py-16"
              >
                <div className="max-w-6xl mx-auto px-6 text-center">
                  <h2
                    className="font-display text-3xl font-semibold mb-4"
                    style={{ color: accentColor }}
                  >
                    Let's work together
                  </h2>
                  {portfolio.links.email && (
                    <a
                      href={`mailto:${portfolio.links.email}`}
                      className="text-xl hover:underline"
                      style={{ color: accentColor }}
                    >
                      {portfolio.links.email}
                    </a>
                  )}
                </div>
              </section>
            );

          default:
            return null;
        }
      })}

      {/* Footer */}
      <footer className="bg-[#16161A] text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm">
          Built with{' '}
          <a
            href="https://snapportfolio.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: accentColor }}
          >
            SnapPortfolio
          </a>
        </div>
      </footer>
    </div>
  );
}
