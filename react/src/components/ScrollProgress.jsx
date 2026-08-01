import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Scroll-linked reading indicator: a hairline that fills across the top of the
 * viewport as the page scrolls. It sits above the header (z-101) and is one
 * pixel tall, so it reads as part of the header's bottom border rather than a
 * separate bar — on mobile, where the header is the only chrome, that matters.
 *
 * The raw scrollYProgress is stiff enough to look mechanical; the spring gives
 * it just enough lag to feel physical without visibly trailing the scroll.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduced = useReducedMotion()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  })

  if (reduced) return null

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-101 h-[2px] origin-left bg-linear-to-r from-accent via-accent-lighter to-teal-light"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
