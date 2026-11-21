import { getStore } from '@netlify/blobs'

const THEMES = ['dark', 'cream', 'teal', 'chantilly', 'walnut', 'bondi', 'blend', 'blend-light', 'blend-deep', 'blend-green']
const DEFAULT = 'blend-light'

/**
 * Site-wide theme, stored on Netlify Blobs so it can change without a deploy.
 *
 *   GET /api/theme            → { theme }  (public, cached for a minute)
 *   PUT /api/theme?key=…      body { theme } sets it; needs VISITS_KEY
 */
export default async (req) => {
  const store = getStore('settings')
  const url = new URL(req.url)

  if (req.method === 'GET') {
    const theme = (await store.get('theme')) || DEFAULT
    return Response.json({ theme }, { headers: { 'Cache-Control': 'public, max-age=60' } })
  }

  if (req.method === 'PUT') {
    if (!process.env.VISITS_KEY || url.searchParams.get('key') !== process.env.VISITS_KEY) {
      return new Response('Not found', { status: 404 })
    }
    const { theme } = await req.json().catch(() => ({}))
    if (!THEMES.includes(theme)) return new Response('Bad theme', { status: 400 })
    await store.set('theme', theme)
    return Response.json({ theme })
  }

  return new Response('Method not allowed', { status: 405 })
}

export const config = { path: '/api/theme' }
