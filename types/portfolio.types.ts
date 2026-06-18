export type TemplateId = 'monolith' | 'terminal' | 'gallery' | 'brutalist';
export type ColorMode = 'light' | 'dark' | 'auto';
export type SkillCategory = 'language' | 'framework' | 'tool';

export interface Link {
  github: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  email?: string;
  resumeUrl?: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: number;
}

export interface Section {
  id: string;
  isVisible: boolean;
  order: number;
}

export interface Portfolio {
  _id?: string;
  userId: string;
  subdomain: string;
  customDomain?: string;
  isPublished: boolean;
  template: TemplateId;
  accentColor: string;
  colorMode: ColorMode;
  fontPair: string;
  displayName: string;
  role: string;
  tagline: string;
  bio: string;
  location?: string;
  avatarUrl: string;
  links: Link;
  skills: Skill[];
  sections: Section[];
  showContributionGraph: boolean;
  showGithubStats: boolean;
  metaTitle: string;
  metaDescription: string;
  ogImageUrl?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  _id?: string;
  portfolioId: string;
  githubRepoId: number;
  repoName: string;
  repoUrl: string;
  defaultBranch: string;
  displayTitle: string;
  displayDescription: string;
  coverImageUrl?: string;
  liveUrl?: string;
  isPinned: boolean;
  stars: number;
  forks: number;
  primaryLanguage?: string;
  languages: { name: string; percent: number }[];
  lastCommitDate: Date;
  repoCreatedAt: Date;
  isIncluded: boolean;
  order: number;
  tags: string[];
  readmeExcerpt?: string;
  syncedAt: Date;
}
