import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/case-studies/billable-time/', '/privacy/'].map(path => ({
    url: `https://j2j.info${path}`,
  }))
}
