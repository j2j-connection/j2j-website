import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { site } from '@/content/site'

const title = 'Privacy | J2J Connection'
const description = 'How J2J uses website analytics and referral information when you visit or book a call.'
const url = 'https://j2j.info/privacy/'

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', siteName: 'J2J Connection', images: [] },
  twitter: { card: 'summary', title, description, images: [] },
}

export default function PrivacyPage() {
  return (
    <>
      <article className="mx-auto max-w-5xl px-6 py-16 md:py-24 lg:px-8">
        <Link href="/" className="inline-block py-2 text-sm text-muted underline underline-offset-4">← Back to J2J</Link>
        <h1 className="mt-8 font-display text-4xl font-extrabold tracking-tight md:text-6xl">Privacy</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">This website is operated by {site.company}. Here is how information is handled when you visit or get in touch.</p>
        <div className="mt-12 max-w-2xl space-y-10">
          <section aria-labelledby="visits">
            <h2 id="visits" className="font-display text-2xl font-bold">Website visits</h2>
            <p className="mt-4 leading-relaxed text-muted">We use GoatCounter to understand which pages people visit and which links they click. Our website analytics does not receive your name or email address. We remove extra information from page addresses and send only the referring website’s domain, not its full address.</p>
          </section>
          <section aria-labelledby="referrals">
            <h2 id="referrals" className="font-display text-2xl font-bold">How you found us</h2>
            <p className="mt-4 leading-relaxed text-muted">We temporarily save referral and campaign labels in your browser tab, such as whether you arrived from a search engine or a newsletter link. If you follow a booking link, those labels and the page you clicked from are passed to Calendly so we can understand what led to the conversation.</p>
          </section>
          <section aria-labelledby="contact">
            <h2 id="contact" className="font-display text-2xl font-bold">Booking and getting in touch</h2>
            <p className="mt-4 leading-relaxed text-muted">Booking takes place on Calendly, not on this website. Information you enter there is handled through Calendly. Email links open your email app. The information you choose to send is separate from our website visit counts.</p>
            <p className="mt-4 leading-relaxed text-muted">For questions about this website or your information, email <a href={site.mailto} className="text-ink underline underline-offset-4">{site.email}</a>.</p>
          </section>
        </div>
      </article>
      <Footer />
    </>
  )
}
