import Highlight from './Highlight'
import { site, bookingUrl } from '@/content/site'

export default function Hero() {
  return (
    <section className="px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-24 md:py-36">
        <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          AI that <Highlight>earns its keep.</Highlight>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          J2J helps teams across the built environment put AI to work on the
          real friction in projects. We connect the information your team
          already has, automate repetitive work, and stay until it works.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {bookingUrl ? (
            <>
              <a
                href={bookingUrl}
                data-placement="hero"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ink px-7 py-3.5 font-medium text-paper transition-opacity hover:opacity-85"
              >
                Book a 30-minute call
              </a>
              <a
                href={site.mailto}
                className="rounded-full border border-line px-7 py-3.5 font-medium transition-colors hover:border-ink"
              >
                Email {site.email}
              </a>
            </>
          ) : (
            <>
              <a
                href={site.mailto}
                className="rounded-full bg-ink px-7 py-3.5 font-medium text-paper transition-opacity hover:opacity-85"
              >
                Email {site.email}
              </a>
              <a
                href="#work"
                className="rounded-full border border-line px-7 py-3.5 font-medium transition-colors hover:border-ink"
              >
                See the work
              </a>
            </>
          )}
        </div>
        <a href="/demos/budget/" data-event="demo-open-hero" className="mt-7 inline-block py-2 font-medium underline decoration-marker decoration-2 underline-offset-4">
          Try the project-budget demo ↗
        </a>
      </div>
    </section>
  )
}
