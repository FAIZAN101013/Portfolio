import { useScroll, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

/**
 * Scroll-linked vertical offset for an element, expressed in pixels.
 *
 * `offset: ['start end', 'end start']` measures progress across the element's
 * whole pass through the viewport — 0 as its top meets the bottom edge, 1 as
 * its bottom leaves the top edge — so the effect is symmetric around the point
 * where it is centred, and the element is never displaced while it is the
 * thing you are actually looking at.
 *
 * Returns a MotionValue that stays pinned at 0 under reduced motion, so
 * callers can pass it to `style` unconditionally.
 */
export function useParallax(ref, distance = 60, { spring = true } = {}) {
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [distance, -distance]
  )

  // The spring is what keeps this from feeling glued to the scroll wheel; on a
  // trackpad with momentum the difference is the whole effect.
  const smooth = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 })

  return spring && !reduced ? smooth : raw
}
