import type { Metadata } from 'next'
import Link from 'next/link'
import { caseStudyClient, CASE_STUDY_NAMED, bookingUrl, site } from '@/content/site'
import Footer from '@/components/Footer'
import Highlight from '@/components/Highlight'

const title = CASE_STUDY_NAMED
  ? 'LC Three: AI-assisted billable-time reporting | J2J Connection'
  : 'AI-assisted billable-time reporting | J2J Connection'
const description = 'How J2J built nightly draft time reports from calendar and email activity for a construction consultancy, with human review before billing.'
const url = 'https://j2j.info/case-studies/billable-time/'

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'article', siteName: 'J2J Connection', images: [] },
  twitter: { card: 'summary', title, description, images: [] },
}

export default function BillableTimeCaseStudy() {
  return (
    <>
      <article className="mx-auto max-w-5xl px-6 py-16 md:py-24 lg:px-8">
        <Link href="/#work" className="inline-block py-2 text-sm text-muted underline underline-offset-4">← Back to our work</Link>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">Case study{CASE_STUDY_NAMED ? ` · ${caseStudyClient.name}` : ''}</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">Billable work shouldn’t depend on <Highlight>memory.</Highlight></h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{caseStudyClient.name} is {caseStudyClient.descriptor}. J2J built an AI-assisted reporting system that turns calendar and email activity into draft time entries for the team to review.</p>

        <div className="mt-14 grid gap-12 md:grid-cols-[1fr_250px]">
          <div className="space-y-10">
            <section aria-labelledby="problem">
              <h2 id="problem" className="font-display text-2xl font-bold">The problem: work scattered across the day</h2>
              <p className="mt-4 leading-relaxed text-muted">A call, a meeting, a few client emails, then the next project. When it was time to complete timesheets, people had to reconstruct those fragments from memory. Small pieces of billable work were easy to overlook.</p>
              <p className="mt-4 leading-relaxed text-muted">The useful information already existed in Outlook calendars and email. The missing step was bringing it together into something a person could check.</p>
            </section>
            <section aria-labelledby="approach">
              <h2 id="approach" className="font-display text-2xl font-bold">What J2J built</h2>
              <ol className="mt-5 list-decimal space-y-4 pl-5 leading-relaxed text-muted">
                <li><strong className="text-ink">Gather the day’s activity.</strong> Read calendar and email signals from the tools the team already uses.</li>
                <li><strong className="text-ink">Suggest the relevant client.</strong> Use AI to classify activity and assemble draft time entries.</li>
                <li><strong className="text-ink">Deliver a nightly report.</strong> Give each person a starting point instead of a blank timesheet.</li>
                <li><strong className="text-ink">Keep the person in charge.</strong> Review and correct the suggestions before using them for billing.</li>
              </ol>
            </section>
            <section aria-labelledby="result">
              <h2 id="result" className="font-display text-2xl font-bold">What the evaluation showed</h2>
              <div className="mt-5 border-l-4 border-marker bg-marker-soft/40 p-6">
                <p className="font-display text-4xl font-bold">599 of 627</p>
                <p className="mt-2 leading-relaxed">Billable events matched recorded entries in QuickBooks Time in the project evaluation, approximately 95.5%.</p>
              </div>
              <p className="mt-4 leading-relaxed text-muted">That measures classification agreement in one evaluation sample. It is not a measure of time-estimate accuracy, recovered revenue, or a guarantee for future reports. People still need to review the output.</p>
              <p className="mt-4 leading-relaxed text-muted">The practical change is a draft to check rather than a week to reconstruct. Calendar and email activity can surface work someone might otherwise forget to record.</p>
            </section>
            <section aria-labelledby="boundaries">
              <h2 id="boundaries" className="font-display text-2xl font-bold">What stays a human decision</h2>
              <p className="mt-4 leading-relaxed text-muted">An email is evidence of activity, not proof of how long the work took or whether it is billable. The team decides the correct client, duration, and billing treatment. This is assistance with reporting, not automatic invoicing.</p>
              <p className="mt-4 leading-relaxed text-muted">For a similar project, we scope access permissions, the information sent to AI services, retention, and account ownership before connecting client systems. Using an AI service is different from keeping all processing inside an email account.</p>
            </section>
          </div>
          <aside className="self-start border-t-2 border-ink pt-5">
            <h2 className="font-mono text-xs uppercase tracking-[0.15em]">At a glance</h2>
            <dl className="mt-5 space-y-6 text-sm leading-relaxed">
              <div><dt className="text-muted">Industry</dt><dd className="mt-1">Construction consulting</dd></div>
              <div><dt className="text-muted">Inputs</dt><dd className="mt-1">Outlook calendar and email</dd></div>
              <div><dt className="text-muted">Output</dt><dd className="mt-1">Nightly draft time reports</dd></div>
              <div><dt className="text-muted">Review</dt><dd className="mt-1">People check entries before billing</dd></div>
            </dl>
          </aside>
        </div>
        <section className="mt-16 border-t border-line pt-10" aria-labelledby="next-step">
          <h2 id="next-step" className="font-display text-2xl font-bold">Where does useful work go unrecorded?</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">Start with a free 30-minute conversation about your workflow. If there is a fit, we agree a scope and price before implementation. Any deeper discovery or ongoing support is priced separately.</p>
          <div className="mt-6 flex flex-wrap gap-5">
            <a href={bookingUrl || site.mailto} data-placement="billable-time-case-study" className="inline-block rounded-full bg-ink px-6 py-3 font-medium text-paper">{bookingUrl ? 'Book a 30-minute call' : 'Email us'}</a>
          </div>
        </section>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article', headline: title,
        description, mainEntityOfPage: url,
        author: { '@id': 'https://j2j.info/#organization' },
        publisher: { '@id': 'https://j2j.info/#organization' },
      }).replace(/</g, '\\u003c') }} />
      <Footer />
    </>
  )
}
