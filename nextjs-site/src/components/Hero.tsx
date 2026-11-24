import Highlight from './Highlight'
import SetupSheet from './SetupSheet'
import Image from 'next/image'
import { site, bookingUrl, CASE_STUDY_NAMED, caseStudyClient } from '@/content/site'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 lg:px-8">
      <div aria-hidden className="drafting-grid pointer-events-none absolute inset-0 -z-10 hidden lg:block" />
      <div className="mx-auto max-w-5xl py-20 md:py-28 lg:py-32">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:gap-10">
          <div>
            <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:text-6xl xl:text-7xl">
              You run the firm.
              <br />
              We <Highlight>set up the AI.</Highlight>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              J2J helps owners of architecture, design, construction, and real
              estate firms put ChatGPT and Claude to work, without becoming
              their own IT department. We set it up, connect the information
              your team already has, train everyone, and stay until it works.
            </p>
          </div>
          <SetupSheet className="hidden lg:block" />
        </div>
        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_188px] lg:items-end lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-4">
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
            <a href="/case-studies/billable-time/" data-event="case-study-open-hero" className="mt-7 inline-block py-2 font-medium underline decoration-marker decoration-2 underline-offset-4">
              {CASE_STUDY_NAMED ? `See what we built for ${caseStudyClient.name}` : 'See our billable-time case study'} ↗
            </a>
          </div>
          <a href="https://openai.com/business/partners/" aria-label="OpenAI Select Partner - about the OpenAI Partner Network" className="block w-fit rounded-lg focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-ink">
            <Image src="/partners/openai-select-partner.svg" alt="OpenAI Select Partner" width={375} height={177} className="h-auto w-[188px] max-w-full" />
          </a>
        </div>
      </div>
    </section>
  )
}
