import Highlight from './Highlight'
import { caseStudyClient, testimonial } from '@/content/site'

const facts = [
  'Nightly AI reports, every workday',
  'Covers the whole team’s billable time',
  'Built on the tools they already use',
  'Data never used to train AI models',
  'Nothing leaves their own accounts',
  'In production today',
]

export default function CaseStudy() {
  return (
    <section id="work" className="scroll-mt-20 border-t border-line bg-marker-soft/40 px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          Case study · {caseStudyClient.name}
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
              We built an AI system that reads each day’s work and drafts a
              nightly time report for every person on the team. Instead of
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
      </div>
    </section>
  )
}
