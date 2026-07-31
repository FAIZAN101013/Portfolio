import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { Circles } from './components/Circles'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Preloader } from './components/Preloader'
import { useReducedMotion } from './hooks/useReducedMotion'
import { EASE_OUT_SOFT } from './lib/motion'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'

export default function App() {
  const location = useLocation()
  const { pathname, hash } = location
  const isHome = pathname === '/'
  const reduced = useReducedMotion()

  // Landing on /#skills (e.g. from a project page) should scroll to that
  // section once the page has painted.
  useEffect(() => {
    if (!isHome || !hash) return
    const id = hash.slice(1)
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [isHome, hash])

  const transition = reduced
    ? { duration: 0.12 }
    : { duration: 0.35, ease: EASE_OUT_SOFT }

  return (
    <>
      <Preloader />

      <div id="top" className="relative flex min-h-screen flex-col overflow-hidden">
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
