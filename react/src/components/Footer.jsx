import { motion, useScroll, useTransform } from 'framer-motion'
import { Icon } from './Icon'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * The original footer, kept as designed: one copyright line and a back-to-top
 * box that sits half outside the row, pulled up by --vspace-1.
 *
 * The box now also reacts to scroll — it is dim and slightly shrunk near the
 * top of the page, where it has nothing to do, and resolves to full strength
 * once there is somewhere to go back to.
 */
export function Footer() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.12], [0.45, 1])
  const scale = useTransform(scrollYProgress, [0, 0.12], [0.9, 1])

  const scrollTop = (event) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <footer className="mt-auto pb-(--vspace-3) pt-(--vspace-1) text-content-light">
      <div className="row relative">
        <div className="column -mt-(--vspace-0_25) mr-[5.2rem] leading-(--vspace-0_875) max-sm:mr-0">
          <span className="inline-block text-(length:--text-sm)">Copyright Faizan</span>
        </div>

        <motion.div
          className="absolute right-(--gutter) top-[calc(var(--vspace-1)*-1)] z-2 max-sm:top-[calc(var(--vspace-0_25)*-1)]"
          style={reduced ? undefined : { opacity, scale }}
        >
          <motion.a
            href="#top"
            onClick={scrollTop}
            title="Back to Top"
            aria-label="Back to top"
            whileTap={reduced ? undefined : { scale: 0.92 }}
            className="group flex h-[calc(1.625*var(--space))] w-(--vspace-1_5) items-center justify-center border border-content bg-body no-underline transition-[background-color,border-color] duration-300 ease-(--ease-in-out-soft) hover:border-white hover:bg-white focus-visible:border-white focus-visible:bg-white max-sm:tap-target"
          >
            <Icon
              name="arrowUp"
              className="size-(--vspace-0_5) fill-white transition-[fill,transform] duration-300 ease-(--ease-out-soft) group-hover:-translate-y-0.5 group-hover:fill-black group-focus-visible:fill-black"
            />
          </motion.a>
        </motion.div>
      </div>
    </footer>
  )
}
