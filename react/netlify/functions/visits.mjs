import { getStore } from '@netlify/blobs'

/**
 * Visit counter on Netlify Blobs (free, no external service).
 *
 *   POST /api/visits           counts one visit (the site calls this once per
 *                              session) and returns nothing useful
 *   GET  /api/visits?key=…     returns totals; needs VISITS_KEY so only the
 *                              owner can read them
 *
 * Counts page views per day plus an all-time total. No cookies, no IPs, no
 * user agents stored: a visit is a visit.
 */
export default async (req) => {
  const store = getStore('visits')
  const url = new URL(req.url)

  if (req.method === 'POST') {
    const day = new Date().toISOString().slice(0, 10)
    const path = (await req.json().catch(() => ({}))).path || '/'
    const total = Number(await store.get('total')) || 0
    await store.set('total', String(total + 1))
    const dayKey = `day:${day}`
    const dayCount = Number(await store.get(dayKey)) || 0
    await store.set(dayKey, String(dayCount + 1))
    const pathKey = `path:${path.slice(0, 80)}`
    const pathCount = Number(await store.get(pathKey)) || 0
    await store.set(pathKey, String(pathCount + 1))
    return new Response(null, { status: 204 })
  }

  if (req.method === 'GET') {
    if (!process.env.VISITS_KEY || url.searchParams.get('key') !== process.env.VISITS_KEY) {
      return new Response('Not found', { status: 404 })
    }
    const { blobs } = await store.list()
    const out = { total: 0, days: {}, paths: {} }
    for (const { key } of blobs) {
      const n = Number(await store.get(key)) || 0
      if (key === 'total') out.total = n
      else if (key.startsWith('day:')) out.days[key.slice(4)] = n
      else if (key.startsWith('path:')) out.paths[key.slice(5)] = n
    }
    return Response.json(out, { headers: { 'Cache-Control': 'no-store' } })
  }

  return new Response('Method not allowed', { status: 405 })
}

export const config = { path: '/api/visits' }
