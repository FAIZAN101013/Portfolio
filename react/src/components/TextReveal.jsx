import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { EASE_OUT_SOFT } from '../lib/motion'

/**
 * Headline reveal: each word rises out of its own clipping box, staggered
 * left to right, the first time the block scrolls into view.
 *
 * The text is split on whitespace and reassembled with real space text nodes
 * *between* the masks rather than inside them — a trailing space inside an
 * inline-block is trimmed, which would run every word together. Keeping the
 * spaces outside also means the line still wraps at natural break points.
 *
 * The wrapper carries the full string as its accessible name and the word
 * spans are hidden, so assistive tech never hears it word by word.
 */
export function TextReveal({
  text,
  as = 'span',
  className = '',
  delay = 0,
  stagger = 0.035,
  duration = 0.7,
}) {
  const Component = motion[as] ?? motion.span
  const reduced = useReducedMotion()

  if (reduced) {
    return <Component className={className}>{text}</Component>
  }

  const words = text.split(' ')

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            // The mask each word rises out of. overflow-hidden on an
            // inline-block moves its baseline to the bottom margin edge, which
            // both clips descenders and drops the word off the text baseline —
            // the padding makes room for the descender and the equal negative
            // margin cancels its effect on layout.
            className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em]"
            aria-hidden="true"
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '115%', opacity: 0 },
                visible: {
                  y: '0%',
                  opacity: 1,
                  transition: {
                    duration,
                    delay: delay + index * stagger,
                    ease: EASE_OUT_SOFT,
                  },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Component>
  )
}
