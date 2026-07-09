import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { GlobalProvider } from '@/context/GlobalContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AccessibilityToolbar from '@/components/accessibility/AccessibilityToolbar';
import CookieBanner from '@/components/shared/CookieBanner';
import FloatingDonate from '@/components/shared/FloatingDonate';
import { organizationSchema } from '@/lib/jsonld';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | The Hans Foundation',
    default: 'The Hans Foundation (THF) | India Charitable Developmental Endowment',
  },
  description:
    'The Hans Foundation is one of India\'s largest charitable trusts, established in 2009. We drive social development, public health, inclusive learning, and disability rehabilitation across 23 states.',
  keywords: [
    'The Hans Foundation',
    'THF',
    'Charity India',
    'NGO India',
    'Mobile Medical Units',
    'Cochlear Implant India',
    'Rural Development',
    'Dialysis Centers India',
    'CSR Partnerships',
  ],
  authors: [{ name: 'The Hans Foundation' }],
  metadataBase: new URL('https://thehansfoundation.org'),
  openGraph: {
    title: 'The Hans Foundation | Transforming Lives across India',
    description:
      'THF supports grassroots development and signature programs in healthcare, education, and livelihood for marginalized Indian families.',
    url: 'https://thehansfoundation.org',
    siteName: 'The Hans Foundation',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Hans Foundation | India NGO',
    description:
      'Transforming lives across 23 states of India with signature programs in health, education, disability inclusion, and livelihoods.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="body">
        <GlobalProvider>
          {/* Skip Navigation Link for Accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to Main Content
          </a>

          {/* Navigation Bar */}
          <Header />

          {/* Accessibility toolbar float */}
          <AccessibilityToolbar />

          {/* Main Layout Area */}
          <main id="main-content" style={{ minHeight: '80vh', paddingTop: 'var(--header-height)' }}>
            {children}
          </main>

          {/* Standard Footer */}
          <Footer />

          {/* Floating Donate & Scroll to Top Buttons */}
          <FloatingDonate />

          {/* DPDPA/GDPR Compliant Cookie Consent Bar */}
          <CookieBanner />
        </GlobalProvider>
      </body>
    </html>
  );
}
