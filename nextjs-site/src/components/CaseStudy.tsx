import Highlight from './Highlight'
import { CASE_STUDY_NAMED, caseStudyClient, testimonial } from '@/content/site'

const facts = [
  'Nightly AI reports, every workday',
  '95% accurate before anyone edits it',
  'Paid for itself in three weeks',
  'Built on the tools they already use',
  'Data never used to train AI models',
  'Nothing leaves their own accounts',
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
          Billable hours were slipping away <Highlight>in plain sight.</Highlight>
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_260px] md:gap-16">
          <div className="space-y-5 leading-relaxed text-muted">
            <p>
              {caseStudyClient.name} is {caseStudyClient.descriptor}. Like most
              professional-services firms, their revenue depends on people
              remembering exactly what they worked on, and for how long. And
              like most firms, hours were quietly going unrecorded every week.
            </p>
            <p>
              We built an AI system that reads the day’s calendars and email
              and drafts a nightly time report for every person on the team.
              Instead of
              reconstructing their week from memory, people review a draft that
              is already mostly right, and the hours that used to slip away get
              billed.
            </p>
            <p>
              And the data stays private. The system runs on accounts they
              own, the AI provider never trains on their information, and
              client details never leave their team. Their business stays
              their business.
            </p>
            <p className="text-ink">
              No new software to learn. No change to how anyone works. Just
              hours recovered, every single day.
            </p>
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
        <div className="mt-16">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            More work
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {moreWork.map((work) => (
              <div key={work.title} className="rounded-lg border border-line bg-paper p-6 md:p-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {work.eyebrow}
                </div>
                <h3 className="mt-3 font-display text-xl font-bold">{work.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{work.body}</p>
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
        </div>
      </div>
    </section>
  )
}
