export const SITE = {
  name: 'Clarity Coaching',
  tagline: 'Executive coaching for leaders who want to lead better',
  url: 'https://claritycoaching.co',
  email: 'maya@claritycoaching.co',
  phone: '(864) 555-3941',
  address: 'Greenville, SC',
  postalAddress: {
    streetAddress: '',
    addressLocality: 'Greenville',
    addressRegion: 'SC',
    postalCode: '',
    addressCountry: 'US',
  },
  geo: { latitude: '34.8526', longitude: '-82.4030' },
  openingHours: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
    { dayOfWeek: ['Saturday', 'Sunday'], opens: '00:00', closes: '00:00' },
  ],
  sameAs: [] as string[],
  priceRange: '$$$',
  paymentAccepted: ['Credit Card'] as string[],
  currenciesAccepted: 'USD',
  bookingUrl: 'https://cal.com/claritycoaching/discovery',
  indexable: false,
} as const

export const SERVICES = [
  { name: '1:1 Executive Coaching', price: '$200/session', duration: '60 min', description: 'Deep-dive sessions on leadership challenges, decision-making, and personal growth. Bi-weekly recommended.', popular: false },
  { name: '6-Session Package', price: '$1,050', duration: '60 min x 6', description: 'Commit to transformation. Six sessions over 3 months with email support between sessions. Save $150.', popular: true },
  { name: 'Team Workshop', price: 'From $2,500', duration: 'Half or full day', description: 'On-site or virtual workshop for your leadership team. Communication, conflict resolution, strategic alignment.', popular: false },
  { name: 'VIP Intensive', price: '$1,500', duration: 'Full day', description: 'A full day together — assessment, deep coaching, action plan, 30-day follow-up. For leaders at a crossroads.', popular: false },
]

export const TESTIMONIALS = [
  { quote: 'Maya helped me see patterns I\'d been blind to for years. Three months in, my team actually wants to be in meetings again.', author: 'James T.', role: 'VP of Operations, Tech Startup' },
  { quote: 'I came to Maya burned out and ready to quit. She didn\'t tell me what to do — she helped me figure out what I actually wanted. I\'m still in my role, but I lead differently now.', author: 'Sarah K.', role: 'Director of Engineering' },
  { quote: 'The VIP Intensive was the best investment I\'ve made in myself as a leader. I left with a clear plan and the confidence to execute it.', author: 'Marcus W.', role: 'Founder & CEO' },
]

export const FREE_RESOURCE = {
  title: '5 Questions Every Leader Should Ask Themselves This Quarter',
  description: 'A free guide with the exact self-assessment framework I use with my executive clients. Takes 15 minutes. Changes how you see your next 90 days.',
}