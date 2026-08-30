import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://tdcsafetytraining-maker.github.io/TDC-Safety-Training-Academy';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Improving TDC Health & Safety Culture',
  description: 'TDC internal mobile health and safety awareness training.',
  icons: { icon: `${siteUrl}/favicon.svg` },
  openGraph: {
    title: 'Improving TDC Health & Safety Culture',
    description: 'TDC internal mobile health and safety awareness training.',
  },
  twitter: {
    card: 'summary',
    title: 'Improving TDC Health & Safety Culture',
    description: 'TDC internal mobile health and safety awareness training.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
