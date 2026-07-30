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
    </footer>
  )
}
