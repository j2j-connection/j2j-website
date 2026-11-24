import Link from 'next/link'

const columns = [
  {
    title: 'Client material',
    body: 'Photos of client homes, site details, and project documents stay inside the workspace, visible only to the people on that project. Nothing client-related sits in a personal account again.',
  },
  {
    title: 'Money',
    body: 'Budgets, fee letters, and firm financials are limited to the people who already see them today. Payroll can stay visible to owners only. The AI follows the same rules your filing cabinet does.',
  },
  {
    title: 'Access by role',
    body: 'Principals, project managers, accounting, and outside collaborators each get the access their role needs, set before the first training session, not cleaned up after something leaks.',
  },
]

export default function Guardrails() {
  return (
    <section aria-labelledby="guardrails-title" className="bg-ink px-6 text-paper lg:px-8">
      <div className="mx-auto max-w-5xl py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-paper/60">Guardrails</p>
        <h2 id="guardrails-title" className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          Your clients trust you with their homes and their budgets. Your AI should work the same way.
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {columns.map((column) => (
            <div key={column.title} className="border-t-2 border-marker pt-5">
              <h3 className="font-display text-lg font-bold">{column.title}</h3>
              <p className="mt-2 leading-relaxed text-paper/70">{column.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-2xl leading-relaxed text-paper/70">
          Guardrails are part of every{' '}
          <Link href="/services/chatgpt-claude-setup/" className="text-paper underline decoration-marker decoration-2 underline-offset-4">
            ChatGPT and Claude setup
          </Link>
          , written in plain language your whole team can follow.
        </p>
      </div>
    </section>
  )
}
