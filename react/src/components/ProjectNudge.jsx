import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { getThumbnail, projects } from '../data/projects'
import { asset } from '../lib/asset'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { EASE_OUT_SOFT } from '../lib/motion'

const STORAGE_KEY = 'project-nudge-last-shown'
const COOLDOWN_MS = 15 * 60 * 1000 // at most once every 15 minutes
const FIRST_DELAY_MS = 20 * 1000 // give the visitor a moment to settle first
const AUTO_HIDE_MS = 12 * 1000

function lastShown() {
  try {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0
  } catch {
    return 0
  }
}

function markShown() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()))
  } catch {
    /* private mode, blocked storage: just show it this once */
  }
}

/**
 * One-line toast that suggests a random project. Shows once a visitor has
 * been on the site for a bit, then no more than once every 15 minutes, and
 * never suggests the project page the visitor is already reading.
 */
export function ProjectNudge() {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  const [project, setProject] = useState(null)

  useEffect(() => {
    let hideTimer
    const schedule = () => {
      const wait = Math.max(FIRST_DELAY_MS, lastShown() + COOLDOWN_MS - Date.now())
      return setTimeout(() => {
        const pool = projects.filter((p) => `/project/${p.id}` !== window.location.pathname)
        const pick = pool[Math.floor(Math.random() * pool.length)]
        setProject(pick)
        markShown()
        hideTimer = setTimeout(() => setProject(null), AUTO_HIDE_MS)
      }, wait)
    }
    let timer = schedule()
    const interval = setInterval(() => {
      clearTimeout(timer)
      timer = schedule()
    }, COOLDOWN_MS)
    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
      clearInterval(interval)
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
