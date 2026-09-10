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
        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_260px] md:gap-16">
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
          </div>
        </div>
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
        <div className="mt-14 border-t border-line pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Try a project workflow</p>
          <h3 className="mt-3 font-display text-2xl font-bold">What is your budget trying to tell you?</h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">Explore a sample consultant budget, spot an overrun, and draft the follow-up. The figures are fictional and the responses are prepared, so you can try it without uploading a file.</p>
          <a href="/demos/budget/" data-event="demo-open-work" className="mt-4 inline-block py-2 font-medium underline decoration-marker decoration-2 underline-offset-4">Try the budget demo ↗</a>
        </div>
        <details className="mt-12 border-t border-line pt-6">
          <summary className="cursor-pointer py-2 font-medium">More work, beyond the built environment</summary>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {moreWork.map((work) => (
              <div key={work.title} className="rounded-lg border border-line bg-paper p-6 md:p-8">
                <div className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                  {work.eyebrow}
                </div>
                <h3 className="mt-3 font-display text-xl font-bold">{work.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{work.body}</p>
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
