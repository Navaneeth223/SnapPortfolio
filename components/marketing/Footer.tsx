import Link from 'next/link';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent-primary rounded-md" />
              <span className="font-display font-bold text-lg">SnapPortfolio</span>
            </div>
            <p className="text-sm text-text-secondary">
              GitHub to portfolio in 30 seconds.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/templates" className="hover:text-text-primary">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/examples" className="hover:text-text-primary">
                  Examples
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/about" className="hover:text-text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/privacy" className="hover:text-text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-subtle mt-8 pt-8 flex items-center justify-between text-sm text-text-muted">
          <p>© 2026 SnapPortfolio. All rights reserved.</p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-text-primary"
          >
            <Github className="w-4 h-4" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
