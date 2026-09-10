import type { Metadata } from 'next'
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { goatCounterCode } from '@/content/site'

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
  keywords: [
    'AI consulting',
    'construction AI consulting',
    'built environment AI',
    'architecture engineering construction AI',
    'real estate automation',
    'project workflow automation',
  ],
  openGraph: {
    title: 'J2J Connection - AI Consulting for the Built Environment',
    description,
    url: 'https://j2j.info',
    siteName: 'J2J Connection',
    type: 'website',
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
        <Header />
        <main className="pt-20">{children}</main>
        {goatCounterCode && (
          <script
            data-goatcounter={`https://${goatCounterCode}.goatcounter.com/count`}
            async
            src="https://gc.zgo.at/count.js"
          />
        )}
      </body>
    </html>
  )
}
