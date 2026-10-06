import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

const title = 'Phone Activity Terms | J2J Connection'
const description = 'Access and use information for the assisted LC3 Phone Activity connection.'
const url = 'https://j2j.info/apps/phone-activity/terms/'

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', images: [] },
  twitter: { card: 'summary', title, description, images: [] },
}

export default function PhoneActivityTermsPage() {
  return (
    <>
      <article className="mx-auto max-w-5xl px-6 py-16 md:py-24 lg:px-8">
        <Link href="/apps/phone-activity/" className="inline-block py-2 text-sm text-muted underline underline-offset-4">← Phone Activity overview</Link>
        <h1 className="mt-8 font-display text-4xl font-extrabold tracking-tight md:text-6xl">Phone Activity terms</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">LC3 Phone Activity is an assisted connection provided by J2J Connection LLC. Last updated October 6, 2026.</p>
        <div className="mt-12 max-w-2xl space-y-10">
          <section>
            <h2 className="font-display text-2xl font-bold">Invited access</h2>
            <p className="mt-4 leading-relaxed text-muted">Access is by an individual setup invitation. Connect only an account and device you own or have authority to use, and only where the collection and processing of communications is permitted. Discuss personal communications and any required notices or consents with J2J before enabling capture. Keep your passwords and device PIN private.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">Service scope</h2>
            <p className="mt-4 leading-relaxed text-muted">The app extracts supported native message counts and call durations from a designated Google Drive backup folder. WhatsApp is excluded. Coverage depends on the device, backup app, permissions and connectivity and must be checked during setup. Activity reports require human review and do not determine billable hours automatically.</p>
            <p className="mt-4 leading-relaxed text-muted">The connection is currently being tested. A successful Google authorization does not confirm ongoing processing is active or that a device has passed its coverage check. J2J confirms activation separately.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">Your service agreement</h2>
            <p className="mt-4 leading-relaxed text-muted">Fees, delivery, support, acceptance and contractual responsibilities are governed by your separate service agreement with J2J Connection LLC. This page does not amend that agreement. Connecting Google does not authorize a new charge or approve a proposed implementation. Any commercial change requires separate agreement.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">Data and disconnection</h2>
            <p className="mt-4 leading-relaxed text-muted">Read the <Link href="/apps/phone-activity/privacy/" className="text-ink underline underline-offset-4">app privacy policy</Link> before authorizing. It describes full Drive permission, transient backup processing, retained metadata, deletion limits and the separate steps to stop backup uploads and revoke access. Ask J2J to disable processing or discuss changes to your setup at any time.</p>
          </section>
          <p className="leading-relaxed text-muted">Questions: <a href="mailto:tom@j2j.info" className="text-ink underline underline-offset-4">tom@j2j.info</a>.</p>
        </div>
      </article>
      <Footer />
    </>
  )
}
