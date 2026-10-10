import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

const title = 'Automatic billable-time tracking: choosing a workflow | J2J Connection'
const description = 'How to turn email, calendar and phone activity into a timesheet you can review. Compare manual timers with activity-based reporting and plan QuickBooks Time handoff.'
const url = 'https://j2j.info/guides/automatic-billable-time-tracking/'
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, type: 'article', siteName: 'J2J Connection', images: [] },
  twitter: { card: 'summary', title, description, images: [] },
}

export default function TimeTrackingGuide() {
  return <>
    <article className="mx-auto max-w-5xl px-6 py-16 md:py-24 lg:px-8">
      <Link href="/j2j-time/" className="inline-block min-h-11 py-2 text-sm text-muted underline underline-offset-4">← J2J Time</Link>
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted">A practical guide · By J2J Connection</p>
      <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">Automatic billable-time tracking starts with the work behind the hours.</h1>
      <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">Automatic time tracking uses records of your work to help assemble a timesheet. For client work, the useful inputs can include emails, calendar events, calls and messages. Those records help you remember what happened; a person still needs to decide the correct project, duration and billing treatment.</p>
      <div className="mt-12 max-w-3xl space-y-12">
        <section aria-labelledby="scattered-work">
          <h2 id="scattered-work" className="font-display text-2xl font-bold">Why billable work is easy to miss</h2>
          <p className="mt-4 leading-relaxed text-muted">A meeting is on the calendar. The follow-up is in email. A quick client call happens between two other tasks. At the end of the week, you have to pull those pieces together and remember which project each belonged to.</p>
          <p className="mt-4 leading-relaxed text-muted">A useful tracker gives you a daily starting point while the context is fresh. The goal is to make review easier and surface work you might otherwise forget to record.</p>
        </section>
        <section aria-labelledby="approaches">
          <h2 id="approaches" className="font-display text-2xl font-bold">Manual timers and activity-based reports</h2>
          <p className="mt-4 leading-relaxed text-muted">Choose based on how your team works. A timer can suit a focused block of work. Activity-based reporting can help when the day moves between several clients and communication tools.</p>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full text-left text-sm leading-relaxed">
              <caption className="sr-only">Two ways to assemble a billable timesheet</caption>
              <thead className="bg-marker-soft/50"><tr><th scope="col" className="p-4">Approach</th><th scope="col" className="p-4">Starting point</th><th scope="col" className="p-4">What to review</th></tr></thead>
              <tbody className="divide-y divide-line">
                <tr><th scope="row" className="p-4 font-semibold">Manual timer</th><td className="p-4 text-muted">You start and stop a clock for a task.</td><td className="p-4 text-muted">Missed starts, overlapping tasks, the project and whether the time is billable.</td></tr>
                <tr><th scope="row" className="p-4 font-semibold">Activity-based report</th><td className="p-4 text-muted">Existing email, calendar or phone records help reconstruct the day.</td><td className="p-4 text-muted">Source details, project assignment, actual duration and billing treatment.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
        <section aria-labelledby="sources">
          <h2 id="sources" className="font-display text-2xl font-bold">Which sources should a time tracker cover?</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 leading-relaxed text-muted">
            <li><strong className="text-ink">Email:</strong> client correspondence and follow-ups that are easy to overlook. A message count does not tell you how long the work took.</li>
            <li><strong className="text-ink">Calendar:</strong> scheduled meetings with useful project context. Check what actually happened, rather than billing the scheduled duration by default.</li>
            <li><strong className="text-ink">Calls and texts:</strong> phone conversations and small exchanges between other tasks. Confirm which devices, apps and permissions the workflow supports.</li>
          </ul>
          <p className="mt-4 leading-relaxed text-muted">Ask to see a real report from the tools you use. If you work in Outlook or Google Workspace, ask about that specific connection. Android and iPhone setups can provide different activity, so check the available sources for your device.</p>
        </section>
        <section aria-labelledby="review">
          <h2 id="review" className="font-display text-2xl font-bold">What should happen before time reaches QuickBooks Time?</h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 leading-relaxed text-muted">
            <li>Check the source activity and correct the project or client.</li>
            <li>Set the duration based on the work actually done, avoiding overlapping or duplicate entries.</li>
            <li>Apply the client’s billing rules and approve the entries you intend to record.</li>
            <li>Confirm how entries get into QuickBooks Time and how you check that the handoff succeeded.</li>
          </ol>
          <p className="mt-4 leading-relaxed text-muted">“QuickBooks integration” can mean a manual handoff, an export or a direct update. Ask which one is available today, what requires approval, and what happens if a submission fails. A report about activity is not automatic invoicing.</p>
        </section>
        <section aria-labelledby="permissions">
          <h2 id="permissions" className="font-display text-2xl font-bold">Questions to settle before connecting accounts</h2>
          <p className="mt-4 leading-relaxed text-muted">Agree which sources the workflow reads, what permissions it needs, whether information is sent to an AI service, who owns the accounts, and how long data is kept. Ask who can see reports and how access is removed. These details should be clear before onboarding.</p>
        </section>
        <section aria-labelledby="our-approach" className="rounded-xl border border-line bg-marker-soft/40 p-6 md:p-8">
          <h2 id="our-approach" className="font-display text-2xl font-bold">How J2J approaches billable-time reporting</h2>
          <p className="mt-4 leading-relaxed text-muted">Our working reporting workflow brings Outlook email and calendar activity into a nightly report for a person to review. Corrections happen by email, and QuickBooks Time entry is currently manual. <Link href="/j2j-time/" className="text-ink underline underline-offset-4">J2J Time</Link> builds on that work, with a dedicated review, approval and QuickBooks Time update flow planned.</p>
          <p className="mt-4 leading-relaxed text-muted">Read the <Link href="/case-studies/billable-time/" className="text-ink underline underline-offset-4">billable-time case study</Link> for the original workflow and the limits of its historical evaluation, or <Link href="/j2j-time/#early-access" className="text-ink underline underline-offset-4">join J2J Time early access</Link> to discuss your team’s setup.</p>
        </section>
      </div>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Article', '@id': `${url}#article`, headline: title, description, mainEntityOfPage: url, author: { '@id': 'https://j2j.info/#organization' }, publisher: { '@id': 'https://j2j.info/#organization' } },
        { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'J2J Connection', item: 'https://j2j.info/' }, { '@type': 'ListItem', position: 2, name: 'Automatic billable-time tracking', item: url }] },
      ],
    }).replace(/</g, '\\u003c') }} />
    <Footer />
  </>
}
