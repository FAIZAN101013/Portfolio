import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { EASE_OUT_SOFT } from '../lib/motion'

/**
 * Scroll-reveal wrapper. Replaces the [data-animate-block] /
 * [data-animate-el] machinery in the original main.js.
 *
 * Accepts dangerouslySetInnerHTML via ...rest, so it can wrap the
 * HTML-bearing copy in the About and case-study sections.
 */
export function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 20,
  duration = 0.6,
  className,
  ...rest
}) {
  const Component = motion[as] ?? motion.div
  const reduced = useReducedMotion()

  // With reduced motion the content is simply present — never faded in from
  // a hidden state, which would leave it invisible if the observer misfired.
  const animation = reduced
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration, delay, ease: EASE_OUT_SOFT },
      }

  return (
    <Component className={className} {...animation} {...rest}>
      {children}
    </Component>
  )
}
