const steps = [
  {
    number: '1',
    title: 'The first call is free',
    body: 'Tell us where a project or process keeps losing time. If AI is not the answer, we say so on that call.',
  },
  {
    number: '2',
    title: 'We scope a fixed-price project',
    body: 'Implementation has a fixed scope and price agreed before work starts. If we need deeper investigation first, we offer a clearly priced discovery session with a defined outcome.',
  },
  {
    number: '3',
    title: 'We build it with your team',
    body: 'The people closest to the work see results early and often, on a timeline agreed up front - no long silences and no big reveal at the end.',
  },
  {
    number: '4',
    title: 'We agree how to support it',
    body: 'We test the agreed deliverable with your team before handoff. Ongoing monitoring, improvements, and support are scoped and priced separately.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-line px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">How it works</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          Clear scope. Agreed price.
        </h2>
        <div className="mt-12 max-w-2xl">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex gap-6 border-b border-line py-6 first:border-t"
            >
              <div className="font-mono text-sm text-muted">{step.number}</div>
              <div>
                <h3 className="font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl leading-relaxed text-muted">
          Not ready for a build? Standalone advisory work is available at an agreed rate.
          Your first 30-minute call is free.
        </p>
      </div>
    </section>
  )
}
