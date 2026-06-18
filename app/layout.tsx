import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'SnapPortfolio — GitHub to Portfolio in 30 Seconds',
  description: 'Turn your GitHub repos into a beautiful, customizable portfolio site. No manual data entry. No drag-and-drop builder. Just GitHub in, polished portfolio out.',
  keywords: ['portfolio', 'github', 'developer', 'portfolio generator', 'portfolio builder'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
