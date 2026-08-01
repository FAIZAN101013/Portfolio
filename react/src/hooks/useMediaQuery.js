import { useCallback, useSyncExternalStore } from 'react'

/**
 * Generic media-query subscription. Same shape as useReducedMotion, which
 * predates it and stays as its own hook because it is used everywhere.
 *
 * `getServerSnapshot` returns false, so the first prerendered frame always
 * assumes "query does not match". Every caller here is written so that false
 * is the safe default (desktop layout, hover available).
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (callback) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', callback)
      return () => mq.removeEventListener('change', callback)
    },
    [query]
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}

/**
 * True on touch-first devices — phones and tablets, where :hover either never
 * fires or sticks after a tap.
 *
 * Anything revealed only on hover is invisible on these devices, so components
 * use this to render the resting state open instead. Defaults to false so a
 * pointer device never flashes the touch layout on first paint.
 */
export function useIsTouch() {
  return useMediaQuery('(hover: none)')
}
