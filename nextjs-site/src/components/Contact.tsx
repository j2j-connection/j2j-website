import { site, bookingUrl } from '@/content/site'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-20 md:py-28">
        <div className="rounded-3xl bg-marker px-6 py-10 md:px-12 md:py-14 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/70">Contact</p>
            <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-bold tracking-tight md:text-5xl md:leading-[1.05]">
              Tell us where your projects get stuck.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-ink/80">
              Book a free introductory call, or send a few sentences about the workflow,
              report, handoff, or pile of project information that keeps costing
              your team time. We will tell you honestly whether AI can help.
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            {bookingUrl && (
              <a
                href={bookingUrl}
                data-placement="contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-ink px-7 py-3.5 font-medium text-paper transition-opacity hover:opacity-85"
              >
                Book a 30-minute call
              </a>
            )}
            <a
              href={site.mailto}
              className={`${bookingUrl ? 'mt-6' : ''} block max-w-fit font-mono text-2xl font-medium underline decoration-ink/30 decoration-2 underline-offset-8 transition-colors hover:decoration-ink md:text-3xl`}
            >
              {site.email}
            </a>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/70">
              When you get in touch, let us know how you heard about J2J.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
