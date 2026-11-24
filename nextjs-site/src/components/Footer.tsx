import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/content/site'

const nav = [
  { label: 'What we do', href: '/#services' },
  { label: 'Our work', href: '/#work' },
  { label: 'How it works', href: '/#how' },
  { label: 'Who we are', href: '/#about' },
  { label: 'ChatGPT and Claude setup', href: '/services/chatgpt-claude-setup/' },
  { label: 'J2J Time', href: '/j2j-time/' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 pt-14 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              J2J Connection
            </div>
            <p className="mt-3 max-w-md leading-relaxed text-muted">
              AI consulting for the built environment. Santa Monica,
              California, working with firms across the United States.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <Image src="/J2J_logo.svg" alt="J2J logo" fill className="object-contain" />
          </div>
          <span className="text-sm text-muted">© {new Date().getFullYear()} {site.company}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/privacy/" className="inline-flex min-h-11 items-center transition-colors hover:text-ink">Privacy</Link>
          <a href={site.mailto} className="inline-flex min-h-11 items-center font-mono transition-colors hover:text-ink">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
