import type { Metadata } from 'next'
import Script from 'next/script'
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import NavigationAnalytics from '@/components/NavigationAnalytics'
import { goatCounterCode, site } from '@/content/site'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

const description =
  'J2J builds practical AI systems for construction and real estate teams. We improve project workflows, connect existing tools, and stay until the system works.'

export const metadata: Metadata = {
  metadataBase: new URL('https://j2j.info'),
  title: 'J2J Connection - AI Consulting for the Built Environment',
  description,
  openGraph: {
    title: 'J2J Connection - AI Consulting for the Built Environment',
    description,
    url: 'https://j2j.info/',
    siteName: 'J2J Connection',
    type: 'website',
    images: [{ url: 'https://j2j.info/og.png', width: 1733, height: 908, alt: 'J2J Connection. AI that earns its keep. Practical AI for the built environment.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'J2J Connection - AI Consulting for the Built Environment',
    description,
    images: ['https://j2j.info/og.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} bg-paper font-sans text-ink antialiased`}
      >
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <NavigationAnalytics />
        <main id="main-content" className="pt-20">{children}</main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'Organization', '@id': 'https://j2j.info/#organization', name: 'J2J Connection', legalName: site.company, url: 'https://j2j.info/', logo: 'https://j2j.info/J2J_logo.svg', email: site.email, description },
            { '@type': 'WebSite', '@id': 'https://j2j.info/#website', url: 'https://j2j.info/', name: 'J2J Connection', publisher: { '@id': 'https://j2j.info/#organization' } },
          ],
        }).replace(/</g, '\\u003c') }} />
        {goatCounterCode && (
          <Script
            data-j2j-analytics={goatCounterCode}
            strategy="afterInteractive"
            src="/site-analytics.js"
          />
        )}
      </body>
    </html>
  )
}
