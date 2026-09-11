import Highlight from './Highlight'
import Image from 'next/image'
import { site, bookingUrl, CASE_STUDY_NAMED, caseStudyClient } from '@/content/site'

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
        <a href="/case-studies/billable-time/" data-event="case-study-open-hero" className="mt-7 inline-block py-2 font-medium underline decoration-marker decoration-2 underline-offset-4">
          {CASE_STUDY_NAMED ? `See what we built for ${caseStudyClient.name}` : 'See our billable-time case study'} ↗
        </a>
        <div className="mt-10">
          <a href="https://openai.com/business/partners/" aria-label="OpenAI Select Partner - about the OpenAI Partner Network" className="inline-block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-ink">
            <Image src="/partners/openai-select-partner.svg" alt="OpenAI Select Partner" width={375} height={177} className="h-auto w-[188px] max-w-full" />
          </a>
        </div>
      </div>
    </section>
  )
}
