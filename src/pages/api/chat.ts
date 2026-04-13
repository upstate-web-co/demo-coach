import type { APIContext } from 'astro'
import { SITE, SERVICES, TESTIMONIALS, FREE_RESOURCE } from '../../lib/config'

const SYSTEM_PROMPT = `You are the AI assistant for ${SITE.name}, an executive coaching practice run by Dr. Maya Chen.

IMPORTANT: This is a fictional demo business created by Upstate Web Co to showcase what a modern coaching website can do. If asked, clarify this is a portfolio demonstration — not a real coaching practice. All names, credentials, and details are fictional.

=== SERVICES & PRICING ===
${SERVICES.map(s => `- ${s.name}: ${s.price} (${s.duration}) — ${s.description}${s.popular ? ' [MOST POPULAR]' : ''}`).join('\n')}

=== ABOUT DR. MAYA CHEN ===
- 15 years in leadership development
- Former VP at a Fortune 500 company
- Professional Certified Coach (PCC) through ICF (International Coach Federation)
- Certified in stakeholder coaching methodology
- PhD in Organizational Psychology
- Based in Greenville, SC
- Sessions available via Zoom or in person
- Works with founders, directors, VPs, and C-suite leaders
- Specializes in: leadership transitions, executive presence, team dynamics, burnout recovery, decision-making under pressure, communication, and strategic thinking

=== HOW COACHING WORKS ===
1. Book a free 30-minute discovery call — no pitch, just a conversation about where you are and where you want to be.
2. If it's a fit, choose the right format together (1:1 sessions, 6-session package, VIP intensive, or team workshop).
3. Set goals and begin the work. Maya's approach is direct, supportive, and action-oriented.
4. Between sessions (for package clients): email support for real-time challenges.
5. Progress check-ins to measure growth against your initial goals.

=== FREE RESOURCE ===
"${FREE_RESOURCE.title}" — ${FREE_RESOURCE.description}
Available for download on the website. No email required.

=== WHO THIS IS FOR ===
- Leaders feeling stuck, burned out, or at a crossroads
- New executives stepping into bigger roles
- Founders navigating growth and team challenges
- Teams with communication or alignment issues
- Anyone who wants to lead better, not just manage more

=== WHAT CLIENTS SAY ===
${TESTIMONIALS.map(t => `"${t.quote}" — ${t.author}, ${t.role}`).join('\n')}

=== CONTACT & BOOKING ===
- Email: ${SITE.email}
- Phone: ${SITE.phone}
- Discovery call: Free, 30 minutes, book via the "Book a Call" button on the website
- Response time: Within 24 hours

=== WHAT YOU CAN DO ===
- Answer questions about services, pricing, Maya's background, and how coaching works.
- Help visitors understand which service format might be right for them.
- Explain what to expect from a discovery call or coaching engagement.
- Share information about the free downloadable resource.

=== WHAT YOU CANNOT DO ===
- Provide coaching, therapy, or personal advice.
- Diagnose leadership challenges or give specific recommendations.
- Book or schedule appointments directly.
- Share other clients' information or make guarantees about outcomes.
- Process payments or accept deposits.

TONE: Be warm, professional, and encouraging. Keep answers to 2-3 sentences. For specific questions about fit or personalized guidance, direct to the free discovery call.`

export async function POST({ request, locals }: APIContext) {
  try {
    const { message, history = [] } = await request.json() as { message?: string; history?: Array<{ role: string; content: string }> }
    if (!message) return Response.json({ reply: 'What would you like to know? I can help with coaching services, pricing, how it works, or Maya\'s background.' })
    const env = (locals as Record<string, any>).runtime?.env
    const apiKey = env?.ANTHROPIC_API_KEY
    if (!apiKey) {
      const lower = message.toLowerCase()
      if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('how much') || lower.includes('afford') || lower.includes('invest'))
        return Response.json({ reply: `Individual sessions are $200/session (60 min). The 6-Session Package is $1,050 — that's six sessions over 3 months with email support between sessions, saving you $150. Team workshops start at $2,500 for a half or full day. The VIP Intensive is $1,500 for a full day of deep work. Every engagement starts with a free discovery call.` })
      if (lower.includes('package') || lower.includes('6 session') || lower.includes('six session') || lower.includes('popular') || lower.includes('recommend'))
        return Response.json({ reply: `The 6-Session Package ($1,050) is our most popular option — six 60-minute sessions over 3 months with email support between sessions. It gives you enough time to build momentum and see real change. You save $150 compared to individual sessions.` })
      if (lower.includes('intensive') || lower.includes('vip') || lower.includes('full day') || lower.includes('crossroads'))
        return Response.json({ reply: `The VIP Intensive is $1,500 for a full day together — assessment, deep coaching, action plan, and a 30-day follow-up. It's designed for leaders at a crossroads who want clarity fast. Some clients use it as a jumpstart before committing to ongoing sessions.` })
      if (lower.includes('team') || lower.includes('workshop') || lower.includes('group') || lower.includes('company'))
        return Response.json({ reply: `Team workshops start at $2,500 for a half or full day — available on-site or virtual. Topics include communication, conflict resolution, and strategic alignment. Great for leadership teams going through change or wanting to level up together.` })
      if (lower.includes('how') && (lower.includes('work') || lower.includes('start') || lower.includes('begin')) || lower.includes('process') || lower.includes('what to expect') || lower.includes('first step'))
        return Response.json({ reply: `It starts with a free 30-minute discovery call — no pitch, just a conversation about where you are and where you want to be. If it's a fit, you choose the right format (1:1, package, or intensive) and get started. Maya's approach is direct, supportive, and action-oriented.` })
      if (lower.includes('book') || lower.includes('call') || lower.includes('schedule') || lower.includes('discovery') || lower.includes('appointment'))
        return Response.json({ reply: `You can book a free 30-minute discovery call anytime — click the "Book a Call" button on the website. It's just a conversation, no commitment needed. Maya typically responds within 24 hours.` })
      if (lower.includes('who') || lower.includes('maya') || lower.includes('background') || lower.includes('qualif') || lower.includes('credential') || lower.includes('experience') || lower.includes('certified'))
        return Response.json({ reply: `Dr. Maya Chen has 15 years in leadership development — former VP at a Fortune 500, ICF Professional Certified Coach (PCC), PhD in Organizational Psychology, and certified in stakeholder coaching methodology. She works with founders, directors, and C-suite leaders via Zoom or in person in Greenville, SC.` })
      if (lower.includes('zoom') || lower.includes('virtual') || lower.includes('online') || lower.includes('remote') || lower.includes('in person') || lower.includes('location'))
        return Response.json({ reply: `Sessions are available via Zoom or in person in Greenville, SC — whatever works best for you. Most clients choose Zoom for flexibility. The experience is equally effective either way.` })
      if (lower.includes('burnout') || lower.includes('stuck') || lower.includes('overwhelm') || lower.includes('quit') || lower.includes('stress'))
        return Response.json({ reply: `Many of Maya's clients come in feeling burned out or stuck — you're not alone in that. Coaching helps you see patterns, reconnect with what matters, and lead from a place of clarity instead of survival. A free discovery call is a great first step to see if this is the right fit.` })
      if (lower.includes('free') || lower.includes('resource') || lower.includes('download') || lower.includes('guide') || lower.includes('question'))
        return Response.json({ reply: `Maya offers a free downloadable guide: "${FREE_RESOURCE.title}" — ${FREE_RESOURCE.description} No email required, just download it from the website.` })
      if (lower.includes('result') || lower.includes('outcome') || lower.includes('testimonial') || lower.includes('review') || lower.includes('success'))
        return Response.json({ reply: `Clients describe real shifts — from burned-out to re-energized, from reactive to strategic, from avoiding hard conversations to leading them. One client said: "Maya helped me see patterns I'd been blind to for years. Three months in, my team actually wants to be in meetings again."` })
      if (lower.includes('demo') || lower.includes('real') || lower.includes('fake') || lower.includes('portfolio') || lower.includes('upstate'))
        return Response.json({ reply: `Great question! This is a fictional demo business created by Upstate Web Co to showcase what a modern coaching website can do. The services, credentials, and details are illustrative — but the website technology is very real!` })
      if (lower.includes('differ') || lower.includes('therapy') || lower.includes('counseling') || lower.includes('vs'))
        return Response.json({ reply: `Coaching is forward-focused — it's about where you're going, not diagnosing what's wrong. Maya works with high-functioning leaders who want to level up their effectiveness. If deeper mental health support is needed, she can recommend great therapists in the area.` })
      return Response.json({ reply: `I can help with questions about coaching services, pricing, how it works, Maya's background, or who coaching is right for. The best next step is always the free 30-minute discovery call — no commitment required.` })
    }
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 256, system: SYSTEM_PROMPT, messages: [...history.slice(-20).map(h => ({ role: h.role as 'user' | 'assistant', content: h.content })), { role: 'user' as const, content: message }] }),
    })
    const data = await response.json() as { content?: { text: string }[] }
    return Response.json({ reply: data.content?.[0]?.text || 'I\'m not sure about that — book a free discovery call and ask Maya directly!' })
  } catch { return Response.json({ reply: 'Something went wrong. Email ' + SITE.email }) }
}
