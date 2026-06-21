import { BarChart3, TrendingUp, Users, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
  // TODO: Fetch real analytics data
  const stats = {
    totalViews: 1247,
    thisWeek: 142,
    weeklyChange: 12,
    topCountries: [
      { country: 'United States', views: 456, flag: '🇺🇸' },
      { country: 'United Kingdom', views: 234, flag: '🇬🇧' },
      { country: 'Canada', views: 123, flag: '🇨🇦' },
      { country: 'Germany', views: 98, flag: '🇩🇪' },
      { country: 'India', views: 87, flag: '🇮🇳' },
    ],
    topReferrers: [
      { source: 'Direct', views: 567 },
      { source: 'LinkedIn', views: 234 },
      { source: 'Twitter', views: 156 },
      { source: 'GitHub', views: 123 },
      { source: 'Other', views: 167 },
    ],
    devices: [
      { type: 'Desktop', views: 789, percentage: 63 },
      { type: 'Mobile', views: 345, percentage: 28 },
      { type: 'Tablet', views: 113, percentage: 9 },
    ],
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
            <Link href="/dashboard" className="text-text-secondary hover:text-text-primary">
              Dashboard
            </Link>
            <Link href="/editor" className="text-text-secondary hover:text-text-primary">
              Editor
            </Link>
            <Link href="/analytics" className="text-text-primary font-medium">
              Analytics
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-text-secondary">
            Track how visitors interact with your portfolio
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-bg-surface rounded-lg border border-border-default shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary text-sm">Total Views</span>
              <BarChart3 className="w-5 h-5 text-text-muted" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.totalViews.toLocaleString()}</div>
            <div className="text-xs text-text-muted">All time</div>
          </div>

          <div className="bg-bg-surface rounded-lg border border-border-default shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary text-sm">This Week</span>
              <TrendingUp className="w-5 h-5 text-accent-green" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.thisWeek}</div>
            <div className="text-xs text-accent-green">+{stats.weeklyChange}% vs last week</div>
          </div>

          <div className="bg-bg-surface rounded-lg border border-border-default shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary text-sm">Unique Visitors</span>
              <Users className="w-5 h-5 text-text-muted" />
            </div>
            <div className="text-3xl font-bold mb-1">892</div>
            <div className="text-xs text-text-muted">This month</div>
          </div>

          <div className="bg-bg-surface rounded-lg border border-border-default shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary text-sm">Countries</span>
              <Globe className="w-5 h-5 text-text-muted" />
            </div>
            <div className="text-3xl font-bold mb-1">45</div>
            <div className="text-xs text-text-muted">All time</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Countries */}
          <div className="bg-bg-surface rounded-lg border border-border-default shadow-sm p-6">
            <h3 className="font-semibold mb-4">Top Countries</h3>
            <div className="space-y-3">
              {stats.topCountries.map((country) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="text-sm">{country.country}</span>
                  </div>
                  <span className="text-sm font-semibold">{country.views}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Referrers */}
          <div className="bg-bg-surface rounded-lg border border-border-default shadow-sm p-6">
            <h3 className="font-semibold mb-4">Top Referrers</h3>
            <div className="space-y-3">
              {stats.topReferrers.map((referrer) => (
                <div key={referrer.source} className="flex items-center justify-between">
                  <span className="text-sm">{referrer.source}</span>
                  <span className="text-sm font-semibold">{referrer.views}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-bg-surface rounded-lg border border-border-default shadow-sm p-6">
            <h3 className="font-semibold mb-4">Device Types</h3>
            <div className="space-y-3">
              {stats.devices.map((device) => (
                <div key={device.type} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{device.type}</span>
                    <span className="font-semibold">{device.views} ({device.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-primary"
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Views Over Time (Placeholder) */}
          <div className="bg-bg-surface rounded-lg border border-border-default shadow-sm p-6">
            <h3 className="font-semibold mb-4">Views Over Time</h3>
            <div className="h-48 flex items-end justify-between gap-2">
              {[45, 67, 82, 56, 89, 103, 142].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-accent-primary rounded-t opacity-80 hover:opacity-100 transition-opacity"
                  style={{ height: `${(height / 150) * 100}%` }}
                  title={`${height} views`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-text-muted">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Pro Upsell */}
        <div className="mt-12 bg-gradient-to-br from-accent-tint to-bg-surface border border-accent-primary rounded-lg p-8 text-center">
          <h3 className="font-display text-2xl font-bold mb-2">
            Unlock Full Analytics History
          </h3>
          <p className="text-text-secondary mb-6">
            Free plan shows last 7 days. Upgrade to Pro for unlimited history and advanced insights.
          </p>
          <button className="px-6 py-3 bg-accent-primary text-white rounded-md font-semibold hover:bg-accent-hover transition-colors">
            Upgrade to Pro →
          </button>
        </div>
      </main>
    </div>
  );
}
