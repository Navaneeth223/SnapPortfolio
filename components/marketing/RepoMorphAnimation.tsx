'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function RepoMorphAnimation() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Plain GitHub Repo List */}
        <div>
          <p className="text-sm text-text-muted mb-4 font-mono">
            This is github.com
          </p>
          <div className="bg-bg-surface border border-border-default rounded p-4 space-y-3">
            <RepoListItem
              name="freelanceflow"
              desc="Freelance management SaaS"
              lang="TypeScript"
              stars={14}
            />
            <RepoListItem
              name="portfolio-v2"
              desc="Personal portfolio website"
              lang="JavaScript"
              stars={3}
            />
            <RepoListItem
              name="cli-tool"
              desc="Command line productivity tool"
              lang="Go"
              stars={8}
            />
          </div>
        </div>

        {/* Right: Polished Portfolio Cards */}
        <div>
          <p className="text-sm text-text-muted mb-4 font-display font-semibold">
            This is your portfolio
          </p>
          <div className="space-y-4">
            <PortfolioCard
              title="FreelanceFlow"
              desc="A comprehensive SaaS platform for freelancers to manage clients, projects, and invoices"
              lang="TypeScript"
              gradient="from-blue-500 to-purple-600"
            />
          </div>
        </div>
      </div>

      <p className="text-center text-text-secondary mt-12 text-lg">
        Same data. Different presentation.
      </p>
    </section>
  );
}

function RepoListItem({
  name,
  desc,
  lang,
  stars,
}: {
  name: string;
  desc: string;
  lang: string;
  stars: number;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-1">
        <h4 className="font-mono text-sm text-accent-primary">{name}</h4>
        <p className="text-xs text-text-muted mt-0.5">{desc}</p>
        <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            {lang}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {stars}
          </span>
          <span>Updated 3 days ago</span>
        </div>
      </div>
    </div>
  );
}

function PortfolioCard({
  title,
  desc,
  lang,
  gradient,
}: {
  title: string;
  desc: string;
  lang: string;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-bg-surface rounded-lg border border-border-subtle shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className={`h-32 bg-gradient-to-br ${gradient}`} />
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
        <p className="text-text-secondary text-sm mb-4">{desc}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-bg-muted rounded-md font-mono">
            {lang}
          </span>
          <span className="text-accent-primary text-sm hover:underline cursor-pointer">
            View Project →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
