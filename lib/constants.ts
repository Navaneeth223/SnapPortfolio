export const TEMPLATES = [
  {
    id: 'monolith',
    name: 'Monolith',
    description: 'Minimal, typography-led design with generous whitespace',
    bestFor: 'Backend devs, minimalists, senior engineers',
    features: [
      'Single column layout',
      'Huge display serif typography',
      'Focus on content, not decoration',
      'Light or dark mode toggle',
    ],
  },
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'Developer-flavored with terminal/IDE aesthetics',
    bestFor: 'Devs who want personality, OSS contributors',
    features: [
      'Terminal window chrome',
      'Monospace typography throughout',
      'File tree style project list',
      'GitHub contribution heatmap',
    ],
  },
  {
    id: 'gallery',
    name: 'Gallery',
    description: 'Visual-first magazine-style masonry grid',
    bestFor: 'Frontend/design-leaning devs with visual projects',
    features: [
      'Masonry grid layout',
      'Large project preview images',
      'Magazine-inspired typography',
      'Asymmetric grid design',
    ],
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    description: 'Bold, high-contrast with black borders everywhere',
    bestFor: 'Devs who want to stand out, creative coders',
    features: [
      'Black borders, no border-radius',
      'Oversized typography',
      'High contrast color blocks',
      'Asymmetric, editorial layout',
    ],
  },
] as const;

export const FONT_PAIRS = {
  editorial: {
    name: 'Editorial',
    display: 'Fraunces',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
  technical: {
    name: 'Technical',
    display: 'JetBrains Mono',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
  classic: {
    name: 'Classic',
    display: 'Playfair Display',
    body: 'Source Sans Pro',
    mono: 'Roboto Mono',
  },
  modern: {
    name: 'Modern',
    display: 'Space Grotesk',
    body: 'Inter',
    mono: 'Fira Code',
  },
} as const;

export const COLOR_PRESETS = [
  { name: 'Signal Orange', hex: '#FF5A1F' },
  { name: 'Electric Blue', hex: '#3B6FF6' },
  { name: 'Forest Green', hex: '#16A34A' },
  { name: 'Royal Purple', hex: '#8B5CF6' },
  { name: 'Crimson Red', hex: '#DC2626' },
  { name: 'Amber', hex: '#F59E0B' },
] as const;

export const RESERVED_SUBDOMAINS = [
  'www',
  'api',
  'app',
  'admin',
  'dashboard',
  'auth',
  'login',
  'signup',
  'register',
  'blog',
  'docs',
  'help',
  'support',
  'status',
  'mail',
  'email',
  'ftp',
  'ssh',
  'dev',
  'staging',
  'test',
] as const;

export const SECTION_TYPES = [
  { id: 'hero', label: 'Hero', required: true },
  { id: 'about', label: 'About', required: false },
  { id: 'skills', label: 'Skills', required: false },
  { id: 'projects', label: 'Projects', required: true },
  { id: 'github-stats', label: 'GitHub Stats', required: false },
  { id: 'contact', label: 'Contact', required: false },
] as const;
