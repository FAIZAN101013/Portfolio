import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { Circles } from './components/Circles'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Preloader } from './components/Preloader'
import { ScrollProgress } from './components/ScrollProgress'
import { useReducedMotion } from './hooks/useReducedMotion'
import { EASE_OUT_SOFT } from './lib/motion'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'

export default function App() {
  const location = useLocation()
  const { pathname, hash } = location
  const isHome = pathname === '/'
  const reduced = useReducedMotion()

  /**
   * Landing on /#skills — from a project page, or a pasted URL — scrolls to
   * that section.
   *
   * It re-pins every frame for a short window rather than scrolling once.
   * Home mounts with its images unloaded, so a single scroll on the first
   * frame targets a position that is thousands of pixels off by the time the
   * thumbnails arrive and the page grows underneath it. Holding the element
   * in place while that settles is what makes it land where it should.
   *
   * Any real input ends the window immediately, so this can never fight a
   * user who has started scrolling on their own.
   */
  useEffect(() => {
    if (!isHome || !hash) return
    const id = hash.slice(1)

    let frame
    let cancelled = false
    const deadline = performance.now() + 900

    const release = () => {
      cancelled = true
    }

    const settle = () => {
      if (cancelled) return
      // 'auto', not 'smooth': arriving at an anchor from another page should
      // land there the way a normal page load does, not animate across the
      // whole document. block:'start' honours the section's scroll-margin.
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
      if (performance.now() < deadline) frame = requestAnimationFrame(settle)
    }

    frame = requestAnimationFrame(settle)

    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown']
    events.forEach((event) => window.addEventListener(event, release, { passive: true }))

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      events.forEach((event) => window.removeEventListener(event, release))
    }
  }, [isHome, hash])

  const transition = reduced
    ? { duration: 0.12 }
    : { duration: 0.35, ease: EASE_OUT_SOFT }

  return (
    <>
      <Preloader />
      <ScrollProgress />

      {/* overflow-x only. `overflow: hidden` on this wrapper made it the
          scroll container for position: sticky, so the pinned horizontal
          section had nothing to stick to. */}
      <div id="top" className="relative flex min-h-screen flex-col overflow-x-clip">
        {isHome && <Circles />}
        <Header isHome={isHome} />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            className="flex flex-1 flex-col"
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={transition}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              {/* the old design-project.html route, kept working */}
              <Route path="/design/:id" element={<LegacyDesignRedirect />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>

        <Footer />
      </div>
    </>
  )
}

function LegacyDesignRedirect() {
  const { id } = useParams()
  return <Navigate to={`/project/${id}`} replace />
}
