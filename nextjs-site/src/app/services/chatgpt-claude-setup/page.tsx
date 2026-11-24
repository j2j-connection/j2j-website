import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { bookingUrl, site } from '@/content/site'

const title = 'ChatGPT and Claude setup for built environment firms | J2J Connection'
const description = 'J2J sets up ChatGPT Business or Claude for owners of architecture, design, construction and real estate firms: workspace configuration, email, calendar and files connected, access levels by role, plain-language guardrails, and training for every seat. Done for you, from Santa Monica, California.'
const url = 'https://j2j.info/services/chatgpt-claude-setup/'
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, type: 'article', siteName: 'J2J Connection', images: [] },
  twitter: { card: 'summary', title, description, images: [] },
}

const included = [
  {
    title: 'The right platform, chosen with you',
    body: 'ChatGPT Business and Claude are both strong, and the right pick depends on the tools your firm already runs and how your team works. We set up both, so the recommendation on the first call is about your firm, not about what we happen to sell.',
  },
  {
    title: 'Workspace and seats',
    body: 'We create the business workspace, set up seats for the whole team, and make sure the right people are admins. Nobody needs a personal account for work again.',
  },
  {
    title: 'Your tools, connected',
    body: 'We connect the tools your team already uses: Outlook or Google email and calendar, and SharePoint, OneDrive or Google Drive files, so the assistant can work with your real project information.',
  },
  {
    title: 'Access levels by role',
    body: 'We set who can see what before anyone starts, in the shape of a project team: principals, project managers, accounting, outside collaborators. Sensitive material stays restricted: payroll, for example, can stay visible to owners only.',
  },
  {
    title: 'Guardrails in plain language',
    body: 'We agree simple rules with you: what belongs in the workspace, what never goes in, and how client material is handled. Client homes, client budgets, and fee information get named rules, written for your team, and everyone hears the same version.',
  },
  {
    title: 'Training that respects billable time',
    body: 'A group session covers the basics and the rules, then short one-to-one sessions work on each person’s real tasks: a proposal, a set of meeting notes, a pile of invoices. Sessions are short and recorded, because an hour of training is an hour nobody billed.',
  },
]

const questions = [
  {
    question: 'ChatGPT or Claude: which should our firm use?',
    answer: 'Either can be the right answer. It depends on which email and file systems you run, what your team has already tried, and the kind of work you want help with first. We implement both, and the first call ends with a recommendation and the reasons for it.',
  },
  {
    question: 'How long does a setup take?',
    answer: 'Most setups are scoped in weeks, not months. The first call ends with a fixed scope, a fixed price, and a timeline we agree with you. Training is scheduled around your project work, not dropped into the busiest week.',
  },
  {
    question: 'What does it cost?',
    answer: 'Every engagement is a fixed price agreed in writing before work starts, the same way your own clients buy from you. The price depends on how many seats you need, which tools we connect, and how much training your team wants. There is no hourly billing, and the first 30-minute call is free.',
  },
  {
    question: 'Is our client information safe?',
    answer: 'On the business plans we set up, your workspace data is not used to train the provider’s models. On top of that, we set access levels by role and plain-language guardrails, so client material is only visible to the people who should see it, and your team knows what never goes in. Your clients hire you for discretion; the setup is built to match.',
  },
  {
    question: 'Can you connect our email and files?',
    answer: 'Yes. We connect Microsoft 365 or Google Workspace email and calendar, plus SharePoint, OneDrive or Google Drive, and we check each connection with your team before handoff. Permissions follow the access levels we set together.',
  },
  {
    question: 'Who is this for?',
    answer: 'Owners of architecture, design, construction, and real estate firms, usually 5 to 50 people, who want their team using AI and do not have the time, or the interest, to implement it themselves. We are based in Santa Monica, California, and work with firms across the United States.',
  },
  {
    question: 'What happens after the setup?',
    answer: 'You get a named admin on your team who can run the workspace day to day, the recorded training, and the written guardrails. Ongoing support, monitoring, and improvements are available and are scoped and priced separately, only if you want them.',
  },
]

export default function ChatGPTClaudeSetup() {
  return <>
    <article className="mx-auto max-w-[68rem] px-6 py-16 md:py-24 lg:px-8">
      <Link href="/" className="inline-block min-h-11 py-2 text-sm text-muted underline underline-offset-4">← J2J Connection</Link>
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted">Service · By J2J Connection, Santa Monica</p>
      <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">ChatGPT or Claude, set up properly for your whole team.</h1>
      <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">Most firms start the same way: a few people try AI on personal accounts, client material follows, and there are no shared rules and no control over who can see what. You do not have time to fix that yourself, and you should not have to. We replace it with one business workspace, set up properly, connected to your tools, with access levels by role and training for every seat.</p>

      <div className="mt-12 max-w-3xl space-y-12">
        <section aria-labelledby="included-title">
          <h2 id="included-title" className="font-display text-2xl font-bold">What a setup includes</h2>
          <div className="mt-6 space-y-8">
            {included.map((item) => (
              <div key={item.title} className="border-t-2 border-ink pt-5">
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="how-title">
          <h2 id="how-title" className="font-display text-2xl font-bold">How it works</h2>
          <p className="mt-4 leading-relaxed text-muted">The first call is free, and it is a working session, not a pitch: we look at how your team uses AI now and sketch what a proper setup looks like for your firm. If AI is not the answer, we say so on that call. Then we agree a fixed scope and price in writing, do the setup with your team, and hand over a workspace your own admin can run.</p>
          <p className="mt-4 leading-relaxed text-muted">This is the setup we run for our own clients, including a nine-person design studio in San Francisco. Read about our wider <Link href="/" className="text-ink underline underline-offset-4">AI consulting for built environment firms</Link>, or see the <Link href="/case-studies/billable-time/" className="text-ink underline underline-offset-4">billable-time case study</Link> for how we work.</p>
        </section>
      </div>

      <section aria-labelledby="questions-title" className="mt-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Questions, answered</p>
        <h2 id="questions-title" className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">Before you book a setup.</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {questions.map(item => <details key={item.question} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-lg font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span aria-hidden="true" className="shrink-0 text-2xl font-normal transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
            </summary>
            <p className="max-w-3xl pb-6 pr-8 leading-relaxed text-muted">{item.answer}</p>
          </details>)}
        </div>
      </section>

      <section aria-labelledby="start-title" className="mt-16 max-w-3xl rounded-xl border border-line bg-marker-soft/40 p-6 md:p-8">
        <h2 id="start-title" className="font-display text-2xl font-bold">Start with a free 30-minute call.</h2>
        <p className="mt-4 leading-relaxed text-muted">Tell us where your team’s AI use feels messy or risky. We will tell you honestly whether a proper setup can help, and what it would take.</p>
        <p className="mt-5 flex flex-wrap gap-5 text-sm">
          {bookingUrl && <a href={bookingUrl} className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-2.5 font-medium text-paper transition-opacity hover:opacity-85">Book a 30-minute call</a>}
          <a href={site.mailto} className="inline-flex min-h-11 items-center font-mono underline underline-offset-4">{site.email}</a>
        </p>
      </section>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Service', '@id': `${url}#service`, name: 'ChatGPT and Claude setup', description, url, provider: { '@id': 'https://j2j.info/#organization' }, serviceType: 'AI implementation consulting', areaServed: ['Santa Monica', 'Los Angeles', 'San Francisco', 'New York'] },
        { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'J2J Connection', item: 'https://j2j.info/' }, { '@type': 'ListItem', position: 2, name: 'ChatGPT and Claude setup', item: url }] },
      ],
    }).replace(/</g, '\\u003c') }} />
    <Footer />
  </>
}
