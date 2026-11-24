import Link from 'next/link'

const services = [
  {
    step: '1',
    title: 'Find the friction',
    body: 'We sit with project teams to learn where information gets buried, reports repeat, and handoffs slow down. Then we pinpoint where AI can save real hours.',
  },
  {
    step: '2',
    title: 'Build around your tools',
    body: 'We connect the email, documents, spreadsheets, and project platforms your team already uses. Start with what is useful, without replacing everything at once.',
  },
  {
    step: '3',
    title: 'Put it to work',
    body: 'We test with the people doing the work, check the results against the agreed scope, and plan the handoff and support your team needs.',
  },
]

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-line px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">What we do</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          AI set up for your firm, done for you.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          You did not start a firm to become an AI expert, and your team
          does not have spare hours to figure it out between projects. Your
          team is probably already trying AI on personal accounts. We bring
          it into one proper workspace, with rules your clients would
          approve of, and we handle every step.
        </p>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {services.map((service) => (
            <div key={service.step} className="border-t-2 border-ink pt-6">
              <div className="font-mono text-sm text-muted">Step {service.step}</div>
              <h3 className="mt-2 font-display text-xl font-bold">{service.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{service.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-14 max-w-2xl leading-relaxed text-muted">
          Most engagements start with the platform itself. We{' '}
          <Link href="/services/chatgpt-claude-setup/" className="text-ink underline underline-offset-4">
            set up ChatGPT or Claude for your team
          </Link>
          , with your tools connected, access levels by role, plain-language
          guardrails, and training for every seat, from our base in Santa
          Monica, California.
        </p>
      </div>
    </section>
  )
}
