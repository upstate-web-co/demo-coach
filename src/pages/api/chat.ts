import type { APIContext } from 'astro'
import { SITE, SERVICES } from '../../lib/config'

const SYSTEM_PROMPT = `You are the AI assistant for ${SITE.name}, an executive coaching practice run by Dr. Maya Chen.

SERVICES:
${SERVICES.map(s => `- ${s.name}: ${s.price} (${s.duration}) — ${s.description}`).join('\n')}

ABOUT MAYA: 15 years in leadership development. Former VP at Fortune 500. ICF PCC certified, Marshall Goldsmith certified, PhD Organizational Psychology. Based in Greenville, SC. Sessions via Zoom or in person.

FREE RESOURCE: "5 Questions Every Leader Should Ask Themselves This Quarter" — downloadable guide.

BOOKING: Free 30-minute discovery call at ${SITE.bookingUrl}. No pitch, just a conversation.

RULES: Be warm, professional, and encouraging. 2-3 sentences max. Don't diagnose or give therapy-level advice. For specific questions about fit, direct to the discovery call.`

export async function POST({ request, locals }: APIContext) {
  try {
    const body = await request.json()
    const message = body.message || ''
    const history: Array<{role: string; content: string}> = body.history || []
    if (!message) return Response.json({ reply: 'What would you like to know about coaching?' })
    const env = (locals as Record<string, any>).runtime?.env
    const apiKey = env?.ANTHROPIC_API_KEY
    if (!apiKey) {
      const lower = message.toLowerCase()
      if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('how much')) return Response.json({ reply: `Individual sessions are $200/session. The 6-session package is $1,050 (save $150). Team workshops start at $2,500. VIP Intensives are $1,500 for a full day. Every engagement starts with a free discovery call.` })
      if (lower.includes('how') || lower.includes('work') || lower.includes('process') || lower.includes('what is')) return Response.json({ reply: `It starts with a free 30-minute discovery call — no pitch, just a conversation about where you are and where you want to be. If it's a fit, we choose the right format (1:1, package, or intensive) and get started.` })
      if (lower.includes('book') || lower.includes('call') || lower.includes('schedule')) return Response.json({ reply: `You can book a free 30-minute discovery call anytime. Click the "Book a Call" button — Maya's calendar is right there. No commitment needed.` })
      if (lower.includes('who') || lower.includes('maya') || lower.includes('background')) return Response.json({ reply: `Maya has 15 years in leadership development — former VP at a Fortune 500, ICF PCC certified, PhD in Organizational Psychology. She works with founders, directors, and C-suite leaders.` })
      return Response.json({ reply: `I can help with questions about coaching services, pricing, how it works, or Maya's background. The best next step is a free discovery call — it's 30 minutes with no commitment.` })
    }
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001', max_tokens: 300, system: SYSTEM_PROMPT,
        messages: [...history.slice(-18).map((h: {role: string; content: string}) => ({ role: h.role, content: h.content })), { role: 'user', content: message }],
      }),
    })
    const data = await response.json() as { content?: { text: string }[] }
    return Response.json({ reply: data.content?.[0]?.text || 'I\'m not sure — book a discovery call and ask Maya directly!' })
  } catch { return Response.json({ reply: 'Something went wrong. Email ' + SITE.email }) }
}
