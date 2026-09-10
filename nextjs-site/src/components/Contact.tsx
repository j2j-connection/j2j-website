import { site, bookingUrl } from '@/content/site'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Contact</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          Tell us where your projects get stuck.
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          Book a free introductory call, or send a few sentences about the workflow,
          report, handoff, or pile of project information that keeps costing
          your team time. We will tell you honestly whether AI can help.
        </p>
        {bookingUrl && (
          <a
            href={bookingUrl}
            data-placement="contact"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-full bg-ink px-7 py-3.5 font-medium text-paper transition-opacity hover:opacity-85"
          >
            Book a 30-minute call
          </a>
        )}
        <a
          href={site.mailto}
          className={`${bookingUrl ? 'mt-6' : 'mt-10'} block max-w-fit font-mono text-2xl font-medium underline decoration-marker decoration-4 underline-offset-8 transition-colors hover:decoration-ink md:text-4xl`}
        >
          {site.email}
        </a>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
          When you get in touch, let us know how you heard about J2J.
        </p>
      </div>
    </section>
  )
}
