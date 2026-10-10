import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Highlight from '@/components/Highlight'
import TimeSignup from '@/components/TimeSignup'
import { timeProduct, timeQuestions, timeTranscript } from '@/content/j2j-time'
import { caseStudyClient, CASE_STUDY_NAMED } from '@/content/site'

export const metadata: Metadata = {
  title: timeProduct.title,
  description: timeProduct.description,
  alternates: { canonical: timeProduct.url },
  openGraph: { title: timeProduct.title, description: timeProduct.description, url: timeProduct.url, type: 'website', siteName: 'J2J Connection', images: [{ url: 'https://j2j.info/media/j2j-time-v7-poster.jpg', width: 1920, height: 1080, alt: 'J2J Time product demo: tracking billable time without reconstructing your day.' }] },
  twitter: { card: 'summary_large_image', title: timeProduct.title, description: timeProduct.description, images: ['https://j2j.info/media/j2j-time-v7-poster.jpg'] },
}

const workflow = [
  { number: '01', title: 'Bring the day together', text: 'Email, meetings, calls and texts are easy to lose between projects. Gather the activity behind your work into a daily report.' },
  { number: '02', title: 'Review it by project', text: 'Receive the report by email. Check the source details and reply with corrections while the work is still fresh.' },
  { number: '03', title: 'Decide what to bill', text: 'You set the duration and billing treatment. Use the reviewed report as a starting point for your timesheet.' },
]

export default function TimePage() {
  return (
    <>
      <article>
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 md:pb-24 md:pt-24 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">J2J Time · Early access</p>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">An AI time tracker for <Highlight>billable work.</Highlight></h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">Your work lives across emails, meetings, calls and texts. J2J Time brings that activity into a daily report by project, so you can review your day and decide what to bill.</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">Built by J2J Connection for consultants and project teams who bill clients for their time.</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#early-access" data-event="j2j-time-signup-cta-product" className="inline-flex min-h-12 items-center rounded-md bg-ink px-6 py-3 font-semibold text-paper hover:opacity-85">Join early access</a>
            <a href="#demo" data-event="j2j-time-demo-cta-product" className="inline-flex min-h-11 items-center py-2 font-medium underline underline-offset-4">Watch the 50-second demo ↓</a>
          </div>
          <p className="mt-5 text-sm text-muted">A daily report to review. You stay in charge of billing.</p>
        </section>

        <section id="demo" aria-labelledby="demo-title" className="border-y border-line bg-marker-soft/35">
          <div className="mx-auto max-w-5xl px-6 py-14 md:py-20 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">See the workflow</p>
                <h2 id="demo-title" className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">From scattered work to a daily report.</h2>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">50 seconds · Sound on</span>
            </div>
            <figure className="mt-8">
              <video data-j2j-video="product" controls playsInline preload="none" width="1920" height="1080" poster="/media/j2j-time-v7-poster.jpg" aria-label="J2J Time product demonstration" aria-describedby="time-video-note" className="aspect-video w-full rounded-xl border border-line bg-ink">
                <source src="/media/j2j-time-v7.mp4" type="video/mp4" />
                <track kind="captions" src="/media/j2j-time-v7.vtt" srcLang="en" label="English" />
                <p><a href="/media/j2j-time-v7.mp4">Watch the J2J Time video</a>.</p>
              </video>
              <figcaption id="time-video-note" className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">The film shows the working daily report and our planned review, approval and QuickBooks Time workflow. Planned screens use example data; current QuickBooks Time entry is manual.</figcaption>
            </figure>
            <details className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
              <summary className="cursor-pointer py-2 font-medium text-ink underline underline-offset-4">Video transcript</summary>
              <div className="mt-3 space-y-3">
                <p><strong className="text-ink">Context:</strong> The editing, approval and direct QuickBooks Time updates described in the film are planned.</p>
                {timeTranscript.map(text => <p key={text}>{text}</p>)}
              </div>
            </details>
          </div>
        </section>

        <section aria-labelledby="workflow-title" className="mx-auto max-w-5xl px-6 py-16 md:py-24 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">How J2J Time works</p>
          <h2 id="workflow-title" className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight md:text-4xl">A starting point for your timesheet.</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {workflow.map(step => <li key={step.number} className="border-t-2 border-ink pt-5">
              <span className="font-mono text-sm text-muted">{step.number}</span>
              <h3 className="mt-3 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
            </li>)}
          </ol>
          <div className="mt-12 grid gap-8 rounded-xl border border-line p-6 md:grid-cols-2 md:p-8">
            <div>
              <h3 className="font-display text-xl font-bold">Works with the day you already have.</h3>
              <p className="mt-4 leading-relaxed text-muted">The working reporting setup uses Outlook email and calendars. We support Android and iPhone for phone activity. Using Google Workspace or another mail platform? Tell us about your setup so we can confirm fit before onboarding.</p>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">Next: review, approve, update QuickBooks Time.</h3>
              <p className="mt-4 leading-relaxed text-muted">We’re building a dedicated flow to edit entries, approve them and update QuickBooks Time. Today, review happens in the report email and QuickBooks Time entry is manual.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="proof-title" className="border-y border-line bg-marker-soft/35">
          <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 md:grid-cols-[1fr_240px] lg:px-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Built from real client work</p>
              <h2 id="proof-title" className="mt-4 font-display text-3xl font-bold tracking-tight">The reporting workflow behind J2J Time.</h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-muted">J2J built nightly calendar and email reports for {CASE_STUDY_NAMED ? caseStudyClient.name : 'a construction consultancy'}. The team receives activity organized by client, checks the details and decides what belongs on the timesheet.</p>
              <Link href="/case-studies/billable-time/" className="mt-6 inline-block min-h-11 py-2 font-medium underline underline-offset-4">Read the billable-time case study →</Link>
            </div>
            <aside className="self-start border-t-2 border-ink pt-5 text-sm leading-relaxed">
              <p className="font-semibold">Built for client project work</p>
              <p className="mt-3 text-muted">Consultants, owner’s representatives, construction and real estate teams, and other professionals with billable work spread across the day.</p>
            </aside>
          </div>
        </section>

        <section aria-labelledby="questions-title" className="mx-auto max-w-5xl px-6 py-16 md:py-24 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Questions, answered</p>
          <h2 id="questions-title" className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">Choosing a time tracker for your team.</h2>
          <dl className="mt-10 grid gap-x-10 md:grid-cols-2">
            {timeQuestions.map(item => <div key={item.question} className="border-t border-line py-6">
              <dt className="font-display text-lg font-bold">{item.question}</dt>
              <dd className="mt-3 leading-relaxed text-muted">{item.answer}</dd>
            </div>)}
          </dl>
          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <Link href="/guides/automatic-billable-time-tracking/" className="min-h-11 py-2 underline underline-offset-4">Guide: automatic billable-time tracking →</Link>
            <Link href="/apps/phone-activity/privacy/" className="min-h-11 py-2 underline underline-offset-4">Phone app privacy and permissions →</Link>
          </div>
        </section>
        <div className="mx-auto max-w-5xl px-6 pb-16 md:pb-24 lg:px-8"><TimeSignup /></div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'WebPage', '@id': `${timeProduct.url}#page`, url: timeProduct.url, name: timeProduct.title, description: timeProduct.description, isPartOf: { '@id': 'https://j2j.info/#website' }, mainEntity: { '@id': `${timeProduct.url}#software` }, video: { '@id': `${timeProduct.url}#video` } },
          { '@type': 'SoftwareApplication', '@id': `${timeProduct.url}#software`, name: timeProduct.name, url: timeProduct.url, applicationCategory: 'BusinessApplication', description: timeQuestions[0].answer, publisher: { '@id': 'https://j2j.info/#organization' } },
          { '@type': 'VideoObject', '@id': `${timeProduct.url}#video`, name: 'J2J Time: from everyday work to approved time', description: 'See the working daily activity report and planned editing, approval and QuickBooks Time updates. Current QuickBooks Time entry is manual.', thumbnailUrl: ['https://j2j.info/media/j2j-time-v7-poster.jpg'], contentUrl: 'https://j2j.info/media/j2j-time-v7.mp4', uploadDate: '2026-10-09T23:35:22Z', duration: 'PT50S', transcript: timeTranscript.join('\n'), publisher: { '@id': 'https://j2j.info/#organization' } },
          { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'J2J Connection', item: 'https://j2j.info/' }, { '@type': 'ListItem', position: 2, name: 'J2J Time', item: timeProduct.url }] },
        ],
      }).replace(/</g, '\\u003c') }} />
      <Footer />
    </>
  )
}
