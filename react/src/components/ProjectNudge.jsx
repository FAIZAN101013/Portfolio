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
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : 16 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT_SOFT }}
          className="fixed bottom-4 left-4 right-4 z-40 flex items-center gap-3 rounded-xl border border-white/10 bg-[#1b1c1e]/95 p-2 pr-3 shadow-[0_20px_50px_rgba(0,0,0,.45)] backdrop-blur sm:left-auto sm:right-6 sm:w-[360px]"
        >
          <Link to={`/project/${project.id}`} className="flex min-w-0 flex-1 items-center gap-3">
            <img
              src={asset(getThumbnail(project))}
              alt=""
              width="56"
              height="56"
              className="size-14 flex-none rounded-lg object-cover"
            />
            <span className="min-w-0">
              <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-accent">
                Have you seen
              </span>
              <span className="block truncate font-display text-lg leading-tight text-white">
                {project.title}
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setProject(null)}
            aria-label="Dismiss"
            className="grid size-9 flex-none place-items-center rounded-full text-content hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
