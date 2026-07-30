// Single source for permission-gated and contact content.
// CASE_STUDY_NAMED: flip to false to anonymize the client across the whole site.
export const CASE_STUDY_NAMED: boolean = false

export const site = {
  email: 'team@j2j.info',
  mailto: 'mailto:team@j2j.info',
  company: 'J2J Connection LLC',
}

export const caseStudyClient = CASE_STUDY_NAMED
  ? {
      name: 'LC3',
      descriptor: 'an owner’s-representation firm for construction projects',
    }
  : {
      name: 'Our client',
      descriptor: 'a construction owner’s-representation firm',
    }

// Set to the exact approved quote, e.g.
// { quote: '...', attribution: 'CEO of client' } - otherwise keep null
// and the testimonial block will not render.
export const testimonial: { quote: string; attribution: string } | null = null

// Booking link. When set, "Book a 30-minute call" becomes the primary CTA
// in the hero and contact sections; set to null to fall back to email-only.
export const bookingUrl: string | null = 'https://calendly.com/tom-j2j/30min'

// GoatCounter site code (the NAME part of NAME.goatcounter.com). When set,
// the privacy-friendly analytics script loads - no cookies, no banner needed.
export const goatCounterCode: string | null = 'j2j'

// "AI in the Built Environment" talk, May 21 2026. Host name follows the
// same permission gate as the case study.
export const summit = {
  title: 'AI in the Built Environment',
  detail: CASE_STUDY_NAMED
    ? 'A talk on practical AI for construction teams, hosted by LC3 in New York, May 2026.'
    : 'A talk on practical AI for construction teams, presented at a client-hosted summit in New York, May 2026.',
}
