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
  'J2J is a two-brother AI consultancy. We find where AI saves your business real time and money, build the system, and run it with you.'

export const metadata: Metadata = {
  metadataBase: new URL('https://j2j.info'),
  title: 'J2J Connection - Practical AI Consulting',
  description,
  keywords: [
    'AI consulting',
    'small business AI',
    'practical AI',
    'AI automation',
    'custom AI systems',
  ],
  openGraph: {
    title: 'J2J Connection - Practical AI Consulting',
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
