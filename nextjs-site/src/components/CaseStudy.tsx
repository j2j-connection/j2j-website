import J2JTimeDemo from './J2JTimeDemo'
import Highlight from './Highlight'
import { CASE_STUDY_NAMED, caseStudyClient, testimonial } from '@/content/site'

const facts = [
  'Nightly AI reports, every workday',
  'Draft time entries for human review',
  'Calendar and email activity together',
  'Built on the tools they already use',
]

const moreWork = [
  {
    eyebrow: 'Interior design · AI setup',
    title: 'A design studio’s AI, out of personal accounts and into one workspace.',
    body: 'A nine-person interior design studio in San Francisco had client material spread across personal ChatGPT accounts, with no shared rules and no control over who could see what. We set up a ChatGPT Business workspace for the studio, connected email, calendar, and files with access levels by role, agreed plain-language guardrails, and trained the whole team.',
    facts: ['9-person studio team', 'ChatGPT Business workspace', 'Access levels by role', 'Training for the whole team'],
  },
  {
    eyebrow: 'Private equity · Exit planning',
    title: 'Who gets what when the company sells?',
    body: 'A venture-backed company was heading into an exit with four series of preferred stock, accrued dividends, and more than 80 shareholders - and no way to answer the one question every investor asks: what do I take home at each price? We built an interactive model that reads the cap table, applies the legal waterfall from the company charter, and lets any investor test any exit scenario in seconds.',
    facts: ['80+ investors modeled', '$25M+ of capital covered', 'In use during a live exit'],
  },
  {
    eyebrow: 'Food & beverage · Data',
    title: 'Two million sales records, finally in one place.',
    body: 'A bakery business had years of sales history trapped in fourteen incompatible register exports, with product costs living in separate spreadsheets. Margin questions took hours of manual work, so mostly they went unanswered. We built a pipeline that unifies everything into one clean dataset and rebuilds it from scratch in under a minute - and it immediately surfaced a year of quiet cost creep the owners could not see before.',
    facts: ['2.1M records unified', '99% of products cost-matched', 'Full rebuild in under 60 seconds'],
  },
]

export default function CaseStudy() {
  return (
    <section id="work" className="scroll-mt-20 border-t border-line bg-marker-soft/40 px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          Case study{CASE_STUDY_NAMED && <> · {caseStudyClient.name}</>}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          A construction consultancy was losing billable hours{' '}
          <Highlight>in plain sight.</Highlight>
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_300px] md:gap-16 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5 leading-relaxed text-muted">
            <p>
              {caseStudyClient.name} is {caseStudyClient.descriptor}. A typical
              day moves across calls, meetings, email, and client work. Their
              revenue depends on people remembering exactly what they worked on
              and for how long, but hours were quietly going unrecorded every
              week.
            </p>
            <p>
              We built an AI system that reads the day’s calendars and email and
              drafts a nightly time report for the team. Instead of reconstructing
              their week from memory, people review suggested entries, correct
              them, and decide what belongs on their timesheet.
            </p>
            <p>
              The goal is to surface billable work that would otherwise be
              missed, without treating an AI suggestion as a finished billing
              record. Human review stays part of the process.
            </p>
            <p className="text-ink">
              The work starts with the tools the team already uses, not another
              system they have to remember to fill in.
            </p>
            <a href="/case-studies/billable-time/" data-event="case-study-open" className="inline-block py-2 font-medium text-ink underline decoration-marker decoration-2 underline-offset-4">
              Read the full case study ↗
            </a>
          </div>
          <div>
            <div className="border-t-2 border-ink pt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              The system
            </div>
            <ul className="mt-4 space-y-3">
              {facts.map((fact) => (
                <li key={fact} className="text-sm leading-relaxed">
                  {fact}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-line bg-paper p-5 shadow-[0_1px_0_rgba(28,26,20,0.06),0_12px_32px_-16px_rgba(28,26,20,0.25)]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Nightly draft</span>
                <span className="rounded-full bg-marker px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide">For review</span>
              </div>
              <div className="mt-4">
                {[
                  { time: '9:00–9:45', label: 'Site call', source: 'from calendar', hours: '0.75 h' },
                  { time: '10:15–11:00', label: 'Proposal follow-up', source: 'from email', hours: '0.75 h' },
                  { time: '1:30–2:30', label: 'Client meeting', source: 'from calendar', hours: '1.0 h' },
                ].map((row) => (
                  <div key={row.time} className="flex items-baseline justify-between gap-3 border-t border-line py-3 first:border-t-0 first:pt-0 last:pb-0">
                    <div>
                      <div className="font-mono text-xs text-muted">{row.time}</div>
                      <div className="mt-0.5 text-sm font-medium">{row.label}</div>
                      <div className="text-xs text-muted">{row.source}</div>
                    </div>
                    <div className="font-mono text-sm">{row.hours}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                In the historical check, 599 of 627 events matched their
                QuickBooks Time entries. People review the draft and decide
                what bills.
              </p>
            </div>
          </div>
        </div>
        <J2JTimeDemo />
        {testimonial && (
          <blockquote className="mt-14 max-w-2xl border-l-2 border-ink pl-6">
            <p className="font-display text-xl font-bold leading-snug">
              “{testimonial.quote}”
            </p>
            <cite className="mt-3 block font-mono text-sm not-italic text-muted">
              {testimonial.attribution}
            </cite>
          </blockquote>
        )}
        <details className="group mt-12 border-y border-ink/15">
          <summary className="disclosure flex min-h-11 cursor-pointer items-center justify-between gap-6 py-5 font-display text-lg font-bold">
            More work, beyond the built environment
            <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-paper transition-transform duration-200 group-open:rotate-45">
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M6 1.5v9M1.5 6h9" />
              </svg>
            </span>
          </summary>
          <div className="grid gap-6 pb-8 pt-2 md:grid-cols-2 lg:grid-cols-3">
            {moreWork.map((work) => (
              <div key={work.title} className="flex flex-col rounded-lg border border-line bg-paper p-6 md:p-8">
                <div className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                  {work.eyebrow}
                </div>
                <h3 className="mt-3 font-display text-xl font-bold">{work.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{work.body}</p>
                <ul className="mt-5 space-y-1.5 border-t border-line pt-4">
                  {work.facts.map((fact) => (
                    <li key={fact} className="font-mono text-xs">
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  )
}
