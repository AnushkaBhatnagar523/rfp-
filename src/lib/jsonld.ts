/**
 * JSON-LD Structured Data Helpers for The Hans Foundation
 * Implements Schema.org types for rich Google results
 */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'NGO'],
  name: 'The Hans Foundation',
  alternateName: 'THF',
  url: 'https://thehansfoundation.org',
  logo: 'https://thehansfoundation.org/logo.png',
  description:
    'The Hans Foundation is one of India\'s largest public charitable trusts, driving social development across healthcare, education, livelihoods, disability rehabilitation, clean water, and disaster relief across 23 Indian states.',
  foundingDate: '2009',
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-11-4652-4444',
      contactType: 'customer support',
      areaServed: 'IN',
      availableLanguage: ['Hindi', 'English'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Building 8, 4th Floor, Local Shopping Centre, Madangir',
    addressLocality: 'New Delhi',
    postalCode: '110062',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/thehansfoundation',
    'https://twitter.com/thehansfdn',
    'https://www.linkedin.com/company/the-hans-foundation',
    'https://www.instagram.com/thehansfoundation',
    'https://www.youtube.com/@thehansfoundation',
  ],
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: 500,
  },
};

export function breadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://thehansfoundation.org${crumb.item}`,
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  datePublished: string;
  author: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    author: {
      '@type': 'Person',
      name: opts.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Hans Foundation',
      logo: {
        '@type': 'ImageObject',
        url: 'https://thehansfoundation.org/logo.png',
      },
    },
    image: opts.image ?? 'https://thehansfoundation.org/og-image.jpg',
    mainEntityOfPage: 'https://thehansfoundation.org/blog',
  };
}

export function jobPostingSchema(opts: {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  datePosted: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: opts.title,
    description: opts.description,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'The Hans Foundation',
      sameAs: 'https://thehansfoundation.org',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: opts.location,
        addressCountry: 'IN',
      },
    },
    employmentType: opts.employmentType,
    datePosted: opts.datePosted,
    validThrough: '2026-12-31',
  };
}

export function faqPageSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
