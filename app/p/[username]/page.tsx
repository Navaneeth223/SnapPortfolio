import { notFound } from 'next/navigation';
import { MonolithTemplate } from '@/components/portfolio-templates/monolith/MonolithTemplate';
import { TerminalTemplate } from '@/components/portfolio-templates/terminal/TerminalTemplate';
import { GalleryTemplate } from '@/components/portfolio-templates/gallery/GalleryTemplate';
import { BrutalistTemplate } from '@/components/portfolio-templates/brutalist/BrutalistTemplate';

// This would fetch from your API/database
async function getPortfolioData(username: string) {
  // TODO: Replace with actual API call
  // const res = await fetch(`${process.env.API_URL}/portfolio/public/${username}`);
  // if (!res.ok) return null;
  // return res.json();

  // Mock data for now
  return null;
}

export default async function PublicPortfolioPage({
  params,
}: {
  params: { username: string };
}) {
  const data = await getPortfolioData(params.username);

  if (!data) {
    notFound();
  }

  const { portfolio, projects, contributions } = data;

  // Render the appropriate template
  switch (portfolio.template) {
    case 'monolith':
      return <MonolithTemplate portfolio={portfolio} projects={projects} />;

    case 'terminal':
      return (
        <TerminalTemplate
          portfolio={portfolio}
          projects={projects}
          contributions={contributions}
        />
      );

    case 'gallery':
      return <GalleryTemplate portfolio={portfolio} projects={projects} />;

    case 'brutalist':
      return <BrutalistTemplate portfolio={portfolio} projects={projects} />;

    default:
      return <MonolithTemplate portfolio={portfolio} projects={projects} />;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const data = await getPortfolioData(params.username);

  if (!data) {
    return {
      title: 'Portfolio Not Found',
    };
  }

  const { portfolio } = data;

  return {
    title: portfolio.metaTitle || `${portfolio.displayName} - ${portfolio.role}`,
    description:
      portfolio.metaDescription ||
      portfolio.bio ||
      `Portfolio of ${portfolio.displayName}`,
    openGraph: {
      title: portfolio.metaTitle || portfolio.displayName,
      description: portfolio.metaDescription || portfolio.bio,
      images: portfolio.ogImageUrl ? [portfolio.ogImageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: portfolio.metaTitle || portfolio.displayName,
      description: portfolio.metaDescription || portfolio.bio,
      images: portfolio.ogImageUrl ? [portfolio.ogImageUrl] : [],
    },
  };
}
