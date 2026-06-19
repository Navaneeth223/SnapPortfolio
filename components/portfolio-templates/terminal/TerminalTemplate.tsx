import { Portfolio, Project } from '@/types/portfolio.types';
import { TerminalHero } from './TerminalHero';
import { TerminalFileTree } from './TerminalFileTree';
import { ContributionHeatmap } from './ContributionHeatmap';

interface TerminalTemplateProps {
  portfolio: Portfolio;
  projects: Project[];
  contributions?: any[];
}

export function TerminalTemplate({
  portfolio,
  projects,
  contributions = [],
}: TerminalTemplateProps) {
  const { sections, showContributionGraph, accentColor } = portfolio;

  const visibleSections = sections
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  const includedProjects = projects.filter((p) => p.isIncluded);

  return (
    <div
      className="min-h-screen bg-[#0D0E12] text-[#E6EDF3] font-mono"
      style={{
        ['--accent-color' as any]: accentColor,
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-12">
        {visibleSections.map((section) => {
          switch (section.id) {
            case 'hero':
              return <TerminalHero key="hero" portfolio={portfolio} />;

            case 'about':
              return (
                <section key="about" className="mb-16">
                  <div className="text-[#7D8590] mb-2">// About</div>
                  <p className="text-[#E6EDF3] leading-relaxed">
                    {portfolio.bio}
                  </p>
                </section>
              );

            case 'skills':
              if (!portfolio.skills.length) return null;
              return (
                <section key="skills" className="mb-16">
                  <div className="text-[#7D8590] mb-4">// package.json</div>
                  <div className="bg-[#161B22] border border-[#30363D] rounded p-4 overflow-x-auto">
                    <pre className="text-sm">
                      <code>
                        {`{
  "skills": [`}
                        {portfolio.skills.map((skill, index) => (
                          <span key={skill.name}>
                            {'\n    '}
                            <span style={{ color: accentColor }}>
                              "{skill.name}"
                            </span>
                            {index < portfolio.skills.length - 1 ? ',' : ''}
                          </span>
                        ))}
                        {'\n  ]'}
                        {'\n}'}
                      </code>
                    </pre>
                  </div>
                </section>
              );

            case 'projects':
              return (
                <section key="projects" className="mb-16">
                  <div className="text-[#7D8590] mb-4">// Projects</div>
                  <TerminalFileTree projects={includedProjects} accentColor={accentColor} />
                </section>
              );

            case 'github-stats':
              if (!showContributionGraph || !contributions.length) return null;
              return (
                <section key="github-stats" className="mb-16">
                  <div className="text-[#7D8590] mb-4">// Contribution Activity</div>
                  <ContributionHeatmap
                    contributions={contributions}
                    accentColor={accentColor}
                  />
                </section>
              );

            case 'contact':
              return (
                <section key="contact" className="mb-16">
                  <div className="text-[#7D8590] mb-4">// Contact</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#7D8590]">$</span>
                    <span>contact --email</span>
                    <span style={{ color: accentColor }}>
                      {portfolio.links.email || 'not specified'}
                    </span>
                  </div>
                  {portfolio.links.github && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[#7D8590]">$</span>
                      <span>open</span>
                      <a
                        href={portfolio.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        style={{ color: accentColor }}
                      >
                        {portfolio.links.github}
                      </a>
                    </div>
                  )}
                </section>
              );

            default:
              return null;
          }
        })}

        {/* Footer */}
        <footer className="text-center text-[#7D8590] text-sm mt-24 pb-12">
          <div className="flex items-center justify-center gap-2">
            <span>$</span>
            <span>Built with</span>
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
    </div>
  );
}
