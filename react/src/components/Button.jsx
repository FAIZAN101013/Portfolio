import { useCallback, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIsTouch } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Cursor-following wrapper. The child drifts toward the pointer while it is
 * over the element and springs back on leave.
 *
 * Pointer-only by design: on a touch screen there is no cursor to follow, and
 * the transform would only fire on tap — reading as a glitch rather than an
 * affordance. Touch devices get the press state below instead.
 */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const isTouch = useIsTouch()
  const reduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const spring = { stiffness: 240, damping: 18, mass: 0.4 }
  const springX = useSpring(x, spring)
  const springY = useSpring(y, spring)

  const onPointerMove = useCallback(
    (event) => {
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      // Offset from the element's centre, scaled down so the pull is a nudge
      // rather than the element chasing the cursor out of its own bounds.
      x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
      y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
    },
    [strength, x, y]
  )

  const reset = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  if (isTouch || reduced) {
    return <span className={`inline-flex ${className}`}>{children}</span>
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  )
}

/** Hoisted: motion.create() returns a new component type on every call, so
 *  building it inside render would remount the link on each pass. */
const MotionLink = motion.create(Link)

/**
 * The site's one button. Renders as a router <Link>, an <a> or a <button>
 * depending on which of `to` / `href` / `onClick` it is given, so every button
 * on the page shares the same press feedback and the same shine sweep
 * (.btn::after in index.css).
 *
 * `magnetic` is opt-in rather than default: it is the right flourish for a
 * standalone call to action, and the wrong one for a button sitting inside a
 * tight row where neighbours would appear to jostle.
 */
export function Button({
  children,
  to,
  href,
  onClick,
  className = '',
  variant = 'solid',
  size = 'medium',
  magnetic = false,
  fullWidth = false,
  withArrow = false,
  wrapperClassName = '',
  ...rest
}) {
  const reduced = useReducedMotion()

  const classes = [
    'btn',
    size === 'medium' && 'btn--medium',
    variant === 'stroke' && 'btn--stroke',
    fullWidth && 'btn--fullwidth',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const press = reduced ? {} : { whileTap: { scale: 0.96 } }

  const content = (
    <span className="relative z-1 inline-flex items-center">
      {children}
      {withArrow && (
        <svg
          viewBox="0 0 24 24"
          className="ml-3 size-4 shrink-0 transition-transform duration-300 ease-(--ease-out-soft) group-hover/btn:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )}
    </span>
  )

  // onClick belongs on every branch, not just the <button> one: a link can
  // carry a handler alongside its href (the contact button copies the address
  // as well as firing the mailto), and dropping it there fails silently.
  const shared = {
    className: `group/btn ${classes}`,
    onClick,
    ...press,
    ...rest,
  }

  let element
  if (to) {
    element = (
      <MotionLink to={to} {...shared}>
        {content}
      </MotionLink>
    )
  } else if (href) {
    element = (
      <motion.a href={href} {...shared}>
        {content}
      </motion.a>
    )
  } else {
    element = (
      <motion.button type="button" {...shared}>
        {content}
      </motion.button>
    )
  }

  // A stretched button needs the wrapper stretched too, or the magnetic span
  // collapses to its content width and the button no longer fills the column.
  // wrapperClassName is the hook for callers that only stretch at some widths.
  return magnetic ? (
    <Magnetic
      className={`${fullWidth ? 'w-full [&>*]:w-full' : ''} ${wrapperClassName}`}
    >
      {element}
    </Magnetic>
  ) : (
    element
  )
}
