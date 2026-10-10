import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/j2j-time/', '/guides/automatic-billable-time-tracking/', '/case-studies/billable-time/', '/privacy/'].map(path => ({
    url: `https://j2j.info${path}`,
  }))
}
