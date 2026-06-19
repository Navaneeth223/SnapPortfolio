import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit, RefreshCw, BarChart } from 'lucide-react';

export default function DashboardPage() {
  // TODO: Fetch user's portfolio data
  const portfolio = {
    subdomain: 'navaneeth',
    isPublished: true,
    lastUpdated: '2 days ago',
    views: 142,
  };

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <header className="bg-bg-surface border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-primary rounded-md" />
            <span className="font-display font-bold text-xl">SnapPortfolio</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-text-primary font-medium">
              Dashboard
            </Link>
            <Link href="/editor" className="text-text-secondary hover:text-text-primary">
              Editor
            </Link>
            <Link href="/analytics" className="text-text-secondary hover:text-text-primary">
              Analytics
            </Link>
            <Link href="/settings" className="text-text-secondary hover:text-text-primary">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title & Actions */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Your Portfolio</h1>
            <div className="flex items-center gap-3 text-sm text-text-secondary">
              <a
                href={`https://${portfolio.subdomain}.snapportfolio.app`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-primary"
              >
                {portfolio.subdomain}.snapportfolio.app
              </a>
              <span>•</span>
              <span className="flex items-center gap-1">
                {portfolio.isPublished ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-accent-green" />
                    Published
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    Draft
                  </>
                )}
              </span>
              <span>•</span>
              <span>Last updated {portfolio.lastUpdated}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/p/${portfolio.subdomain}`} target="_blank">
              <Button variant="secondary">
                <ExternalLink className="w-4 h-4 mr-2" />
                View live
              </Button>
            </Link>
            <Link href="/editor">
              <Button>
                <Edit className="w-4 h-4 mr-2" />
                Edit Portfolio
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Preview */}
          <div className="md:col-span-2">
            <div className="bg-bg-surface rounded-lg border border-border-default shadow-sm overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <span className="text-text-muted">Portfolio Preview</span>
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">Live Preview</h3>
                <p className="text-sm text-text-secondary">
                  Click &quot;View live&quot; to see your published portfolio, or &quot;Edit Portfolio&quot; to make changes.
                </p>
              </div>
            </div>
          </div>

          {/* Stats & Quick Actions */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-bg-surface rounded-lg border border-border-default shadow-sm p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                This Week
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-3xl font-bold">{portfolio.views}</div>
                  <div className="text-sm text-text-secondary">Portfolio views</div>
                </div>
                <Link href="/analytics">
                  <Button variant="link" className="p-0">
                    View full analytics →
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-bg-surface rounded-lg border border-border-default shadow-sm p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Add a new project
                </button>
                <button className="w-full text-left text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Update your bio
                </button>
                <button className="w-full text-left text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Change template
                </button>
                <button className="w-full text-left text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Set up custom domain
                </button>
              </div>
            </div>

            {/* GitHub Sync */}
            <div className="bg-bg-surface rounded-lg border border-border-default shadow-sm p-6">
              <h3 className="font-semibold mb-2">GitHub Sync</h3>
              <p className="text-sm text-text-secondary mb-4">
                Last synced 2 hours ago
              </p>
              <Button variant="secondary" size="sm" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync now
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold">Recent Projects</h2>
            <Link href="/editor/projects">
              <Button variant="link">Manage projects →</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-bg-surface rounded-lg border border-border-default shadow-sm p-6"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-4" />
                <h3 className="font-semibold mb-2">Project {i}</h3>
                <p className="text-sm text-text-secondary mb-4">
                  Project description goes here...
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-bg-muted rounded font-mono">
                    TypeScript
                  </span>
                  <span className="text-xs text-text-muted">★ 24</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
