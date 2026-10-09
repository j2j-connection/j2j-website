import { bookingUrl, site } from '@/content/site'

export default function J2JTimeDemo() {
  return (
    <section id="j2j-time" aria-labelledby="j2j-time-title" className="mt-14 scroll-mt-24 rounded-xl border border-line bg-paper p-5 md:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">J2J Time · Product demo</p>
      <h3 id="j2j-time-title" className="mt-4 max-w-3xl font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
        Tracking billable time shouldn’t mean reconstructing your day.
      </h3>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted">
        Your work is scattered across emails, meetings, calls, and texts. J2J Time brings that activity into a daily report, so you can review your work and decide what to bill.
      </p>
      <figure className="mt-6">
        <video controls playsInline preload="none" width="1920" height="1080" poster="/media/j2j-time-v7-poster.jpg" aria-label="J2J Time product demonstration" aria-describedby="j2j-time-video-note" className="aspect-video w-full rounded-lg bg-ink">
          <source src="/media/j2j-time-v7.mp4" type="video/mp4" />
          <track kind="captions" src="/media/j2j-time-v7.vtt" srcLang="en" label="English" />
          <p><a href="/media/j2j-time-v7.mp4">Watch the J2J Time video</a>.</p>
        </video>
        <figcaption id="j2j-time-video-note" className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
          See the working daily report and our planned review, approval, and QuickBooks Time workflow. The planned screens use example data; current QuickBooks Time entry is manual.
        </figcaption>
      </figure>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a href={bookingUrl ?? site.mailto} data-event="j2j-time-demo-booking" data-placement="j2j-time" className="inline-flex min-h-11 items-center rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">Book a demo</a>
        <span className="text-sm text-muted">Tell us how your team tracks billable time.</span>
      </div>
    </section>
  )
}
