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

  // Freelance work is the paid, shipped-for-a-client tier — the gold border
  // marks it apart from personal projects everywhere the card appears.
  const isFreelance = project.tags.includes('freelance')

  // Scroll-linked drift on the artwork. The image is oversized by 16% and
  // offset -8%, so ±26px of travel never exposes an edge. No spring here:
  // a grid can hold a dozen of these at once, and twelve concurrent spring
  // loops is a measurable cost on a phone for an effect this subtle.
  const y = useParallax(ref, 10, { spring: false })

  return (
    <MotionLink
      ref={ref}
      to={`/project/${project.id}`}
      aria-label={`${project.title} — ${project.category}`}
      className="group/card block w-full"
      whileTap={reduced ? undefined : { scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Cover: landscape so a full-width screenshot reads as a page, cropped
          from the top so the hero and headline are what you see. */}
      <span
        className={`relative block aspect-[1.85] overflow-hidden rounded-sm bg-gray-9 ${
          isFreelance ? 'ring-1 ring-accent/60' : 'ring-1 ring-white/10'
        }`}
      >
        <motion.img
          src={thumbnail}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ y }}
          className="absolute left-0 top-0 h-auto w-full origin-top-left scale-[1.1] transition-transform duration-[700ms] ease-(--ease-out-soft) group-hover/card:scale-[1.14]"
        />
        <span
          className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-400 group-hover/card:opacity-100 group-focus-visible/card:opacity-100"
          aria-hidden="true"
        />
        <span
          className="absolute -right-[50px] top-6 z-3 flex size-[42px] items-center justify-center rounded-full bg-accent text-black shadow-[0_6px_18px_-6px_rgb(0_0_0/0.8)] transition-[right] duration-400 ease-(--ease-out-soft) group-hover/card:right-6 group-focus-visible/card:right-6 touch:right-5"
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
      </span>

      {/* Caption: always visible. Hover only exists on a pointer device, and a
          project grid where the names are hidden on phones is a grid of
          anonymous rectangles. */}
      <span className="mt-5 block max-md:mt-4">
        <span className="mb-2 block text-(length:--text-xs) font-medium uppercase tracking-[0.2em] text-accent">
          {project.category}
        </span>
        <span className="block font-display text-(length:--text-xl) leading-tight text-white transition-colors duration-300 group-hover/card:text-accent">
          {project.title}
        </span>
      </span>
    </MotionLink>
  )
}
