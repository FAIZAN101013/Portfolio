import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Marquee } from './Marquee'
import { Reveal } from './Reveal'
import { Skills } from './Skills'
import { Timelines } from './Timelines'
import { Button } from './Button'
import { aboutParagraphs, site } from '../data/site'
import { asset } from '../lib/asset'
import { useParallax } from '../hooks/useParallax'
import { skills } from '../data/skills'

const MARQUEE_WORDS = skills.map((skill) => skill.name)

/**
 * .about-info is an edge-to-edge row (--gutter: 0, width: 100%) split 50/50.
 * The portrait renders at its natural size inside the left half — it is not
 * stretched — and the text column pulls back over it by 4rem.
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
            {/* The clip is what makes the parallax read as depth rather than
                as the image drifting out of place: the frame stays put and the
                photograph moves inside it. */}
            <div ref={photoRef} className="overflow-hidden">
              <motion.img
                src={asset(site.photo)}
                alt="Faizan Patel"
                width="481"
                height="641"
                loading="lazy"
                decoding="async"
                style={{ y: photoY }}
                className="block max-w-full scale-[1.12] object-cover align-bottom max-xl:w-full"
              />
            </div>
          </Reveal>
        </div>

        <div className="column col-6 max-xl:w-full">
          <div className="-ml-16 py-(--vspace-3_5) pb-(--vspace-2) pr-[10vw] max-2xl:py-(--vspace-2) max-2xl:pb-(--vspace-1_5) max-2xl:pr-32 max-xl:ml-0 max-xl:p-0 max-xl:pt-(--vspace-1)">
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
                fullWidth
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

      <Skills />
      <Timelines />
    </section>
  )
}
