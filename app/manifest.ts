import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SnapPortfolio',
    short_name: 'SnapPortfolio',
    description: 'Turn your GitHub repos into a beautiful portfolio in 30 seconds',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF8',
    theme_color: '#FF5A1F',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
