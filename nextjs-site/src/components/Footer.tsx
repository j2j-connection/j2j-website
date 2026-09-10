import Image from 'next/image'
import { site } from '@/content/site'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <Image src="/J2J_logo.svg" alt="J2J logo" fill className="object-contain" />
          </div>
          <span className="text-sm text-muted">© {new Date().getFullYear()} {site.company}</span>
        </div>
        <a
          href={site.mailto}
          className="font-mono text-sm text-muted transition-colors hover:text-ink"
        >
          {site.email}
        </a>
      </div>
      <details className="mx-auto max-w-5xl px-6 pb-8 text-sm leading-relaxed text-muted lg:px-8">
        <summary className="cursor-pointer py-2">Site measurement</summary>
        <p className="mt-2 max-w-2xl">We use GoatCounter for aggregate page visits and link clicks. Referral source and campaign labels are kept in this browser tab’s session storage and passed to Calendly when you follow a booking link. We do not send your name, email, or full referral URL to our website analytics. A booking-link click is not counted as a scheduled call.</p>
      </details>
    </footer>
  )
}
