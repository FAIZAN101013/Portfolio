import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Replaces the original main.js scroll-position loop. IntersectionObserver
 * does the same job without a scroll listener firing on every frame.
 *
 * rootMargin pulls the trigger line down past the fixed header so a section
 * is "current" once it actually fills the viewport.
 *
 * Sections here are nested — #skills lives inside #about — so more than one
 * is routinely intersecting at once, and picking whichever entry the observer
 * happened to report first left the nav reading "About" through the entire
 * skills section. `ids` is in document order, so the last intersecting id is
 * always the innermost or furthest-progressed one, which is the one to show.
 */
export function useScrollSpy(ids, { rootMargin = '-45% 0px -50% 0px' } = {}) {
  const [activeId, setActiveId] = useState(ids[0])
  const intersecting = useRef(new Set())

  // ids is a module-level constant at every call site today; memoising the
  // join keeps the effect from resubscribing if that ever stops being true.
  const key = useMemo(() => ids.join('|'), [ids])

  useEffect(() => {
    const list = key.split('|')
    const sections = list.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return

    const seen = intersecting.current
    seen.clear()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target.id)
          else seen.delete(entry.target.id)
        }

        for (let i = list.length - 1; i >= 0; i -= 1) {
          if (seen.has(list[i])) {
            setActiveId(list[i])
            return
          }
        }
      },
      { rootMargin, threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [key, rootMargin])

  return activeId
}
