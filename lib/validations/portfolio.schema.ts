import { z } from 'zod';

export const portfolioSchema = z.object({
  subdomain: z
    .string()
    .min(3, 'Subdomain must be at least 3 characters')
    .max(30, 'Subdomain must be less than 30 characters')
    .regex(/^[a-z0-9-]+$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens'),
  customDomain: z.string().url().optional().or(z.literal('')),
  template: z.enum(['monolith', 'terminal', 'gallery', 'brutalist']),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  colorMode: z.enum(['light', 'dark', 'auto']),
  fontPair: z.string(),
  displayName: z.string().min(1, 'Name is required').max(50),
  role: z.string().min(1, 'Role is required').max(100),
  tagline: z.string().max(200).optional(),
  bio: z.string().max(1000).optional(),
  location: z.string().max(100).optional(),
  links: z.object({
    github: z.string().url(),
    linkedin: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal('')),
    email: z.string().email().optional().or(z.literal('')),
    resumeUrl: z.string().url().optional().or(z.literal('')),
  }),
  showContributionGraph: z.boolean(),
  showGithubStats: z.boolean(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
});

export type PortfolioFormData = z.infer<typeof portfolioSchema>;
