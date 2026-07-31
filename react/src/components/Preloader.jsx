import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Spinner + fade-out, matching the original #preloader / #loader. */
export function Preloader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (document.readyState === 'complete') {
      // Short beat so the spinner never flashes for a single frame.
      const timer = setTimeout(() => setDone(true), 400)
      return () => clearTimeout(timer)
    }

    const onLoad = () => setDone(true)
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[900] flex items-center justify-center bg-gray-10"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <span className="block size-[45px] animate-spin rounded-full border-[3px] border-white/10 border-t-white" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
