import Hero from '@/components/Hero'
import Services from '@/components/Services'
import CaseStudy from '@/components/CaseStudy'
import HowItWorks from '@/components/HowItWorks'
import WhoWeAre from '@/components/WhoWeAre'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: 'https://j2j.info/' },
  verification: { google: 'bFnUxmqQLq0EXoNgffpttGaGn5CLQNb9ijslBIx9tUA' },
}

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <CaseStudy />
      <HowItWorks />
      <WhoWeAre />
      <Contact />
      <Footer />
    </>
  )
}
