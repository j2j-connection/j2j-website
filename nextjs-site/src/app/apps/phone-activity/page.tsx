import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

const title = 'LC3 Phone Activity | J2J Connection'
const description = 'An assisted Android phone-activity connection for message counts and call durations.'
const url = 'https://j2j.info/apps/phone-activity/'

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', images: [] },
  twitter: { card: 'summary', title, description, images: [] },
}

export default function PhoneActivityPage() {
  return (
    <>
      <article className="mx-auto max-w-5xl px-6 py-16 md:py-24 lg:px-8">
        <Link href="/" className="inline-block py-2 text-sm text-muted underline underline-offset-4">← Back to J2J</Link>
        <p className="mt-8 font-mono text-sm uppercase tracking-wider text-muted">Assisted setup · Currently in testing</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-6xl">LC3 Phone Activity</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">Built by J2J Connection LLC to help an enrolled user review Android message counts and connected call durations alongside their work activity.</p>
        <div className="mt-12 max-w-2xl space-y-10">
          <section>
            <h2 className="font-display text-2xl font-bold">How the connection works</h2>
            <p className="mt-4 leading-relaxed text-muted">A separately installed backup app uploads supported native messages and call logs to a designated folder in your Google Drive. You then authorize this app to read those backups, retain activity metadata and preserve the original backup files for comparison. Automatic archive deletion requires a separate retention decision. Your original phone conversations are not deleted.</p>
            <p className="mt-4 leading-relaxed text-muted">Reports show message counts and call durations. A setup operator can associate activity with agreed client projects. Counts are evidence to review, not automatically calculated billable hours. WhatsApp is not included. RCS and attachment coverage depend on the device and backup app and need individual testing.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">Before you connect</h2>
            <p className="mt-4 leading-relaxed text-muted">Google asks for full Google Drive access. The app’s code restricts its operations to the designated backup folder, but Google does not enforce a folder-only restriction. Backups can include personal as well as work communications. Read the app-specific privacy policy before authorizing.</p>
            <p className="mt-4 leading-relaxed text-muted">Connection is by an individual setup invitation from J2J, not an open signup. Testing is underway; connecting Google does not itself confirm automatic processing is active. J2J will verify the first backups with you before enabling ongoing use.</p>
          </section>
          <p className="leading-relaxed"><Link href="/apps/phone-activity/privacy/" className="text-ink underline underline-offset-4">Read the Phone Activity privacy policy</Link></p>
          <p className="leading-relaxed"><Link href="/apps/phone-activity/terms/" className="text-ink underline underline-offset-4">Phone Activity terms of use</Link></p>
          <p className="leading-relaxed text-muted">For setup or data questions, email <a href="mailto:tom@j2j.info" className="text-ink underline underline-offset-4">tom@j2j.info</a>.</p>
        </div>
      </article>
      <Footer />
    </>
  )
}
