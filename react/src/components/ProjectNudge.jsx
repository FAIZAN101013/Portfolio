import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { projects } from '../data/projects'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { EASE_OUT_SOFT } from '../lib/motion'

const FIRST_DELAY_MS = 25 * 1000 // let the visitor settle in first
const RETRY_MS = 10 * 1000 // try again if the moment was wrong
const SHOW_MS = 9 * 1000
const SESSION_KEY = 'project-nudge-shown'

function alreadyShown() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function rememberShown() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    /* storage blocked: it will simply show once per page load */
  }
}

/**
 * True only while the visitor is in the middle of the home page: past the
 * hero and not yet at the contact form. Anywhere else the toast would be in
 * the way rather than helpful.
 */
function goodMoment() {
  if (window.location.pathname !== '/') return false
  const hero = document.getElementById('intro')
  const contact = document.getElementById('contact')
  if (!hero || !contact) return false
  const pastHero = window.scrollY > hero.offsetHeight * 0.6
  const contactTop = contact.getBoundingClientRect().top
  return pastHero && contactTop > window.innerHeight * 0.8
}

/**
 * One-line toast that suggests a random project, once per visit, while the
 * visitor is browsing the middle of the home page.
 */
export function ProjectNudge() {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  const [project, setProject] = useState(null)

  useEffect(() => {
    if (alreadyShown()) return undefined
    let timer
    let hideTimer
    const attempt = () => {
      if (alreadyShown()) return
      if (!goodMoment()) {
        timer = setTimeout(attempt, RETRY_MS)
        return
      }
      const pool = projects.filter((p) => !p.featured)
      const pick = pool[Math.floor(Math.random() * pool.length)]
      rememberShown()
      setProject(pick)
      hideTimer = setTimeout(() => setProject(null), SHOW_MS)
    }
    timer = setTimeout(attempt, FIRST_DELAY_MS)
    return () => {
      clearTimeout(timer)
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
          className="fixed bottom-4 left-4 right-4 z-40 overflow-hidden rounded-xl border border-white/10 bg-[#1b1c1e]/90 shadow-[0_12px_32px_rgba(0,0,0,.4)] backdrop-blur-md sm:left-auto sm:right-6 sm:bottom-6 sm:w-[340px]"
        >
          <Link
            to={`/project/${project.id}`}
            className="group flex items-center gap-4 px-5 py-4 pr-16 transition-colors hover:bg-white/[0.04]"
          >
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-content/80">
                <span className="size-1.5 rounded-full bg-accent" />
                Have you seen
              </span>
              <span className="line-clamp-2 font-display text-[22px] leading-[1.15] text-accent">
                {project.title}
              </span>
              <span className="truncate text-[13px] text-content/80">{project.category}</span>
            </span>
            <span
              aria-hidden
              className="absolute right-4 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-accent/40 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-body"
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
            className="absolute bottom-0 left-0 h-px bg-accent/60"
            initial={{ width: '100%' }}
            animate={{ width: 0 }}
            transition={{ duration: SHOW_MS / 1000, ease: 'linear' }}
          />
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
