import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { getThumbnail, projects } from '../data/projects'
import { asset } from '../lib/asset'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { EASE_OUT_SOFT } from '../lib/motion'

const INTERVAL_MS = 15 * 1000 // a new random project every 15 seconds
const SHOW_MS = 9 * 1000 // visible for 9s, then a short gap before the next one

/**
 * One-line toast that suggests a random project every 15 seconds. It never
 * suggests the project page the visitor is already reading, and never shows
 * the same project twice in a row.
 */
export function ProjectNudge() {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  const [project, setProject] = useState(null)

  useEffect(() => {
    let last = null
    let hideTimer
    const show = () => {
      const pool = projects.filter(
        (p) => `/project/${p.id}` !== window.location.pathname && p.id !== last,
      )
      const pick = pool[Math.floor(Math.random() * pool.length)]
      last = pick.id
      setProject(pick)
      hideTimer = setTimeout(() => setProject(null), SHOW_MS)
    }
    const interval = setInterval(show, INTERVAL_MS)
    return () => {
      clearInterval(interval)
      clearTimeout(hideTimer)
    }
  }, [])

  // Navigating anywhere dismisses it.
  useEffect(() => setProject(null), [pathname])

  return (
    <AnimatePresence>
      {project && (
        <motion.aside
          key={project.id}
          role="status"
          initial={{ opacity: 0, y: reduced ? 0 : 20, scale: reduced ? 1 : 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.98 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: EASE_OUT_SOFT }}
          className="fixed bottom-4 left-4 right-4 z-40 overflow-hidden rounded-2xl border border-white/10 bg-[#1b1c1e]/95 shadow-[0_24px_60px_rgba(0,0,0,.5)] backdrop-blur-md sm:left-auto sm:right-6 sm:bottom-6 sm:w-[400px]"
        >
          <Link
            to={`/project/${project.id}`}
            className="group flex items-stretch gap-4 p-3 pr-12 transition-colors hover:bg-white/[0.04]"
          >
            <span className="relative block w-24 flex-none overflow-hidden rounded-xl bg-black/40">
              <img
                src={asset(getThumbnail(project))}
                alt=""
                className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </span>
            <span className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-1">
              <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] text-accent">
                <span className="size-1.5 rounded-full bg-accent" />
                Have you seen
              </span>
              <span className="line-clamp-2 font-display text-[1.15rem] leading-[1.2] text-white">
                {project.title}
              </span>
              <span className="truncate text-xs text-content">{project.category}</span>
            </span>
            <span
              aria-hidden
              className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-accent text-body opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setProject(null)}
            aria-label="Dismiss"
            className="absolute right-2 top-2 grid size-7 place-items-center rounded-full text-content/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* time-left bar: drains over the toast's lifetime */}
          <motion.span
            aria-hidden
            className="absolute bottom-0 left-0 h-[2px] bg-accent/80"
            initial={{ width: '100%' }}
            animate={{ width: 0 }}
            transition={{ duration: SHOW_MS / 1000, ease: 'linear' }}
          />
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
