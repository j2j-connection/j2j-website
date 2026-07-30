const steps = [
  {
    number: '1',
    title: 'The first call is free',
    body: 'Tell us what’s eating your time. If AI is not the answer, we say so on that call.',
  },
  {
    number: '2',
    title: 'We scope a fixed-price project',
    body: 'You know the cost and the deliverable before we start. No hourly meter, no surprise invoices.',
  },
  {
    number: '3',
    title: 'We build it in weeks',
    body: 'Most projects ship in three to four weeks, working inside the tools you already use.',
  },
  {
    number: '4',
    title: 'We stay until it works',
    body: 'Live systems get watched, tuned, and improved as your business changes.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-line px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">How it works</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          Fixed price. Weeks, not quarters.
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
      </div>
    </section>
  )
}
