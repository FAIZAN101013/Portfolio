import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Infinite horizontal ticker whose speed and direction respond to the page's
 * scroll velocity: it drifts at `baseVelocity` when the page is still, speeds
 * up as you scroll, and flips direction when you scroll back up.
 *
 * The children are rendered four times. The track translates from 0% to -25%
 * and wraps, so at any moment at least two copies span the viewport and the
 * seam never enters view. Four copies (rather than two) is what keeps it
 * gapless on wide screens where one copy is narrower than the viewport.
 *
 * `velocityFactor` maps scroll velocity through a spring so a flick decays
 * instead of snapping, and `wrap(-40, 40, …)` clamps the influence so a fast
 * scroll can't fling the track past its own wrap window in a single frame.
 */
export function Marquee({ children, baseVelocity = 3, className = '' }) {
  const baseX = useMotionValue(0)
  const reduced = useReducedMotion()

  // The ticker is one band in a page several screens tall. Left ungated it
  // would write a transform every frame for the entire visit; on a phone that
  // is a composite per frame and a measurable battery cost for something the
  // reader cannot see. `margin` keeps it running just off-screen so it is
  // already in motion by the time it scrolls into view.
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { margin: '150px 0px 150px 0px' })

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  })

  const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`)

  // Direction is held in a ref rather than state: it changes mid-frame and a
  // re-render per flip would be both wasteful and visibly janky.
  const directionFactor = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduced || !inView) return

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    const factor = velocityFactor.get()
    if (factor < 0) directionFactor.current = -1
    else if (factor > 0) directionFactor.current = 1

    moveBy += moveBy * factor
    baseX.set(baseX.get() + moveBy)
  })

  // Reduced motion: a static, non-scrolling strip of the same content.
  if (reduced) {
    return (
      <div ref={containerRef} className={`flex overflow-hidden ${className}`} aria-hidden="true">
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`flex overflow-hidden ${className}`} aria-hidden="true">
      <motion.div className="flex flex-nowrap" style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
