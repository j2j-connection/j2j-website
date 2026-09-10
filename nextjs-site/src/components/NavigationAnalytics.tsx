'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function NavigationAnalytics() {
  const pathname = usePathname()
  useEffect(() => { document.dispatchEvent(new Event('j2j-pageview')) }, [pathname])
  return null
}
