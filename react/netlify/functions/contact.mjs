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

/**
 * Branded notification email — dark card with the portfolio's gold accent,
 * all styles inline because email clients strip <style> blocks.
 */
const buildEmail = ({ name, email, service, message }) => {
  const gold = '#ecc094'
  const label = `font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#8a8a8a;padding:0 0 6px;`
  const value = `font-size:16px;color:#ffffff;padding:0 0 22px;`

  return `
  <div style="margin:0;padding:40px 16px;background-color:#0d0d0d;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background-color:#161616;border:1px solid #2a2a2a;border-radius:12px;">
      <tr>
        <td style="padding:26px 32px;border-bottom:2px solid ${gold};">
          <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${gold};">New enquiry</div>
          <div style="font-size:22px;font-weight:bold;color:#ffffff;padding-top:8px;">Faizan Patel — Portfolio</div>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 32px 6px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="${label}">From</td></tr>
            <tr><td style="${value}">${escapeHtml(name)}</td></tr>
            <tr><td style="${label}">Email</td></tr>
            <tr><td style="${value}"><a href="mailto:${escapeHtml(email)}" style="color:${gold};text-decoration:none;">${escapeHtml(email)}</a></td></tr>
            ${
              service
                ? `<tr><td style="${label}">Looking for</td></tr>
                   <tr><td style="padding:0 0 22px;"><span style="display:inline-block;padding:6px 14px;border:1px solid ${gold};border-radius:999px;color:${gold};font-size:13px;letter-spacing:1px;">${escapeHtml(service)}</span></td></tr>`
                : ''
            }
            <tr><td style="${label}">Message</td></tr>
            <tr>
              <td style="padding:16px 18px;background-color:#1e1e1e;border-left:3px solid ${gold};border-radius:0 8px 8px 0;color:#e6e6e6;font-size:15px;line-height:1.6;">
                ${escapeHtml(message).replaceAll('\n', '<br>')}
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:22px 32px 26px;">
          <a href="mailto:${escapeHtml(email)}" style="display:inline-block;padding:12px 26px;background-color:${gold};color:#111111;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;text-decoration:none;border-radius:6px;">Reply to ${escapeHtml(name.split(' ')[0])}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px;border-top:1px solid #2a2a2a;color:#7a7a7a;font-size:12px;">
          Sent from the contact form at <a href="https://faziansportfolio.netlify.app" style="color:#9a9a9a;">faziansportfolio.netlify.app</a> — replying goes straight to the sender.
        </td>
      </tr>
    </table>
  </div>`
}

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
  const service = String(payload.service ?? '').trim().slice(0, 100)

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
      subject: service
        ? `Portfolio enquiry from ${name} — ${service}`
        : `Portfolio enquiry from ${name}`,
      htmlContent: buildEmail({ name, email, service, message }),
    }),
  })

  if (!res.ok) {
    console.error('Brevo refused the send:', res.status, await res.text())
    return json({ error: 'Could not send right now — please email me directly.' }, 502)
  }

  return json({ ok: true })
}

export const config = { path: '/api/contact' }
