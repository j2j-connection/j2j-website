import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { bookingUrl, site } from '@/content/site'

const title = 'J2J Time access request | Thank you'
export const metadata: Metadata = {
  title,
  description: 'Next steps after requesting access to J2J Time.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://j2j.info/j2j-time/thanks/' },
  openGraph: { title, images: [] },
  twitter: { card: 'summary', title, images: [] },
}

export default function TimeThanks() {
  return <>
    <section className="mx-auto max-w-5xl px-6 py-20 md:py-28 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">J2J Time · Request access</p>
      <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight md:text-6xl">Thanks for requesting access.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">After your request is received, we’ll get in touch to discuss your team’s setup and confirm how J2J Time fits your workflow. You haven’t connected any accounts or committed to a subscription.</p>
      <div className="mt-8 flex flex-wrap gap-5">
        <Link href="/j2j-time/" className="min-h-11 rounded-md bg-ink px-5 py-3 font-medium text-paper">Back to J2J Time</Link>
        <a href={bookingUrl ?? site.mailto} data-placement="j2j-time-thanks" className="min-h-11 py-3 font-medium underline underline-offset-4">Book a demo</a>
      </div>
      <p className="mt-6 text-sm text-muted">Questions or changes? Email <a href={site.mailto} className="underline underline-offset-4">{site.email}</a>.</p>
    </section>
    <Footer />
  </>
}
