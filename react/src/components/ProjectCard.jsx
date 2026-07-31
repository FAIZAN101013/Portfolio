import { Link } from 'react-router-dom'
import { getThumbnail } from '../data/projects'
import { asset } from '../lib/asset'

/**
 * Hover behaviour follows css/projects.css: the caption panel slides up from
 * translateY(100%), category and title stagger in at 0.1s / 0.2s, and the
 * corner arrow slides in from right:-50px to right:2rem.
 *
 * Every card — design or development — now opens the same detail page, so the
 * two tabs behave identically. The whole card is one link; the corner arrow is
 * decorative rather than a second, competing target.
 */
export function ProjectCard({ project }) {
  const thumbnail = asset(getThumbnail(project))

  return (
    <Link
      to={`/project/${project.id}`}
      aria-label={`${project.title} — ${project.category}`}
      className="group/card relative block h-[400px] w-full overflow-hidden bg-gray-9 max-md:h-[320px]"
    >
      <img
        src={thumbnail}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-center transition-transform duration-[700ms] ease-(--ease-out-soft) group-hover/card:scale-[1.06]"
      />

      {/* scrim: keeps the caption legible over bright screenshots */}
      <span
        className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-400 group-hover/card:opacity-100 group-focus-visible/card:opacity-100"
        aria-hidden="true"
      />

      <span
        className="absolute -right-[50px] top-8 z-3 flex size-[45px] items-center justify-center rounded-full bg-accent text-black shadow-[0_6px_18px_-6px_rgb(0_0_0/0.8)] transition-[right] duration-400 ease-(--ease-out-soft) group-hover/card:right-8 group-focus-visible/card:right-8"
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

      <span className="absolute inset-x-0 bottom-0 block translate-y-full bg-linear-to-t from-black/95 via-black/80 to-transparent p-8 transition-transform duration-400 ease-(--ease-out-soft) group-hover/card:translate-y-0 group-focus-visible/card:translate-y-0">
        <span className="mb-[0.8rem] block translate-y-5 text-(length:--text-xs) font-medium uppercase tracking-[0.2em] text-accent opacity-0 transition-[transform,opacity] delay-100 duration-400 ease-(--ease-out-soft) group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-visible/card:translate-y-0 group-focus-visible/card:opacity-100">
          {project.category}
        </span>
        <span className="block translate-y-5 font-display text-(length:--text-xl) leading-tight text-white opacity-0 transition-[transform,opacity] delay-200 duration-400 ease-(--ease-out-soft) group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-visible/card:translate-y-0 group-focus-visible/card:opacity-100">
          {project.title}
        </span>
      </span>
    </Link>
  )
}
