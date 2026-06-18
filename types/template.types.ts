import { Portfolio, Project } from './portfolio.types';

export interface TemplateProps {
  portfolio: Portfolio;
  projects: Project[];
}

export interface TemplateHeroProps {
  portfolio: Portfolio;
}

export interface TemplateProjectCardProps {
  project: Project;
  accentColor: string;
}
