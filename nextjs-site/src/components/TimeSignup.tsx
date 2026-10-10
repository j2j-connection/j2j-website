import Link from 'next/link'
import { timeProduct } from '@/content/j2j-time'
import { bookingUrl, site } from '@/content/site'

export default function TimeSignup() {
  return (
    <section id="early-access" aria-labelledby="early-access-title" className="scroll-mt-24 rounded-2xl border border-ink bg-marker-soft/60 p-6 md:p-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">J2J Time · Request access</p>
          <h2 id="early-access-title" className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">Start capturing the work behind your billable time.</h2>
          <p id="signup-note" className="mt-5 leading-relaxed text-muted">Leave your email and we’ll get in touch to see how J2J Time fits your team’s workflow.</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">No payment or account connection required. Prefer to talk it through? <a href={bookingUrl ?? site.mailto} data-placement="j2j-time-signup" className="text-ink underline underline-offset-4">Book a demo</a>.</p>
        </div>
        <form id="j2j-time-signup" name="J2J Time access request" data-j2j-signup="product" method="POST" action={timeProduct.signupAction} aria-describedby="signup-note" className="space-y-5">
          <div>
            <label htmlFor="time-email" className="block text-sm font-semibold">Email address</label>
            <input id="time-email" name="email" type="email" required autoComplete="email" maxLength={254} className="mt-2 min-h-12 w-full rounded-md border border-muted/40 bg-paper px-3 py-3 text-base" />
          </div>
          <div>
            <label htmlFor="time-company" className="block text-sm font-semibold">Company <span className="font-normal text-muted">(optional)</span></label>
            <input id="time-company" name="j2j_time_company" type="text" autoComplete="organization" maxLength={120} className="mt-2 min-h-12 w-full rounded-md border border-muted/40 bg-paper px-3 py-3 text-base" />
          </div>
          <input type="hidden" name="j2j_time_interest" value="early-access" />
          <input type="hidden" name="j2j_time_source" value="website-product-page" />
          <input type="hidden" name="j2j_time_utm_source" value="unknown" data-j2j-attribution="utm_source" />
          <input type="hidden" name="j2j_time_utm_medium" value="unknown" data-j2j-attribution="utm_medium" />
          <input type="hidden" name="j2j_time_utm_campaign" value="" data-j2j-attribution="utm_campaign" />
          <label htmlFor="time-consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
            <input id="time-consent" name="j2j_time_consent" type="checkbox" required value="product-updates-v1" className="mt-1 h-5 w-5 shrink-0 accent-ink" />
            <span>I’d like J2J to contact me about getting started with J2J Time and product updates. I can opt out at any time. <Link href="/privacy/" className="underline underline-offset-4">Privacy</Link>.</span>
          </label>
          <button type="submit" className="min-h-12 w-full rounded-md bg-ink px-5 py-3 font-semibold text-paper transition-opacity hover:opacity-85">Request access</button>
        </form>
      </div>
    </section>
  )
}
