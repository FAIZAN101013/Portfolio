import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { site, socials } from '../data/site'
import {
  EASE_IN_OUT_CUBIC,
  HERO_DELAY,
  HERO_DURATION,
  reverseStagger,
} from '../lib/motion'

/**
 * Mirrors the original markup exactly:
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
 */
export function Intro() {
  const scrollToAbout = (event) => {
    event.preventDefault()
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const slideIn = (delay) => ({
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: HERO_DURATION, delay, ease: EASE_IN_OUT_CUBIC },
  })

  return (
    <section
      id="intro"
      className="relative [--gutter:6rem] max-lg:[--gutter:3rem] max-md:[--gutter:2rem]"
    >
      <div className="row row--wide min-h-[calc(25.5*var(--space))] items-center justify-center pb-(--vspace-3) pt-[calc(16vh+var(--header-height))] max-md:min-h-[calc(20*var(--space))] max-md:pt-[calc(12vh+var(--header-height))]">
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
        </div>
      </div>

      {/* vertical social rail — hidden below 800px, same as the original.
          The list is rotated -90deg, so each item's translateX reads as a
          vertical rise on screen. */}
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

      <motion.a
        href="#about"
        onClick={scrollToAbout}
        title="Scroll down to About section"
        aria-label="Scroll to About"
        className="group absolute bottom-[4.8rem] right-[5.8rem] flex size-(--vspace-1) items-center justify-center max-xl:right-[4rem] max-md:hidden"
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
    </section>
  )
}
