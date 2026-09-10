import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/case-studies/billable-time/', '/demos/', '/demos/budget/'].map(path => ({
    url: `https://j2j.info${path}`,
  }))
}
