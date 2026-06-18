import { Portfolio, Project } from '@/types/portfolio.types';
import { MonolithHero } from './MonolithHero';
import { MonolithProjectCard } from './MonolithProjectCard';
import { MonolithFooter } from './MonolithFooter';

interface MonolithTemplateProps {
  portfolio: Portfolio;
  projects: Project[];
}

export function MonolithTemplate({ portfolio, projects }: MonolithTemplateProps) {
  const { sections, showGithubStats, accentColor, colorMode } = portfolio;

  const visibleSections = sections
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  const pinnedProjects = projects.filter((p) => p.isPinned && p.isIncluded);
  const regularProjects = projects.filter((p) => !p.isPinned && p.isIncluded);

  const isDark = colorMode === 'dark';

  return (
    <div
      className={`min-h-screen ${isDark ? 'bg-[#0D0E12] text-white' : 'bg-white text-[#16161A]'}`}
      style={{
        ['--accent-color' as any]: accentColor,
      }}
    >
      {visibleSections.map((section) => {
        switch (section.id) {
          case 'hero':
            return <MonolithHero key="hero" portfolio={portfolio} />;

          case 'about':
            return (
              <section
                key="about"
                className="max-w-2xl mx-auto px-6 py-24"
              >
                <h2 className="font-display text-2xl font-semibold mb-6">
                  About
                </h2>
                <p
                  className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#5C5C66]'}`}
                  style={{ lineHeight: 1.7 }}
                >
                  {portfolio.bio}
                </p>
              </section>
            );

          case 'skills':
            if (!portfolio.skills.length) return null;
            return (
              <section
                key="skills"
                className="max-w-2xl mx-auto px-6 py-12"
              >
                <h2 className="font-display text-2xl font-semibold mb-6">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {portfolio.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`px-3 py-1.5 rounded-full border text-sm ${
                        isDark
                          ? 'border-gray-700 text-gray-300'
                          : 'border-[#DEDDD6] text-[#5C5C66]'
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            );

          case 'projects':
            return (
              <section key="projects" className="max-w-4xl mx-auto px-6 py-24">
                {pinnedProjects.length > 0 && (
                  <div className="mb-32">
                    <h2 className="font-display text-2xl font-semibold mb-12">
                      Featured Projects
                    </h2>
                    <div className="space-y-32">
                      {pinnedProjects.map((project) => (
                        <MonolithProjectCard
                          key={project._id}
                          project={project}
                          accentColor={accentColor}
                          isDark={isDark}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {regularProjects.length > 0 && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-12">
                      {pinnedProjects.length > 0 ? 'All Projects' : 'Projects'}
                    </h2>
                    <div className="space-y-32">
                      {regularProjects.map((project) => (
                        <MonolithProjectCard
                          key={project._id}
                          project={project}
                          accentColor={accentColor}
                          isDark={isDark}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );

          case 'contact':
            return <MonolithFooter key="contact" portfolio={portfolio} isDark={isDark} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
