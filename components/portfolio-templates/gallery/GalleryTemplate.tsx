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
      className="min-h-screen bg-white"
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
                className="max-w-4xl mx-auto px-6 py-16"
              >
                <h2
                  className="font-display text-4xl font-bold mb-6"
                  style={{ color: accentColor }}
                >
                  About Me
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {portfolio.bio}
                </p>
              </section>
            );

          case 'skills':
            if (!portfolio.skills.length) return null;
            return (
              <section
                key="skills"
                className="bg-gray-50 py-16"
              >
                <div className="max-w-6xl mx-auto px-6">
                  <h2
                    className="font-display text-4xl font-bold mb-8 text-center"
                    style={{ color: accentColor }}
                  >
                    Skills & Tools
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {portfolio.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="font-semibold text-gray-800">
                          {skill.name}
                        </div>
                        {skill.proficiency > 0 && (
                          <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full"
                              style={{
                                width: `${skill.proficiency}%`,
                                backgroundColor: accentColor,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'projects':
            return (
              <section key="projects" className="py-16">
                {pinnedProjects.length > 0 && (
                  <div className="max-w-7xl mx-auto px-6 mb-16">
                    <h2
                      className="font-display text-4xl font-bold mb-8"
                      style={{ color: accentColor }}
                    >
                      Featured Work
                    </h2>
                    <GalleryMasonry
                      projects={pinnedProjects}
                      accentColor={accentColor}
                      featured
                    />
                  </div>
                )}

                {regularProjects.length > 0 && (
                  <div className="max-w-7xl mx-auto px-6">
                    <h2
                      className="font-display text-4xl font-bold mb-8"
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
              <footer
                key="contact"
                className="py-16"
                style={{ backgroundColor: accentColor }}
              >
                <div className="max-w-4xl mx-auto px-6 text-center text-white">
                  <h2 className="font-display text-4xl font-bold mb-4">
                    Let&apos;s Work Together
                  </h2>
                  {portfolio.links.email && (
                    <a
                      href={`mailto:${portfolio.links.email}`}
                      className="inline-block mt-4 px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Get in Touch
                    </a>
                  )}
                  <div className="mt-12 text-sm opacity-80">
                    Built with{' '}
                    <a
                      href="https://snapportfolio.app"
                      className="underline hover:no-underline"
                    >
                      SnapPortfolio
                    </a>
                  </div>
                </div>
              </footer>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
