import { Portfolio } from '@/types/portfolio.types';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface MonolithFooterProps {
  portfolio: Portfolio;
  isDark: boolean;
}

export function MonolithFooter({ portfolio, isDark }: MonolithFooterProps) {
  return (
    <footer
      className={`border-t ${
        isDark ? 'border-gray-800' : 'border-[#ECEBE6]'
      } py-12`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-2">
              Get in touch
            </h3>
            {portfolio.links.email && (
              <a
                href={`mailto:${portfolio.links.email}`}
                className="hover:underline"
                style={{ color: 'var(--accent-color)' }}
              >
                {portfolio.links.email}
              </a>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {portfolio.links.github && (
              <a
                href={portfolio.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:opacity-70 transition-opacity ${
                  isDark ? 'text-gray-400' : 'text-[#9A9AA3]'
                }`}
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {portfolio.links.linkedin && (
              <a
                href={portfolio.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:opacity-70 transition-opacity ${
                  isDark ? 'text-gray-400' : 'text-[#9A9AA3]'
                }`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {portfolio.links.twitter && (
              <a
                href={portfolio.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:opacity-70 transition-opacity ${
                  isDark ? 'text-gray-400' : 'text-[#9A9AA3]'
                }`}
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {portfolio.links.email && (
              <a
                href={`mailto:${portfolio.links.email}`}
                className={`hover:opacity-70 transition-opacity ${
                  isDark ? 'text-gray-400' : 'text-[#9A9AA3]'
                }`}
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        <div
          className={`text-center mt-8 text-sm ${
            isDark ? 'text-gray-500' : 'text-[#9A9AA3]'
          }`}
        >
          Built with{' '}
          <a
            href="https://snapportfolio.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: 'var(--accent-color)' }}
          >
            SnapPortfolio
          </a>
        </div>
      </div>
    </footer>
  );
}
