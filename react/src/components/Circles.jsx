import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { EASE_IN_OUT_CUBIC, HERO_DELAY, HERO_SCALE } from '../lib/motion'

/**
 * The five concentric accent rings behind the hero.
 *
 * Geometry is `.s-pagewrap .circles` verbatim: a 70vw square pinned so its
 * bottom edge meets the fold, pushed three-quarters off the right side.
 *
 * The swell is the anime.js step transcribed exactly:
 *
 *   targets:  '.circles span'
 *   keyframes: [ {opacity: [0, .3]},
 *                {opacity: [.3, .1], delay: stagger(100, reverse)} ]
 *   delay:     stagger(100, reverse)
 *   easing:    easeInOutCubic     duration: 800
 *
 * anime splits the 800ms duration evenly across the two keyframes, so each
 * leg runs 400ms. Both the entry delay and the second keyframe's delay use a
 * *reverse* 100ms stagger, which means the innermost ring lights up and
 * settles first and the outermost trails it by 400ms on each leg.
 */
const RINGS = ['100%', '80%', '60%', '40%', '20%']

const LEG = 0.4 * HERO_SCALE // 800ms split across two keyframes
const STAGGER = 0.1 * HERO_SCALE

export function Circles() {
  const reduced = useReducedMotion()

  return (
    <div
      className="pointer-events-none absolute left-[calc(100%-33vw)] top-[calc(100vh-70vw)] size-[70vw] max-md:top-[calc(var(--header-height)+5vh)]"
      aria-hidden="true"
    >
      {RINGS.map((size, index) => {
        // reverse stagger: last element first
        const step = (RINGS.length - 1 - index) * STAGGER
        const total = LEG + step + LEG

        return (
          <motion.span
            key={size}
            data-circle={index}
            className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
            style={{ width: size, height: size }}
            // The stylesheet parks the rings at .1; anime only snaps them to 0
            // once its keyframe starts, so that resting value is the initial.
            initial={{ opacity: 0.1 }}
            animate={reduced ? { opacity: 0.1 } : { opacity: [0, 0.3, 0.3, 0.1] }}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    duration: total,
                    times: [0, LEG / total, (LEG + step) / total, 1],
                    delay: HERO_DELAY.circles + step,
                    ease: EASE_IN_OUT_CUBIC,
                  }
            }
          />
        )
      })}
    </div>
  )
}
