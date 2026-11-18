import { useEffect, useState } from 'react'
import { useSeo } from '../lib/seo'

/**
 * Owner-only visit stats at /stats?key=… The key is checked by the function,
 * not here; without it the page just shows "not found". Not linked anywhere
 * and marked noindex.
 */
export function Stats() {
  useSeo({ title: 'Stats', noindex: true })
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get('key') || ''
    fetch(`/api/visits?key=${encodeURIComponent(key)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Not found'))))
      .then(setData)
      .catch((e) => setError(e.message))
  }, [])

  const days = data ? Object.entries(data.days).sort((a, b) => (a[0] < b[0] ? 1 : -1)).slice(0, 30) : []
  const paths = data ? Object.entries(data.paths).sort((a, b) => b[1] - a[1]).slice(0, 20) : []
  const last7 = days.slice(0, 7).reduce((s, [, n]) => s + n, 0)

  return (
    <main className="row flex-1 pb-(--vspace-3) pt-[calc(var(--header-height)+var(--vspace-2))]">
      <div className="column col-12">
        <h1 className="text-h1 mt-0">Visits</h1>
        {error && <p className="text-content">{error}</p>}
        {data && (
          <>
            <dl className="m-0 grid grid-cols-3 gap-6 border-y border-hairline py-(--vspace-0_75) max-xs:grid-cols-1">
              {[
                ['All time', data.total],
                ['Last 7 days', last7],
                ['Today', data.days[new Date().toISOString().slice(0, 10)] || 0],
              ].map(([label, n]) => (
                <div key={label}>
                  <dt className="text-(length:--text-xs) uppercase tracking-[0.18em] text-accent">{label}</dt>
                  <dd className="m-0 mt-1 font-display text-(length:--text-xxl) text-white">{n}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-(--vspace-1_5) grid grid-cols-2 gap-x-(--vspace-2) gap-y-(--vspace-1) max-lg:grid-cols-1">
              <section>
                <h2 className="text-pretitle">Last 30 days</h2>
                <ul className="m-0 mt-3 list-none divide-y divide-white/10 p-0">
                  {days.map(([d, n]) => (
                    <li key={d} className="flex justify-between py-2 text-(length:--text-sm)">
                      <span className="text-content">{d}</span>
                      <span className="text-white">{n}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-pretitle">Top pages</h2>
                <ul className="m-0 mt-3 list-none divide-y divide-white/10 p-0">
                  {paths.map(([p, n]) => (
                    <li key={p} className="flex justify-between gap-4 py-2 text-(length:--text-sm)">
                      <span className="truncate text-content">{p}</span>
                      <span className="shrink-0 text-white">{n}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
