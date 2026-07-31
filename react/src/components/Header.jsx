import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { navLinks, site } from '../data/site'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { EASE_IN_OUT_CUBIC, EASE_OUT_SOFT, HERO_DELAY, HERO_DURATION } from '../lib/motion'

const SECTION_IDS = navLinks.map((l) => l.id)
const EASE = EASE_OUT_SOFT

export function Header({ isHome = true }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeId = useScrollSpy(SECTION_IDS)

  // Polish: the bar picks up a background once you leave the hero, so nav
  // labels stay legible over the project screenshots.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Polish: the original mobile menu stayed open after resizing to desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1000px)')
    const close = () => mq.matches && setMenuOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const hrefFor = (id) => (isHome ? `#${id}` : `/#${id}`)

  const navigate = (id) => (event) => {
    setMenuOpen(false)
    if (!isHome) return
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      className="fixed left-0 top-0 z-100 w-full"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: HERO_DURATION, delay: HERO_DELAY.header, ease: EASE_IN_OUT_CUBIC }}
    >
      {/* ---------- mobile bar ---------- */}
      <div
        className={`hidden h-(--header-height) border-b border-hairline transition-colors duration-300 max-lg:block ${
          scrolled || menuOpen ? 'bg-body/95 backdrop-blur-md' : 'bg-body'
        }`}
      >
        <Link
          to="/"
          onClick={navigate('intro')}
          className="ml-[2.4rem] inline-block px-[.4rem] text-[10px] font-normal uppercase leading-(--header-height) tracking-[.35em] text-white hover:text-accent"
        >
          {site.name}
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="absolute right-[.8rem] top-0 size-(--header-height)"
        >
          <span
            className={[
              'absolute right-5 top-1/2 -mt-px block h-px w-6 transition-colors duration-200',
              'before:absolute before:left-0 before:h-full before:w-full before:bg-inherit before:content-[""]',
              'after:absolute after:left-0 after:h-full after:w-full after:bg-inherit after:content-[""]',
              'before:transition-[top,transform] before:duration-200 after:transition-[bottom,transform] after:duration-200',
              menuOpen
                ? 'bg-transparent before:top-0 before:rotate-45 before:bg-accent after:bottom-0 after:-rotate-45 after:bg-accent'
                : 'bg-white before:-top-2 after:-bottom-2',
            ].join(' ')}
          />
        </button>
      </div>

      {/* ---------- desktop nav ---------- */}
      <div className="max-lg:hidden">
        <div className="row row--wide">
          <nav className="column col-12 px-0" aria-label="Primary">
            <ul
              className={`m-0 flex w-full list-none flex-nowrap border-x border-b border-hairline p-0 transition-colors duration-300 ${
                scrolled ? 'bg-body/92 backdrop-blur-md' : 'bg-body'
              }`}
            >
              <li className="flex-1 border-r border-hairline">
                <Link to="/" onClick={navigate('intro')} className={LINK_BASE}>
                  {site.name}
                </Link>
              </li>

              {navLinks.map(({ id, label }) => {
                const current = isHome && activeId === id
                return (
                  <li key={id} className="relative flex-1 border-r border-hairline last:border-r-0">
                    <a
                      href={hrefFor(id)}
                      onClick={navigate(id)}
                      aria-current={current ? 'true' : undefined}
                      className={`${LINK_BASE} ${current ? 'bg-white/[0.06] text-accent' : ''}`}
                    >
                      {label}
                    </a>
                    {current && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-0 bottom-0 h-px bg-accent"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* ---------- mobile drawer ---------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            className="min-lg:hidden origin-top border-b border-hairline bg-body/98 backdrop-blur-md shadow-[0_18px_40px_-20px_rgb(0_0_0/0.9)]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <ul className="m-0 list-none py-(--vspace-0_75) pl-0 text-left">
              {navLinks.map(({ id, label }, index) => {
                const current = isHome && activeId === id
                return (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * index + 0.08, duration: 0.3, ease: EASE }}
                  >
                    <a
                      href={hrefFor(id)}
                      onClick={navigate(id)}
                      aria-current={current ? 'true' : undefined}
                      className={`block px-[2.8rem] py-(--vspace-0_5) font-display text-(length:--text-md) leading-(--vspace-0_875) transition-colors duration-200 ${
                        current ? 'text-accent' : 'text-content hover:text-white'
                      }`}
                    >
                      {label}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/**
 * whitespace-nowrap plus tighter padding below 1200px: the original let the
 * nav labels wrap onto a second line between 800 and 1000px, which broke the
 * header's fixed 6.4rem height.
 */
const LINK_BASE =
  'block whitespace-nowrap px-[2rem] pl-[2.4rem] text-[10px] font-normal uppercase leading-(--header-height) tracking-[.35em] text-white transition-colors duration-300 hover:text-accent max-xl:px-[1.2rem] max-xl:pl-[1.4rem] max-xl:tracking-[.2em]'
