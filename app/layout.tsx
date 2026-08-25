import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://tdcsafetytraining-maker.github.io/TDC-Safety-Training-Academy';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'TDC HSE Training Academy',
  description: 'Mobile OSHA safety training for TDC Contracting.',
  icons: { icon: `${siteUrl}/favicon.svg` },
  openGraph: {
    title: 'TDC Safety Academy',
    description: 'Mobile OSHA 1910 and 1926 safety training for TDC Contracting.',
  },
  twitter: {
    card: 'summary',
    title: 'TDC Safety Academy',
    description: 'Mobile OSHA 1910 and 1926 safety training for TDC Contracting.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
