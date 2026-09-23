/**
 * Serverless contact endpoint — POST /api/contact { name, email, message }.
 *
 * The Brevo API key must never reach the browser, which is why this function
 * exists at all: the form posts here, and only this code talks to Brevo.
 * Configure two environment variables in the Netlify UI:
 *
 *   BREVO_API_KEY   required — an API key from Brevo → SMTP & API
 *   CONTACT_EMAIL   optional — where enquiries land (defaults below); must be
 *                   a verified sender on the Brevo account, since it is also
 *                   used as the transactional sender address.
 */

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email'
const DEFAULT_INBOX = 'faizan.m.patel10@gmail.com'

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  let payload
  try {
    payload = await req.json()
  } catch {
    return json({ error: 'Invalid request body' }, 400)
  }

  // Honeypot: the visible form never fills `company`, bots usually do.
  // Answer success so the bot has nothing to learn from.
  if (payload.company) return json({ ok: true })

  const name = String(payload.name ?? '').trim().slice(0, 120)
  const email = String(payload.email ?? '').trim().slice(0, 200)
  const message = String(payload.message ?? '').trim().slice(0, 5000)

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Please fill in your name, a valid email and a message.' }, 400)
  }

  const apiKey = process.env.BREVO_API_KEY
  const inbox = process.env.CONTACT_EMAIL || DEFAULT_INBOX

  if (!apiKey) {
    console.error('BREVO_API_KEY is not set')
    return json({ error: 'The form is not configured yet — please email me directly.' }, 500)
  }

  const res = await fetch(BREVO_ENDPOINT, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Portfolio Contact', email: inbox },
      to: [{ email: inbox, name: 'Faizan Patel' }],
      replyTo: { email, name },
      subject: `Portfolio enquiry from ${name}`,
      htmlContent: `
        <p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
        <p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>
      `,
    }),
  })

  if (!res.ok) {
    console.error('Brevo refused the send:', res.status, await res.text())
    return json({ error: 'Could not send right now — please email me directly.' }, 502)
  }

  return json({ ok: true })
}

export const config = { path: '/api/contact' }
