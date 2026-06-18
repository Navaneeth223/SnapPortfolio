import { Portfolio, Project } from '@/types/portfolio.types';
import { TerminalHero } from './TerminalHero';
import { TerminalFileTree } from './TerminalFileTree';
import { ContributionHeatmap } from './ContributionHeatmap';

interface TerminalTemplateProps {
  portfolio: Portfolio;
  projects: Project[];
  contributions?: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
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
      className="min-h-screen bg-[#0D0E12] text-gray-100 font-mono"
      style={{
        ['--accent-color' as any]: accentColor,
      }}
    >
      {visibleSections.map((section) => {
        switch (section.id) {
          case 'hero':
            return <TerminalHero key="hero" portfolio={portfolio} />;

          case 'about':
            return (
              <section
                key="about"
                className="max-w-4xl mx-auto px-6 py-16"
              >
                <div className="text-gray-500 mb-2">// About</div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {portfolio.bio}
                </p>
              </section>
            );

          case 'skills':
            if (!portfolio.skills.length) return null;
            return (
              <section
                key="skills"
                className="max-w-4xl mx-auto px-6 py-16"
              >
                <div className="text-gray-500 mb-4">// Skills (package.json)</div>
                <div className="bg-[#16161A] rounded-lg p-6 border border-gray-800">
                  <pre className="text-sm">
                    <code>
                      {`{\n  "skills": [\n`}
                      {portfolio.skills.map((skill, i) => (
                        <span key={skill.name}>
                          {`    "${skill.name}"${i < portfolio.skills.length - 1 ? ',' : ''}\n`}
                        </span>
                      ))}
                      {`  ]\n}`}
                    </code>
                  </pre>
                </div>
              </section>
            );

          case 'projects':
            return (
              <section key="projects" className="max-w-4xl mx-auto px-6 py-16">
                <div className="text-gray-500 mb-4">// Projects</div>
                <TerminalFileTree
                  projects={includedProjects}
                  accentColor={accentColor}
                />
              </section>
            );

          case 'github-stats':
            if (!showContributionGraph || !contributions.length) return null;
            return (
              <section key="github-stats" className="max-w-4xl mx-auto px-6 py-16">
                <div className="text-gray-500 mb-4">// Contribution Graph</div>
                <ContributionHeatmap
                  contributions={contributions}
                  accentColor={accentColor}
                />
              </section>
            );

          case 'contact':
            return (
              <footer key="contact" className="border-t border-gray-800 py-12 mt-24">
                <div className="max-w-4xl mx-auto px-6">
                  <div className="text-gray-500 mb-4">$ contact --email</div>
                  {portfolio.links.email && (
                    <a
                      href={`mailto:${portfolio.links.email}`}
                      className="hover:underline"
                      style={{ color: accentColor }}
                    >
                      {portfolio.links.email}
                    </a>
                  )}
                  <div className="mt-8 text-xs text-gray-600">
                    Built with{' '}
                    <a
                      href="https://snapportfolio.app"
                      className="hover:underline"
                      style={{ color: accentColor }}
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
