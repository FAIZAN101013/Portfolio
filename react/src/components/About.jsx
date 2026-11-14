import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Marquee } from './Marquee'
import { Reveal } from './Reveal'
import { Button } from './Button'
import { aboutParagraphs, experience, site, skillGroups } from '../data/site'
import { asset } from '../lib/asset'
import { useParallax } from '../hooks/useParallax'
import { skills } from '../data/skills'

const MARQUEE_WORDS = skills.map((skill) => skill.name)

/**
 * .about-info is an edge-to-edge row (--gutter: 0, width: 100%) split 50/50.
 * The portrait sits inset from the page edge inside the left half, cropped
 * square, with a thin accent frame offset behind its bottom-right corner.
 */
export function About() {
  const photoRef = useRef(null)
  // Modest travel: the portrait sits in a fixed-height column, so anything
  // larger would visibly slide against its own frame.
  const photoY = useParallax(photoRef, 34)

  return (
    <section id="about" className="pb-(--vspace-3) pt-(--vspace-4)">
      <div className="row row--full items-center max-xl:mx-auto max-xl:w-[92%] max-xl:max-w-[800px]">
        <div className="column col-6 max-xl:w-full">
          <Reveal y={30}>
            <div className="relative ml-20 max-w-[490px] max-xl:ml-0 max-xl:mr-4 max-xl:max-w-full">
              {/* Offset outline behind the photo's bottom-right corner. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-4 translate-y-5 border border-accent/60"
              />
              {/* The clip is what makes the parallax read as depth rather than
                  as the image drifting out of place: the frame stays put and the
                  photograph moves inside it. */}
              <div ref={photoRef} className="relative overflow-hidden">
                <motion.img
                  src={asset(site.photo)}
                  alt="Faizan Patel"
                  width="481"
                  height="481"
                  loading="lazy"
                  decoding="async"
                  style={{ y: photoY }}
                  className="block aspect-square w-full scale-[1.12] object-cover align-bottom"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="column col-6 max-xl:w-full">
          <div className="py-(--vspace-3_5) pb-(--vspace-2) pr-[10vw] max-2xl:py-(--vspace-2) max-2xl:pb-(--vspace-1_5) max-2xl:pr-32 max-xl:p-0 max-xl:pt-(--vspace-1)">
            <Reveal as="h2" className="text-pretitle text-pretitle--line mb-(--vspace-1)">
              About
            </Reveal>

            <div className="attention-getter">
              {aboutParagraphs.map((html, index) => (
                <Reveal
                  key={index}
                  as="p"
                  delay={0.08 * index}
                  className="mb-(--vspace-1\_25) last:mb-0"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ))}
            </div>

            <Reveal delay={0.3}>
              <Button
                href={site.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                magnetic
                className="mb-0 mt-(--vspace-1)"
              >
                Download CV
              </Button>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Full-bleed ticker between the bio and the skills. Purely decorative —
          the same names are listed, readably, in the section below — so it is
          aria-hidden inside Marquee. */}
      <div className="mt-(--vspace-2) border-y border-hairline py-(--vspace-0_75) max-md:mt-(--vspace-1_5)">
        <Marquee baseVelocity={2.4} className="mask-fade-x">
          {MARQUEE_WORDS.map((word) => (
            <span
              key={word}
              className="flex items-center whitespace-nowrap font-display text-(length:--text-xxl) leading-none text-white/15 max-md:text-(length:--text-xl)"
            >
              {word}
              <span className="mx-8 inline-block size-2 shrink-0 rounded-full bg-accent/50 max-md:mx-5" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Skills as four short lines and experience as three rows. The
          20-tile logo wall and the two-column timeline were a full screen each
          and said less than this does. Education lives in the CV. */}
      <div id="skills" className="row scroll-mt-(--header-height) pt-(--vspace-2)">
        <div className="column col-6 max-lg:w-full">
          <Reveal as="h2" className="text-pretitle">
            Skills
          </Reveal>
          <dl className="m-0 mt-(--vspace-0_75) grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 max-xs:grid-cols-1 max-xs:gap-y-1">
            {skillGroups.map(({ label, items }) => (
              <Reveal key={label} as="div" className="contents">
                <dt className="text-(length:--text-xs) font-medium uppercase leading-(--vspace-0_75) tracking-[0.18em] text-accent max-xs:mt-3">
                  {label}
                </dt>
                <dd className="m-0 text-(length:--text-sm) leading-(--vspace-0_75) text-content">
                  {items}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <div className="column col-6 max-lg:w-full max-lg:pt-(--vspace-1_5)">
          <Reveal as="h2" className="text-pretitle">
            Experience
          </Reveal>
          <ol className="m-0 mt-(--vspace-0_75) list-none divide-y divide-white/10 p-0">
            {experience.map((entry, index) => (
              <Reveal key={entry.title} as="li" delay={0.06 * index} className="py-4 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-display text-(length:--text-md) text-white">
                    {entry.title}
                  </span>
                  <span className="text-(length:--text-xs) uppercase tracking-[0.15em] text-content-light">
                    {entry.meta}
                  </span>
                </div>
                <p className="m-0 mt-1 text-(length:--text-sm) leading-(--vspace-0_75) text-content">
                  {entry.desc}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
