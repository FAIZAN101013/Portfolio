import { useEffect, useState } from 'react'

/**
 * Replaces the original main.js scroll-position loop. IntersectionObserver
 * does the same job without a scroll listener firing on every frame.
 *
 * rootMargin pulls the trigger line down past the fixed header so a section
 * is "current" once it actually fills the viewport.
 */
export function useScrollSpy(ids, { rootMargin = '-45% 0px -50% 0px' } = {}) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActiveId(visible[0].target.id)
      },
      { rootMargin, threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids, rootMargin])

  return activeId
}
