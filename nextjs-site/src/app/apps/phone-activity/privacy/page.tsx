import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

const title = 'Phone Activity Privacy | J2J Connection'
const description = 'What LC3 Phone Activity accesses, processes, retains and deletes, and how to disconnect.'
const url = 'https://j2j.info/apps/phone-activity/privacy/'

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', images: [] },
  twitter: { card: 'summary', title, description, images: [] },
}

export default function PhoneActivityPrivacyPage() {
  return (
    <>
      <article className="mx-auto max-w-5xl px-6 py-16 md:py-24 lg:px-8">
        <Link href="/apps/phone-activity/" className="inline-block py-2 text-sm text-muted underline underline-offset-4">← Phone Activity overview</Link>
        <h1 className="mt-8 font-display text-4xl font-extrabold tracking-tight md:text-6xl">Phone Activity privacy</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">This policy covers LC3 Phone Activity, operated by J2J Connection LLC. It is separate from our website visitor privacy notice. Last updated October 6, 2026.</p>
        <div className="mt-12 max-w-2xl space-y-10">
          <section>
            <h2 className="font-display text-2xl font-bold">What you authorize</h2>
            <p className="mt-4 leading-relaxed text-muted">The app requests your Google email identity to verify that you own the configured backup folder, and full Google Drive access to read and permanently delete eligible backup files. This Google permission is broad. Our code restricts operations to the configured folder and expected backup files; the restriction is not enforced by Google’s permission system.</p>
            <p className="mt-4 leading-relaxed text-muted">A separate Android backup app collects and uploads phone data under its own permissions and privacy terms. Its backups may include message contents, phone numbers, contact names, attachments and call logs, including personal communications. This app does not collect WhatsApp communications.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">What we process and retain</h2>
            <p className="mt-4 leading-relaxed text-muted">The server downloads full backup files into bounded memory to extract activity metadata. Message contents therefore pass through the server during processing, even though our retained phone history does not store message bodies, subjects, contact names or the other party’s phone number.</p>
            <p className="mt-4 leading-relaxed text-muted">Retained history includes dates, direction, activity type, connected call seconds and keyed pseudonymous identifiers used to prevent duplicates and associate activity with client projects. These identifiers are not anonymous. Setup records retain your enrolled phone number, Google email, folder identifier, encrypted Google refresh credential and project mappings. Import receipts and controlled error codes support operation and troubleshooting.</p>
            <p className="mt-4 leading-relaxed text-muted">The phone importer does not send backup content to a generative AI model. The separate work-report system may use AI for other approved sources; that does not authorize AI processing of your phone backup contents.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">Providers and access</h2>
            <p className="mt-4 leading-relaxed text-muted">Google Drive stores the uploaded backups. Vercel hosts the processing service, and Neon stores retained metadata and encrypted connection credentials. When report delivery is enabled, Resend processes the report email for the recipients agreed during setup. GitHub Actions triggers the server worker but does not receive raw backups or Google credentials.</p>
            <p className="mt-4 leading-relaxed text-muted">J2J operators use access-controlled tools to configure and support the connection and review retained activity. We will not read raw communication content without your specific affirmative agreement, except where necessary for security, legal compliance or another use permitted by Google’s Limited Use requirements. Google access tokens are used for the connection; refresh credentials are encrypted before database storage, and service connections use HTTPS.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">Deletion and retention</h2>
            <p className="mt-4 leading-relaxed text-muted">After a successful import, the worker permanently deletes the processed Drive backup and checks that it is absent. Failed recent imports remain for retry; the worker attempts to remove expired unprocessed backups after 24 hours and records a gap. Deletion is best effort: outages, revoked access, changed files or insufficient permissions can leave files in Drive longer. This is not a guaranteed 24-hour maximum.</p>
            <p className="mt-4 leading-relaxed text-muted">Deleting a cloud backup does not remove the original messages or call history from your phone. Later backups can contain the same older conversations again. Local phone backups and the backup app’s settings need separate management.</p>
            <p className="mt-4 leading-relaxed text-muted">Historical metadata retention, report recipients and any applicable legal retention requirements must be agreed before ongoing customer processing is enabled. Contact us to request deletion of your retained phone records or connection credential. Existing delivered reports and provider recovery copies may need separate handling; we will explain what can be removed and any required retention.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">Your choices</h2>
            <p className="mt-4 leading-relaxed text-muted">You can <a href="https://myaccount.google.com/connections" className="text-ink underline underline-offset-4">revoke Google access</a> at any time and ask J2J to disable the source. Revocation stops future Google access but does not automatically erase previously retained metadata or stop the separate backup app uploading. Disable that app’s schedule or cloud connection separately if you want uploads to stop.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">Google Limited Use</h2>
            <p className="mt-4 leading-relaxed text-muted">LC3 Phone Activity’s use and transfer of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-ink underline underline-offset-4">Google API Services User Data Policy</a>, including the Limited Use requirements. Google data and derived phone activity are used only to provide and support the authorized feature, not sold, used for advertising or used to train general-purpose AI models. Transfers are limited to the consented feature, security needs, legal requirements or other transfers expressly permitted by that policy.</p>
          </section>
          <p className="leading-relaxed text-muted">For questions, disconnection or deletion requests, contact <a href="mailto:tom@j2j.info" className="text-ink underline underline-offset-4">tom@j2j.info</a>. Website visit measurement is explained in our <Link href="/privacy/" className="text-ink underline underline-offset-4">website privacy notice</Link>.</p>
        </div>
      </article>
      <Footer />
    </>
  )
}
