import Highlight from './Highlight'
import { site, bookingUrl } from '@/content/site'

export default function Hero() {
  return (
    <section className="px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-24 md:py-36">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          Practical AI for real businesses
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          AI that <Highlight>earns its keep.</Highlight>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          J2J is a two-brother consultancy. Everyone says AI will change your
          business - nobody says how. We come in, show you what it can
          actually do, and stay until it works.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {bookingUrl ? (
            <>
              <a
                href={bookingUrl}
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
      </div>
    </section>
  )
}
