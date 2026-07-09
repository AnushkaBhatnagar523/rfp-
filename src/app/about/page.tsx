import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Our Story, Vision & Leadership',
  description:
    'Learn about The Hans Foundation\'s journey since 2009, our vision for an equitable India, leadership team, and board of trustees driving social development.',
  openGraph: {
    title: 'About The Hans Foundation | THF India',
    description:
      'Established in 2009, THF is one of India\'s largest charitable trusts working across healthcare, education, livelihoods and disability rehabilitation.',
    url: 'https://thehansfoundation.org/about/our-story',
  },
};

// This file exports metadata for the About section pages.
// The actual layout is in layout.tsx
export default function AboutPage() {
  return null;
}
