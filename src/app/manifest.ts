import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Hans Foundation',
    short_name: 'THF',
    description: 'A premium, accessible, and impact-focused website for The Hans Foundation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a2540',
    theme_color: '#0a2540',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
