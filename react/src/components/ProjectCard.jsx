import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getThumbnail } from '../data/projects'
import { asset } from '../lib/asset'
import { useParallax } from '../hooks/useParallax'
import { useReducedMotion } from '../hooks/useReducedMotion'

const MotionLink = motion.create(Link)

/**
 * Hover behaviour follows css/projects.css: the caption panel slides up from
 * translateY(100%), category and title stagger in at 0.1s / 0.2s, and the
 * corner arrow slides in from right:-50px to right:2rem.
 *
 * On touch devices that reveal never happens — there is no hover — so every
 * card was a bare screenshot with no title, no category and no visible cue
 * that it opened anything. The `touch:` variant flips the resting state: the
 * caption sits open, the arrow is parked in place, and the press is confirmed
 * by whileTap instead of by a hover transition.
 *
 * Every card — design or development — opens the same detail page, so the two
 * tabs behave identically. The whole card is one link; the corner arrow is
 * decorative rather than a second, competing target.
 */
export function ProjectCard({ project }) {
  const thumbnail = asset(getThumbnail(project))
  const ref = useRef(null)
  const reduced = useReducedMotion()

  // Scroll-linked drift on the artwork. The image is oversized by 16% and
  // offset -8%, so ±26px of travel never exposes an edge. No spring here:
  // a grid can hold a dozen of these at once, and twelve concurrent spring
  // loops is a measurable cost on a phone for an effect this subtle.
  const y = useParallax(ref, 26, { spring: false })

  return (
    <MotionLink
      ref={ref}
      to={`/project/${project.id}`}
      aria-label={`${project.title} — ${project.category}`}
      className="group/card relative block h-[400px] w-full overflow-hidden bg-gray-9 max-md:h-[320px] max-xs:h-[260px]"
      whileTap={reduced ? undefined : { scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <motion.img
        src={thumbnail}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ y }}
        className="absolute -top-[8%] left-0 h-[116%] w-full object-cover object-center transition-transform duration-[700ms] ease-(--ease-out-soft) group-hover/card:scale-[1.06]"
      />

      {/* Scrim. On a pointer device it fades in with the caption; on touch the
          caption is always up, so the scrim has to be too or the title sits
          unreadable over a bright screenshot. */}
      <span
        className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-400 group-hover/card:opacity-100 group-focus-visible/card:opacity-100 touch:opacity-100"
        aria-hidden="true"
      />

      <span
        className="absolute -right-[50px] top-8 z-3 flex size-[45px] items-center justify-center rounded-full bg-accent text-black shadow-[0_6px_18px_-6px_rgb(0_0_0/0.8)] transition-[right] duration-400 ease-(--ease-out-soft) group-hover/card:right-8 group-focus-visible/card:right-8 touch:right-6 max-xs:top-6 max-xs:size-[38px]"
        aria-hidden="true"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </span>

      <span className="absolute inset-x-0 bottom-0 block translate-y-full bg-linear-to-t from-black/95 via-black/80 to-transparent p-8 transition-transform duration-400 ease-(--ease-out-soft) group-hover/card:translate-y-0 group-focus-visible/card:translate-y-0 touch:translate-y-0 max-xs:p-5">
        <span className="mb-[0.8rem] block translate-y-5 text-(length:--text-xs) font-medium uppercase tracking-[0.2em] text-accent opacity-0 transition-[transform,opacity] delay-100 duration-400 ease-(--ease-out-soft) group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-visible/card:translate-y-0 group-focus-visible/card:opacity-100 touch:translate-y-0 touch:opacity-100">
          {project.category}
        </span>
        <span className="block translate-y-5 font-display text-(length:--text-xl) leading-tight text-white opacity-0 transition-[transform,opacity] delay-200 duration-400 ease-(--ease-out-soft) group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-visible/card:translate-y-0 group-focus-visible/card:opacity-100 touch:translate-y-0 touch:opacity-100">
          {project.title}
        </span>
      </span>
    </MotionLink>
  )
}
