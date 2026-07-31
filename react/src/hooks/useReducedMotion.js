import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const subscribe = (callback) => {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

/**
 * The CSS-level reduced-motion guard in index.css only neutralises CSS
 * animations and transitions. Framer Motion drives opacity and transforms
 * from JS, so components that animate need to opt out explicitly.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false // SSR / prerender default
  )
}
