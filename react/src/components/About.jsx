import { Reveal } from './Reveal'
import { Skills } from './Skills'
import { Timelines } from './Timelines'
import { aboutParagraphs, site } from '../data/site'
import { asset } from '../lib/asset'

/**
 * .about-info is an edge-to-edge row (--gutter: 0, width: 100%) split 50/50.
 * The portrait renders at its natural size inside the left half — it is not
 * stretched — and the text column pulls back over it by 4rem.
 */
export function About() {
  return (
    <section id="about" className="pb-(--vspace-3) pt-(--vspace-4)">
      <div className="row row--full items-center max-xl:mx-auto max-xl:w-[92%] max-xl:max-w-[800px]">
        <div className="column col-6 max-xl:w-full">
          <Reveal y={30}>
            <img
              src={asset(site.photo)}
              alt="Faizan Patel"
              width="481"
              height="641"
              loading="lazy"
              decoding="async"
              className="block max-w-full object-cover align-bottom max-xl:w-full"
            />
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
              <a
                href={site.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--medium btn--fullwidth mb-0 mt-(--vspace-1)"
              >
                Download CV
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      <Skills />
      <Timelines />
    </section>
  )
}
