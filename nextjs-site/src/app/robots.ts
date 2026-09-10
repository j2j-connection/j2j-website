import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

// Preserve public access, including search and user-directed AI retrieval.
// Training controls are separate policy choices, not an SEO prerequisite.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://j2j.info/sitemap.xml',
  }
}
