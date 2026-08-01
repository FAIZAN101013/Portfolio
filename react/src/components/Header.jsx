import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
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

  /**
   * Both branches preventDefault. Letting the browser follow `/#contact` from
   * a project page was a full document navigation — the whole app tore down
   * and rebooted, preloader and all, which is why those links read as broken
   * rather than slow. Routing instead keeps it a client-side transition, and
   * App's hash effect does the scroll once Home has painted.
   */
  const routeTo = useNavigate()

  const go = (id) => (event) => {
    event.preventDefault()
    setMenuOpen(false)

    if (isHome) {
      // The drawer locks body scroll while it is open, and React has not run
      // that effect's cleanup by this point in the handler — so the lock is
      // still applied and scrollIntoView is a no-op that gets discarded. This
      // is why every link in the mobile menu closed it and went nowhere.
      // Releasing it here is what makes the scroll land; the effect cleanup
      // then sets the same empty value a moment later, harmlessly.
      document.body.style.overflow = ''
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    routeTo(`/#${id}`)
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
        className={`relative z-2 hidden h-(--header-height) border-b border-hairline transition-colors duration-300 max-lg:flex max-lg:items-center max-lg:justify-between max-lg:pl-[2.4rem] max-lg:pr-[.8rem] ${
          scrolled || menuOpen ? 'bg-body/95 backdrop-blur-md' : 'bg-body'
        }`}
      >
        <Link
          to="/"
          onClick={go('intro')}
          className="inline-block px-[.4rem] py-3 text-[10px] font-normal uppercase tracking-[.35em] text-white hover:text-accent"
        >
          {site.name}
        </Link>

        {/* 48px round hit area rather than the bare 1px-tall burger glyph the
            original relied on — the icon is drawn by the span inside. */}
        <motion.button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          whileTap={{ scale: 0.9 }}
          className="tap-target relative flex size-12 shrink-0 items-center justify-center rounded-full"
        >
          {/* The bar colours are set explicitly in each state rather than via
              bg-inherit on the pseudos. Two background-color utilities on the
              same pseudo-variant resolve by stylesheet order, not by the order
              they appear in this list — bg-inherit was winning over bg-accent
              and the open state rendered no X at all. */}
          <span
            className={[
              'relative block h-px w-6 transition-colors duration-200',
              'before:absolute before:left-0 before:h-full before:w-full before:content-[""]',
              'after:absolute after:left-0 after:h-full after:w-full after:content-[""]',
              'before:transition-[top,transform] before:duration-200 after:transition-[bottom,transform] after:duration-200',
              menuOpen
                ? 'bg-transparent before:top-0 before:rotate-45 before:bg-accent after:bottom-0 after:-rotate-45 after:bg-accent'
                : 'bg-white before:-top-2 before:bg-white after:-bottom-2 after:bg-white',
            ].join(' ')}
          />
        </motion.button>
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
                <Link to="/" onClick={go('intro')} className={LINK_BASE}>
                  {site.name}
                </Link>
              </li>

              {navLinks.map(({ id, label }) => {
                const current = isHome && activeId === id
                return (
                  <li key={id} className="relative flex-1 border-r border-hairline last:border-r-0">
                    <a
                      href={hrefFor(id)}
                      onClick={go(id)}
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
      {/* Backdrop and panel get their own AnimatePresence each: one presence
          block with two siblings only coordinates their exits if they are
          separately keyed children, and separating them keeps the paint order
          unambiguous. Tapping the backdrop closes the menu; it starts below
          the header so the burger itself stays reachable. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.button
            key="backdrop"
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
            className="min-lg:hidden fixed inset-x-0 bottom-0 top-(--header-height) z-0 w-full cursor-default bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="panel"
            id="mobile-nav"
            aria-label="Primary"
            className="min-lg:hidden relative z-1 origin-top overflow-hidden border-b border-hairline bg-body/98 backdrop-blur-md shadow-[0_18px_40px_-20px_rgb(0_0_0/0.9)]"
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
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index + 0.08, duration: 0.32, ease: EASE }}
                  >
                    <a
                      href={hrefFor(id)}
                      onClick={go(id)}
                      aria-current={current ? 'true' : undefined}
                      // Full-row targets, min 52px tall: the original's
                      // padding put these well under the 44px minimum.
                      className={`flex min-h-[52px] items-center gap-4 px-[2.4rem] font-display text-(length:--text-lg) transition-colors duration-200 active:bg-white/5 ${
                        current ? 'text-accent' : 'text-content'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`block h-px transition-all duration-300 ease-(--ease-out-soft) ${
                          current ? 'w-8 bg-accent' : 'w-3 bg-white/25'
                        }`}
                      />
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
