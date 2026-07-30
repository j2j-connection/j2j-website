const services = [
  {
    step: '1',
    title: 'Find the opportunity',
    body: 'We sit with your team and learn how the work actually flows. Then we pinpoint where AI saves real hours - in plain language, not a 40-slide deck.',
  },
  {
    step: '2',
    title: 'Build the system',
    body: 'We build custom tools that plug into the software you already run. No new app for your team to learn, no rip-and-replace.',
  },
  {
    step: '3',
    title: 'Run it with you',
    body: 'We do not hand over a binder and disappear. We watch the system in production, tune it, and improve it as your business changes.',
  },
]

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-line px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">What we do</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          Full AI consulting, start to finish.
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {services.map((service) => (
            <div key={service.step} className="border-t-2 border-ink pt-6">
              <div className="font-mono text-sm text-muted">Step {service.step}</div>
              <h3 className="mt-2 font-display text-xl font-bold">{service.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{service.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
