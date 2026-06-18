import { Hero } from '@/components/marketing/Hero';
import { RepoMorphAnimation } from '@/components/marketing/RepoMorphAnimation';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { TemplateShowcase } from '@/components/marketing/TemplateShowcase';
import { ExamplesGrid } from '@/components/marketing/ExamplesGrid';
import { PricingTeaser } from '@/components/marketing/PricingTeaser';
import { Footer } from '@/components/marketing/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <RepoMorphAnimation />
      <HowItWorks />
      <TemplateShowcase />
      <ExamplesGrid />
      <PricingTeaser />
      <Footer />
    </main>
  );
}
