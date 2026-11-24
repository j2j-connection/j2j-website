import type { CSSProperties } from 'react'

// The same five things the services section promises, shown as a finished
// checklist. Keep the wording in step with Services.tsx.
const setup = [
  { item: 'ChatGPT or Claude workspace', status: 'Set up' },
  { item: 'Email, calendar, and files', status: 'Connected' },
  { item: 'Access levels by role', status: 'Assigned' },
  { item: 'Plain-language guardrails', status: 'Agreed' },
  { item: 'Training for every seat', status: 'Done' },
]

export default function SetupSheet({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-2xl bg-marker" />
      <div className="relative rounded-2xl border border-ink/10 bg-paper p-6 shadow-[0_1px_0_rgba(28,26,20,0.06),0_24px_48px_-24px_rgba(28,26,20,0.35)]">
        <div className="flex items-center justify-between gap-4">
          <p id="setup-sheet-title" className="font-display text-lg font-bold leading-tight">
            Your firm’s AI setup
          </p>
          <span className="shrink-0 rounded-full bg-marker px-2.5 py-1 font-mono text-[11px] font-medium uppercase leading-none tracking-wide">
            Done for you
          </span>
        </div>
        <ul aria-labelledby="setup-sheet-title" className="mt-5">
          {setup.map((row, index) => (
            <li
              key={row.item}
              style={{ '--i': index } as CSSProperties}
              className="flex items-center gap-3 border-t border-line py-3.5"
            >
              <span aria-hidden className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line">
                <span className="setup-check absolute -inset-px flex items-center justify-center rounded-full bg-ink">
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="var(--color-marker)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 6.5 5 9l4.5-5.5" />
                  </svg>
                </span>
              </span>
              <span className="flex-1 text-sm font-medium">{row.item}</span>
              <span className="setup-status font-mono text-xs text-muted">{row.status}</span>
            </li>
          ))}
        </ul>
        <p className="border-t border-line pt-4 text-sm leading-relaxed text-muted">
          Then we stay until it works.
        </p>
      </div>
    </div>
  )
}
