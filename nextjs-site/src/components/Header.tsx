'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { site } from '@/content/site'

const navLinks = [
  { href: '/#services', label: 'What we do' },
  { href: '/#work', label: 'Our work' },
  { href: '/#about', label: 'Who we are' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="relative h-10 w-10">
              <Image src="/J2J_logo.svg" alt="J2J logo" fill className="object-contain" />
            </div>
            <div>
              <div className="font-display text-lg font-bold leading-tight">J2J Connection</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                AI Consulting
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.mailto}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
            >
              Email us
            </a>
          </nav>

          <button
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`h-0.5 w-6 bg-ink transition-all ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-6 bg-ink transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-6 bg-ink transition-all ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>

        <div
          id="mobile-menu"
          inert={!isMenuOpen || undefined}
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isMenuOpen ? 'max-h-80 pb-6' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col gap-1 border-t border-line pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 font-medium text-muted transition-colors hover:text-ink"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.mailto}
              className="mt-3 rounded-full bg-ink px-5 py-3 text-center font-medium text-paper"
              onClick={() => setIsMenuOpen(false)}
            >
              Email us
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
