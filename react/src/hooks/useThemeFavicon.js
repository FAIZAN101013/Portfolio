import { useEffect } from 'react'

export function useThemeFavicon() {
  useEffect(() => {
    const root = document.documentElement
    const icon = document.getElementById('theme-favicon')
    if (!icon) return

    const fallbackUrl = icon.href
    const controller = new AbortController()
    let observer

    fetch(fallbackUrl, { signal: controller.signal })
      .then((response) => response.ok ? response.text() : null)
      .then((template) => {
        if (!template || controller.signal.aborted) return

        const refresh = () => {
          const theme = getComputedStyle(root)
          const tile = theme.getPropertyValue('--wordmark-tile').trim()
          const ink = theme.getPropertyValue('--wordmark-surname').trim()
          if (!tile || !ink) return

          const svg = template.replace('#171717', tile).replace('#ffffff', ink)
          icon.href = `data:image/svg+xml,${encodeURIComponent(svg)}`
        }

        observer = new MutationObserver(refresh)
        observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
        refresh()
      })
      .catch(() => {}) // Keep the static favicon if the SVG request fails.

    return () => {
      controller.abort()
      observer?.disconnect()
      icon.href = fallbackUrl
    }
  }, [])
}
