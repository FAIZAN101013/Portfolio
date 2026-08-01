import { Fragment, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Icon } from './Icon'
import { site, socials } from '../data/site'
import { useReducedMotion } from '../hooks/useReducedMotion'
import {
  EASE_IN_OUT_CUBIC,
  HERO_DELAY,
  HERO_DURATION,
  reverseStagger,
} from '../lib/motion'

/**
 * Mirrors the original markup:
 *
 *   section.s-intro                     --gutter: 6rem, position: relative
 *     div.row.intro-content.wide        min-height 25.5 * --space, centered
 *       div.column                      full-width, carries the 6rem gutter
 *         .text-pretitle.with-line
 *         h1.text-huge-title
 *       ul.intro-social                 rotated rail, absolute to the section
 *     a.intro-scrolldown
 *
 * The 6rem gutter on .column is what sets the headline's left edge — it is
 * not a margin on the heading itself.
 *
 * The entrance is a horizontal slide (translateX 100 -> 0) with the title
 * staggered 400ms behind the pretitle, matching js/main.js.
 *
 * Two things are additions rather than ports. The rotated social rail and the
 * corner scroll arrow are both absolutely positioned against the right edge
 * and both were simply hidden below 800px, which left the phone hero with no
 * social links and no scroll cue at all — so there is a second, in-flow set
 * of each for that breakpoint. And the whole block is scroll-linked: it drifts
 * up and fades as the About section arrives, rather than sliding rigidly out
 * of frame.
 */
export function Intro() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  const scrollToAbout = (event) => {
    event.preventDefault()
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  // 'start start' → 'end start': progress runs 0 → 1 over exactly the distance
  // it takes to scroll the hero off the top. Fading out over that span means
  // the hero is gone right as it leaves, never a moment before or after.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90])
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, reduced ? 1 : 0]
  )
  const cueOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  const slideIn = (delay) => ({
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: HERO_DURATION, delay, ease: EASE_IN_OUT_CUBIC },
  })

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative [--gutter:6rem] max-lg:[--gutter:3rem] max-md:[--gutter:2rem]"
    >
      {/* svh, not vh: on iOS Safari `vh` is measured against the *expanded*
          URL bar, so a 100vh hero is always taller than the visible viewport
          and the scroll cue sits below the fold on first paint. */}
      <motion.div
        className="row row--wide min-h-[calc(25.5*var(--space))] items-center justify-center pb-(--vspace-3) pt-[calc(16vh+var(--header-height))] max-md:min-h-[100svh] max-md:pb-(--vspace-4) max-md:pt-[calc(var(--header-height)+var(--vspace-3))]"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="column">
          {/* The -6rem transform on .text-pretitle--line is what pulls the
              rule out into the gutter; keep it off the animated element so
              the two transforms don't fight. */}
          <motion.div {...slideIn(HERO_DELAY.pretitle)}>
            <div className="text-pretitle text-pretitle--line">Welcome</div>
          </motion.div>

          <motion.h1
            className="text-huge-title pr-[5vw] max-md:pr-0"
            {...slideIn(HERO_DELAY.title)}
          >
            Hi, I&apos;m Faizan
            <br />
            <span className="relative inline-block">
              {site.roles.map((role, index) => (
                <Fragment key={role}>
                  {/* The original had a newline between these two inline-block
                      spans, which renders as a word space. JSX drops it, so it
                      is put back explicitly. */}
                  {index > 0 && ' '}
                  <span className="role-word" style={{ animationDelay: `${index * 0.5}s` }}>
                    {role}
                  </span>
                </Fragment>
              ))}
            </span>
          </motion.h1>

          {/* ---- mobile social row (< 800px) ---- */}
          <ul className="mt-(--vspace-1) hidden list-none flex-wrap gap-3 p-0 max-md:flex">
            {socials.map(({ label, url, icon }, index) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: HERO_DURATION,
                  delay: HERO_DELAY.social + index * 0.08,
                  ease: EASE_IN_OUT_CUBIC,
                }}
              >
                <motion.a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileTap={reduced ? undefined : { scale: 0.9 }}
                  className="tap-target flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-(length:--text-xs) uppercase tracking-[.2em] text-content-light transition-colors duration-300 active:border-accent/50 active:text-accent"
                >
                  <Icon name={icon} className="size-[1.6rem]" />
                  {label}
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* desktop vertical social rail — hidden below 800px, same as the
          original. The list is rotated -90deg, so each item's translateX
          reads as a vertical rise on screen. */}
      <ul className="absolute left-[calc(100%-6rem)] top-1/2 z-1 m-0 flex origin-bottom-left list-none p-0 pl-[9.6rem] text-[1rem] font-normal uppercase tracking-[.3em] max-xl:left-[calc(100%-4rem)] max-md:hidden [transform:rotate(-90deg)_translateX(-50%)]">
        {socials.map(({ label, url }, index) => (
          <motion.li
            key={label}
            className="px-[1.2rem]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: HERO_DURATION,
              delay: HERO_DELAY.social + reverseStagger(index, socials.length),
              ease: EASE_IN_OUT_CUBIC,
            }}
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-content-light hover:text-white"
            >
              {label}
            </a>
          </motion.li>
        ))}
      </ul>

      {/* desktop scroll cue — corner-anchored, as designed */}
      <ScrollCue
        onClick={scrollToAbout}
        style={{ opacity: cueOpacity }}
        className="absolute bottom-[4.8rem] right-[5.8rem] size-(--vspace-1) max-xl:right-[4rem] max-md:hidden"
      />

      {/* mobile scroll cue — centred in the gutter under the content, where a
          thumb can actually reach it */}
      <ScrollCue
        onClick={scrollToAbout}
        style={{ opacity: cueOpacity }}
        withRing
        className="absolute bottom-(--vspace-1_25) left-1/2 hidden size-12 -translate-x-1/2 max-md:flex"
      />
    </section>
  )
}

/**
 * Three nested elements because three animations own the same properties and
 * would otherwise overwrite each other: the outer div holds the scroll-linked
 * fade (a MotionValue in `style` takes ownership of that property), the anchor
 * runs the one-shot entrance, and the inner span runs the endless bob.
 */
function ScrollCue({ onClick, className = '', style, withRing = false }) {
  return (
    <motion.div className={className} style={style}>
      <motion.a
        href="#about"
        onClick={onClick}
        title="Scroll down to About section"
        aria-label="Scroll to About"
        className={`group flex size-full items-center justify-center ${
          withRing
            ? 'rounded-full border border-white/15 bg-white/5 backdrop-blur-sm active:border-accent/60'
            : ''
        }`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: HERO_DURATION,
          delay: HERO_DELAY.scrolldown,
          ease: EASE_IN_OUT_CUBIC,
        }}
      >
        <motion.span
          className="flex items-center justify-center"
          animate={{ y: [0, 7, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: HERO_DELAY.scrolldown + HERO_DURATION,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-(--vspace-0_75) fill-white transition-colors duration-300 group-hover:fill-accent"
          >
            <path d="M12 21.793l-7.481-9 .764-.646 6.237 7.531v-21.884h1v21.884l6.236-7.53.764.645-7.52 9z" />
          </svg>
        </motion.span>
      </motion.a>
    </motion.div>
  )
}
