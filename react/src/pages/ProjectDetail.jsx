import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { Button } from '../components/Button'
import { MediaGallery } from '../components/MediaGallery'
import { Reveal } from '../components/Reveal'
import { Disclosure } from '../components/Disclosure'
import { Scene } from '../components/FlowScenes'
import { getProjectById, projects } from '../data/projects'
import { asset } from '../lib/asset'
import { useSeo } from '../lib/seo'
import { useMediaQuery } from '../hooks/useMediaQuery'

/**
 * One detail page for every project, design or development.
 *
 * Replaces both design-project.html and the old lightbox modal: the two card
 * types now open the same layout, so the reading experience is identical
 * whichever tab you came from. Sections render only when the project carries
 * that data, which is what lets one template serve both shapes.
 */
export function ProjectDetail() {
  const { id } = useParams()
  const project = getProjectById(id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [project])

  const firstImage = project?.media?.find((m) => m.type === 'image')?.src
  useSeo({
    title: project ? project.title : 'Project not found',
    description: project
      ? `${project.category}: ${String(project.description || '').replace(/<[^>]+>/g, '').slice(0, 155)}`
      : undefined,
    path: project ? `/project/${project.id}` : '/',
    image: firstImage,
    noindex: !project,
  })

  if (!project) {
    return (
      <main className="row flex-1 pb-(--vspace-3) pt-[calc(var(--header-height)+var(--vspace-2))]">
        <div className="column col-12">
          <h1 className="text-h1 mt-0">Project not found</h1>
          <p className="mb-(--vspace-1)">
            That project doesn&apos;t exist — it may have been renamed.
          </p>
          <BackLink />
        </div>
      </main>
    )
  }

  const isDesign = project.tags.includes('design')
  const siblings = projects.filter((p) => p.tags.includes(isDesign ? 'design' : 'project'))
  const position = siblings.findIndex((p) => p.id === project.id)
  const previous = siblings[position - 1]
  const next = siblings[position + 1]

  if (isDesign) {
    return <DesignDetail project={project} previous={previous} next={next} />
  }

  const chips = isDesign ? project.tools : project.techStack
  const chipsLabel = isDesign ? 'Tools' : 'Tech Stack'
  const result = project.result || project.learning
  const isFreelance = project.tags.includes('freelance')
  const brief = project.brief || firstSentences(project.description || '', 2)
  const facts = project.facts || {
    Role: isFreelance ? 'Sole developer, design to deploy' : 'Personal project',
    Stack: (project.techStack || []).slice(0, 4).join(', '),
    Status: project.liveDemo ? 'Live' : 'Code on GitHub',
  }
  const actions = (
    <>
      {project.codeLinks ? (
        <ActionMenu label="View Project" items={project.codeLinks} />
      ) : (
        project.githubLink && <ActionButton href={project.githubLink}>View Project</ActionButton>
      )}
      {project.liveLinks ? (
        <ActionMenu label="Live sites" items={project.liveLinks} variant="stroke" />
      ) : (
        project.liveDemo && (
          <ActionButton href={project.liveDemo} variant="stroke">
            {isFreelance ? 'Live site' : 'Live demo'}
          </ActionButton>
        )
      )}
      {project.prototypeLink && (
        <ActionButton href={project.prototypeLink} variant="stroke">
          View Figma Prototype
        </ActionButton>
      )}
      {project.related && <RelatedButton related={project.related} />}
    </>
  )

  return (
    <main className="row flex-1 pb-(--vspace-3) pt-[calc(var(--header-height)+var(--vspace-1\_5))]">
      <div className="column col-12">
        <Reveal y={12}>
          <BackLink />
        </Reveal>

        {/* ---------- title ---------- */}
        <header className="mt-(--vspace-1) border-b border-hairline pb-(--vspace-1)">
          <Reveal as="p" className="text-pretitle text-pretitle--line mb-(--vspace-0_5)">
            {project.category}
          </Reveal>
          <Reveal as="h1" className="text-h1 mb-0 mt-0" delay={0.05}>
            {project.title}
          </Reveal>

          {brief && (
            <Reveal
              as="p"
              delay={0.1}
              className="mb-0 mt-(--vspace-0_75) max-w-[64ch] text-(length:--text-lg) leading-(--vspace-1_25) text-content [&_a]:text-white [&_a]:underline [&_a]:underline-offset-2"
              dangerouslySetInnerHTML={{ __html: brief }}
            />
          )}

          <Reveal delay={0.15} className="mt-(--vspace-1)">
            <dl className="m-0 grid grid-cols-4 gap-x-8 gap-y-5 border-t border-hairline pt-(--vspace-0_75) max-lg:grid-cols-2 max-xs:grid-cols-1">
              {Object.entries(facts).map(([label, value]) => (
                <div key={label}>
                  <dt className="text-(length:--text-xs) font-medium tracking-(--tracking-label) text-accent">
                    {label}
                  </dt>
                  <dd className="m-0 mt-1 text-(length:--text-md) leading-(--vspace-1) text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal
            delay={0.2}
            className="mt-(--vspace-0_75) flex flex-wrap items-center gap-2 max-xs:flex-col max-xs:items-stretch"
          >
            {actions}
          </Reveal>
        </header>

        <MediaGallery media={project.media} title={project.title} />

        {/* ---------- narrative ---------- */}
        <div className="mt-(--vspace-2) grid grid-cols-2 gap-x-(--vspace-2) gap-y-(--vspace-1_25) max-lg:grid-cols-1">
          <Section title="The problem">{project.problemStatement}</Section>
          <Section title="What shipped">{result}</Section>
        </div>

        {project.techStack?.length > 0 && (
          <Reveal className="mt-(--vspace-1_25)">
            <h2 className="text-pretitle mb-(--vspace-0_375) text-(length:--text-xs)">Built with</h2>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {project.techStack.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-white/10 px-4 py-1.5 text-(length:--text-xs) tracking-(--tracking-label) text-content"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {project.architecture && (
          <Disclosure summary="How it's built" className="mt-(--vspace-1_5)">
            <Architecture arch={project.architecture} />
          </Disclosure>
        )}

        {project.features?.length > 0 && (
          <Disclosure summary={`Key features (${project.features.length})`} className="mt-(--vspace-1)">
          <section className="mt-(--vspace-2) max-md:mt-0">
            <Reveal as="h2" className="text-pretitle max-md:hidden">
              Key Features
            </Reveal>
            <ul className="m-0 mt-(--vspace-0_75) grid list-none grid-cols-2 gap-x-(--vspace-1_25) gap-y-(--vspace-0_5) p-0 max-lg:grid-cols-1">
              {project.features.map((feature, index) => (
                <Reveal
                  as="li"
                  key={feature}
                  delay={index * 0.05}
                  className="relative pl-10 text-(length:--text-md) leading-(--vspace-1) text-content transition-colors duration-300 hover:text-white"
                >
                  <svg
                    className="absolute left-0 top-[0.35em] size-5 shrink-0 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </Reveal>
              ))}
            </ul>
          </section>
          </Disclosure>
        )}

        {project.wireframes?.length > 0 && (
          <ImageBlock title="Wireframes" sources={project.wireframes} alt="Wireframe" />
        )}

        {project.researchImages?.length > 0 && (
          <ImageBlock
            title="Research"
            sources={project.researchImages}
            alt="Research artefact"
          />
        )}

        {project.embedUrl && (
          <section className="mt-(--vspace-2)">
            <Reveal as="h2" className="text-pretitle">
              Hi-Fi Prototype
            </Reveal>
            <Reveal className="mt-(--vspace-0_75) overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <iframe
                title={`${project.title} prototype`}
                src={project.embedUrl}
                allowFullScreen
                loading="lazy"
                className="block h-[560px] w-full max-lg:h-[420px] max-sm:h-[300px]"
              />
            </Reveal>
          </section>
        )}

        <Reveal className="mt-(--vspace-2) flex flex-wrap items-center gap-2 max-xs:flex-col max-xs:items-stretch">
          {actions}
        </Reveal>

        {/* ---------- prev / next ---------- */}
        {(previous || next) && (
          <nav
            aria-label="Project navigation"
            className="mt-(--vspace-2) flex items-stretch gap-2 border-t border-hairline pt-(--vspace-1) max-sm:flex-col"
          >
            <PagerLink project={previous} direction="prev" />
            <PagerLink project={next} direction="next" />
          </nav>
        )}
      </div>
    </main>
  )
}

/* =========================================================================
   Design case study layout. Reads in the order a design review happens:
   what it is, the facts, the screens, the problem and the decision, then
   the process work, then the live prototype. Only rows with data render.
   ========================================================================= */

const stripHtml = (html = '') => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
const firstSentences = (text = '', n = 2) => {
  const parts = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text]
  return parts.slice(0, n).join(' ').replace(/\s+/g, ' ').trim()
}
const firstSentence = (text = '') => {
  const m = text.match(/^.*?[.!?](\s|$)/)
  return (m ? m[0] : text).trim()
}

function DesignDetail({ project, previous, next }) {
  const brief = project.brief || firstSentence(stripHtml(project.description))
  const imageCount = project.media.filter((m) => m.type === 'image').length
  const facts = project.facts || {
    Role: 'UI/UX designer',
    Tools: (project.tools || ['Figma']).join(', '),
    Deliverables: `${imageCount} screen${imageCount === 1 ? '' : 's'}, prototype`,
  }
  const decision = project.decision || project.result || project.learning

  // Process blocks: explicit `process` wins; otherwise build from the legacy
  // research / wireframes fields so older entries still get a section.
  const process =
    project.process ||
    [
      project.research || project.researchImages?.length
        ? { title: 'Research', text: project.research, images: project.researchImages || [] }
        : null,
      project.wireframes?.length ? { title: 'Wireframes', images: project.wireframes } : null,
    ].filter(Boolean)

  return (
    <main className="row flex-1 pb-(--vspace-3) pt-[calc(var(--header-height)+var(--vspace-1\_5))]">
      <div className="column col-12">
        <Reveal y={12}>
          <BackLink />
        </Reveal>

        {/* ---------- title + brief ---------- */}
        <header className="mt-(--vspace-1)">
          <Reveal as="p" className="text-pretitle text-pretitle--line mb-(--vspace-0_5)">
            {project.category}
          </Reveal>
          <Reveal as="h1" className="text-h1 mb-0 mt-0" delay={0.05}>
            {project.title}
          </Reveal>
          {brief && (
            <Reveal
              as="p"
              delay={0.1}
              className="mb-0 mt-(--vspace-0_75) max-w-[62ch] text-(length:--text-lg) leading-(--vspace-1_25) text-content"
            >
              {brief}
            </Reveal>
          )}

          {/* facts strip */}
          <Reveal delay={0.15} className="mt-(--vspace-1)">
            <dl className="m-0 grid grid-cols-4 gap-x-8 gap-y-5 border-y border-hairline py-(--vspace-0_75) max-lg:grid-cols-2 max-xs:grid-cols-1">
              {Object.entries(facts).map(([label, value]) => (
                <div key={label}>
                  <dt className="text-(length:--text-xs) font-medium tracking-(--tracking-label) text-accent">
                    {label}
                  </dt>
                  <dd className="m-0 mt-1 text-(length:--text-md) leading-(--vspace-1) text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* actions, up top where a visitor who only wants the file finds them */}
          <Reveal
            delay={0.2}
            className="mt-(--vspace-0_75) flex flex-wrap items-center gap-2 max-xs:flex-col max-xs:items-stretch"
          >
            {project.prototypeLink && (
              <ActionButton href={project.prototypeLink}>Open in Figma</ActionButton>
            )}
            {project.liveDemo && (
              <ActionButton href={project.liveDemo} variant="stroke">
                Live Site
              </ActionButton>
            )}
            {project.githubLink && (
              <ActionButton href={project.githubLink} variant="stroke">
                Code
              </ActionButton>
            )}
            {project.downloads?.map((d) => (
              <ActionButton key={d.url} href={d.url} variant="stroke">
                {d.label}
              </ActionButton>
            ))}
            {project.related && <RelatedButton related={project.related} />}
          </Reveal>
        </header>

        {/* ---------- the screens ---------- */}
        <MediaGallery media={project.media} title={project.title} />

        {/* ---------- problem / decision ---------- */}
        <div className="mt-(--vspace-2) grid grid-cols-2 gap-x-(--vspace-2) gap-y-(--vspace-1_25) max-lg:grid-cols-1">
          <Section title="The problem">{project.problemStatement}</Section>
          <Section title="What I decided">{decision}</Section>
        </div>

        {project.techStack?.length > 0 && (
          <Reveal className="mt-(--vspace-1_25)">
            <h2 className="text-pretitle mb-(--vspace-0_375) text-(length:--text-xs)">Built with</h2>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {project.techStack.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-white/10 px-4 py-1.5 text-(length:--text-xs) tracking-(--tracking-label) text-content"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {process.length > 1 && <DesignFlow project={project} process={process} />}

        {/* ---------- process ---------- */}
        {process.length > 0 && (
          <section className="mt-(--vspace-2) border-t border-hairline pt-(--vspace-1_5)">
            <Reveal as="h2" className="text-pretitle">
              Process
            </Reveal>
            <div className="mt-(--vspace-1) space-y-(--vspace-2)">
              {process.map((block, index) => (
                <ProcessBlock key={block.title} block={block} index={index} id={`process-${index}`} />
              ))}
            </div>
          </section>
        )}

        {/* ---------- prototype ---------- */}
        {project.embedUrl && (
          <section className="mt-(--vspace-2)">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <Reveal as="h2" className="text-pretitle mb-0">
                Live prototype
              </Reveal>
              {project.prototypeLink && (
                <a
                  href={project.prototypeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(length:--text-xs) tracking-(--tracking-label) text-content-light transition-colors hover:text-accent"
                >
                  Not loading? Open it in Figma →
                </a>
              )}
            </div>
            <Reveal className="mt-(--vspace-0_75) overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <iframe
                title={`${project.title} prototype`}
                src={project.embedUrl}
                allowFullScreen
                loading="lazy"
                className="block h-[640px] w-full max-lg:h-[460px] max-sm:h-[320px]"
              />
            </Reveal>
          </section>
        )}

        {(previous || next) && (
          <nav
            aria-label="Project navigation"
            className="mt-(--vspace-2) flex items-stretch gap-2 border-t border-hairline pt-(--vspace-1) max-sm:flex-col"
          >
            <PagerLink project={previous} direction="prev" />
            <PagerLink project={next} direction="next" />
          </nav>
        )}
      </div>
    </main>
  )
}

/** One step of the process: a heading, a sentence, then the artefacts large
 *  enough to read. One image spans the width; more sit two across. */
function ProcessBlock({ block, index, id }) {
  const images = block.images || []
  return (
    <Reveal as="article" id={id} delay={index * 0.05} className="process-block scroll-mt-[calc(var(--header-height)+1rem)] grid grid-cols-[20rem_1fr] gap-x-(--vspace-2) max-xl:grid-cols-[16rem_1fr] max-lg:grid-cols-1 max-lg:gap-y-(--vspace-0_5)">
      <div>
        <span className="block text-(length:--text-xs) tracking-(--tracking-label) text-accent">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="m-0 mt-1 font-display text-(length:--text-lg) leading-tight text-white">
          {block.title}
        </h3>
      </div>
      <div className="min-w-0">
        {block.text && (
          <p className="mb-0 max-w-[62ch] text-(length:--text-md) leading-(--vspace-1) text-content">
            {block.text}
          </p>
        )}
        {images.length > 0 && (
          <div
            className={`mt-(--vspace-0_75) grid gap-4 ${
              images.length === 1 ? 'grid-cols-1' : 'grid-cols-2 max-md:grid-cols-1'
            }`}
          >
            {images.map((img) => {
              const src = typeof img === 'string' ? img : img.src
              const caption = typeof img === 'string' ? '' : img.caption
              const scroll = typeof img !== 'string' && img.scroll
              return (
                <figure key={src} className="m-0">
                  {/* Full-page captures are thousands of pixels tall; a
                      scrollable frame keeps them readable and keeps the
                      in-view reveal from waiting on an element that never
                      fits the viewport. */}
                  <span
                    className={`block overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] ${
                      scroll ? 'max-h-[75vh] overflow-y-auto overscroll-contain' : ''
                    }`}
                  >
                    <img
                      src={asset(src)}
                      alt={caption || block.title}
                      loading="lazy"
                      decoding="async"
                      className="block w-full object-contain"
                    />
                  </span>
                  {scroll && (
                    <span className="mt-1 block text-(length:--text-xs) tracking-(--tracking-label) text-content-light/70">
                      Scroll inside to see the whole page
                    </span>
                  )}
                  {caption && (
                    <figcaption className="mt-2 text-(length:--text-xs) text-content-light">
                      {caption}
                    </figcaption>
                  )}
                </figure>
              )
            })}
          </div>
        )}
      </div>
    </Reveal>
  )
}

/** Architecture: the request flow as a chain, the layers with what each
 *  uses, and the decisions that shaped them. Only the parts given render. */
/**
 * The flow as a sequence of event cards, dealt out one per step as the
 * section scrolls into view. Each card is a moment ("Visitor fills the form",
 * "Mail lands in the inbox") with a scene showing it, a line of real detail,
 * and the layer plus tools in the footer. The last card is the outcome.
 * Scenarios replay a chosen path; tapping a card selects it. Phones get a
 * snap rail with the same cards.
 */
function Flow({ title, summary, flowLabel, flow, details, outcome, images, layers, decisions, scenarios, onStep, layerFor, diagram }) {
  const ref = useRef(null)
  const vertical = useMediaQuery('(max-width: 800px)')
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const [revealed, setRevealed] = useState(0)
  const [active, setActive] = useState(null)
  const [path, setPath] = useState(null)
  const timer = useRef(null)
  const railRef = useRef(null)
  const total = flow.length + (outcome ? 1 : 0)

  const nodeOf = []
  flow.forEach((step, i) => {
    const l = layerFor(step)
    nodeOf[i] = l >= 0 ? l : i > 0 ? nodeOf[i - 1] : 0
  })


  const stop = () => clearTimeout(timer.current)
  const play = (indexes) => {
    stop()
    setPath(indexes)
    if (indexes) setRevealed(total)
    const run = indexes || flow.map((_, i) => i)
    let k = 0
    const tick = () => {
      setActive(run[k])
      setRevealed((r) => Math.max(r, run[k] + 1))
      k += 1
      if (k < run.length) timer.current = setTimeout(tick, 1400)
      else {
        setRevealed(total)
        timer.current = setTimeout(() => setPath(null), 1400)
      }
    }
    tick()
  }

  useEffect(() => {
    if (inView && active === null) play(null)
    return stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  useEffect(() => {
    if (active == null) return
    if (onStep) onStep(active)
    const el = railRef.current?.children[active]
    if (el && railRef.current) {
      const rail = railRef.current
      rail.scrollTo({ left: el.offsetLeft - (rail.clientWidth - el.clientWidth) / 2, behavior: 'smooth' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const inPath = (i) => !path || path.includes(i)

  const cards = flow.map((step, i) => ({ step, i, layer: layers[nodeOf[i]], detail: details?.[i], image: images?.[i] }))

  return (
    <section ref={ref} className="mt-(--vspace-2) border-t border-hairline pt-(--vspace-1_5)">
      <Reveal as="h2" className="text-pretitle">
        {title}
      </Reveal>
      {summary && (
        <Reveal as="p" delay={0.05} className="mb-0 mt-(--vspace-0_5) max-w-[64ch] text-(length:--text-md) leading-(--vspace-1) text-content">
          {summary}
        </Reveal>
      )}

      {diagram && layers.length > 0 && <ArchDiagram layers={layers} />}

      {scenarios?.length > 0 && (
        <div className="mt-(--vspace-1) flex flex-wrap items-center gap-2">
          <span className="mr-1 text-(length:--text-xs) tracking-(--tracking-label) text-content-light">Play</span>
          {[...scenarios, { label: 'Whole flow', steps: null }].map((sc) => (
            <button
              key={sc.label}
              type="button"
              onClick={() => play(sc.steps)}
              className={`rounded-full border px-4 py-1.5 text-(length:--text-xs) transition-colors ${
                path === sc.steps && path !== null ? 'border-accent bg-accent text-black' : 'border-white/15 text-white hover:border-accent/60'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      )}

      {flow.length > 0 && (
        <div className="mt-(--vspace-1)">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-pretitle mb-(--vspace-0_375) text-(length:--text-xs)">{flowLabel}</h3>
            <span className="text-(length:--text-xs) text-content-light">{vertical ? 'Swipe through' : 'Scroll sideways or tap a card'}</span>
          </div>

          <ol
            ref={railRef} className="snap-rail no-scrollbar m-0 flex list-none gap-3 p-0 pb-2 [&>*]:snap-card [&>*]:shrink-0 [&>*]:w-[300px] max-md:-mx-[4vw] max-md:px-[4vw] max-md:[&>*]:w-[82vw]"

          >
            {cards.map(({ step, i, layer, detail, image }) => {
              const dealt = i < revealed
              const on = active === i
              const dim = path && !inPath(i)
              return (
                <motion.li
                  key={step}
                  initial={false}
                  animate={dealt ? { opacity: dim ? 0.35 : 1, y: 0, rotate: 0, scale: 1 } : { opacity: 0, y: 28, rotate: -1.5, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      stop()
                      setPath(null)
                      setActive(i)
                    }}
                    className={`flex h-full w-full flex-col rounded-lg border p-3 text-left transition-colors duration-300 ${on ? 'border-accent bg-accent/10' : 'border-white/10 bg-white/[0.02] hover:border-accent/50'}`}
                  >
                    <span className="mb-2 flex items-baseline justify-between text-(length:--text-xs)">
                      <span className={on ? 'text-accent' : 'text-content-light'}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-content-light">{layer?.title}</span>
                    </span>
                    {image ? (
                      <span className="block aspect-[16/9] w-full overflow-hidden rounded-md border border-white/10 bg-black/5">
                        <img src={image} alt="" className="size-full object-cover object-top" loading="lazy" />
                      </span>
                    ) : (
                      layer && <Scene layer={layer} label={step} step={on ? `${active}-${path ? 'p' : 's'}` : 'idle'} />
                    )}
                    <span className={`mt-3 block font-display text-(length:--text-md) leading-tight ${on ? 'text-accent' : 'text-white'}`}>{step}</span>
                    {detail && <span className="mt-1.5 block text-(length:--text-xs) leading-(--vspace-0_75) text-content">{detail}</span>}
                    {layer?.items?.length > 0 && (
                      <span className="mt-auto flex flex-wrap gap-1 pt-3">
                        {layer.items.map((item) => (
                          <span key={item} className={`rounded-full border px-2 py-0.5 text-[11px] ${on ? 'border-accent/60 text-white' : 'border-white/10 text-white/70'}`}>
                            {item}
                          </span>
                        ))}
                      </span>
                    )}
                  </button>
                </motion.li>
              )
            })}
            {outcome && (
              <motion.li
                initial={false}
                animate={revealed >= total ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-full flex-col justify-end rounded-lg border border-accent bg-accent p-4 text-black">
                  <span className="text-(length:--text-xs) tracking-(--tracking-label) opacity-70">Outcome</span>
                  <span className="mt-2 block font-display text-(length:--text-lg) leading-tight">{outcome}</span>
                </div>
              </motion.li>
            )}
          </ol>
        </div>
      )}

      {decisions?.length > 0 && (
        <Reveal delay={0.15} className="mt-(--vspace-1)">
          <h3 className="text-pretitle mb-(--vspace-0_375) text-(length:--text-xs)">Decisions</h3>
          <ul className="m-0 grid list-none grid-cols-2 gap-x-(--vspace-1_25) gap-y-(--vspace-0_5) p-0 max-lg:grid-cols-1">
            {decisions.map((d) => (
              <li key={d} className="relative pl-6 text-(length:--text-md) leading-(--vspace-1) text-content before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-accent">
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  )
}


/** Static architecture diagram: one box per layer, joined in order. Reads
 *  left to right on desktop and top to bottom on phones. */
function ArchDiagram({ layers }) {
  return (
    <Reveal delay={0.08} className="mt-(--vspace-1)">
      <h3 className="text-pretitle mb-(--vspace-0_375) text-(length:--text-xs)">Architecture</h3>
      <ol className="m-0 flex list-none items-stretch gap-0 p-0 max-md:grid max-md:grid-cols-2 max-md:gap-2">
        {layers.map((layer, i) => (
          <li key={layer.title} className="flex min-w-0 flex-1 items-stretch">
            <div className="flex min-w-0 flex-1 flex-col rounded-lg border border-white/15 bg-white/[0.03] p-4 max-md:p-3">
              <span className="text-(length:--text-xs) tracking-(--tracking-label) text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="mt-1 font-display text-(length:--text-md) text-white">{layer.title}</span>
              {layer.items?.length > 0 && (
                <span className="mt-2 flex flex-wrap gap-1">
                  {layer.items.map((item) => (
                    <span key={item} className="rounded border border-white/10 px-1.5 py-0.5 text-[11px] text-white/80">{item}</span>
                  ))}
                </span>
              )}
            </div>
            {i < layers.length - 1 && (
              <span aria-hidden className="flex w-8 shrink-0 items-center justify-center text-accent max-md:hidden">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h16M14 6l6 6-6 6" />
                </svg>
              </span>
            )}
          </li>
        ))}
      </ol>
    </Reveal>
  )
}

/** Code pages: layer match by keyword. */
const keywordLayer = (layers) => (step) => {
  const t = String(step).toLowerCase()
  return layers.findIndex((l) =>
    [l.title, ...(l.items || [])].some((w) => {
      const k = String(w).toLowerCase().split(/[\s(]/)[0]
      return k.length > 2 && t.includes(k)
    }),
  )
}

function Architecture({ arch }) {
  const layers = arch.layers || []
  return (
    <Flow
      title="How it's built"
      summary={arch.summary}
      flowLabel="Request flow"
      flow={arch.flow || []}
      details={arch.details}
      outcome={arch.outcome}
      layers={layers}
      decisions={arch.decisions}
      scenarios={arch.scenarios}
      layerFor={keywordLayer(layers)}
      diagram
    />
  )
}

/** Design pages: the process blocks are the flow; stepping scrolls to and
 *  highlights the matching block. */
function DesignFlow({ project, process }) {
  const flow = process.map((b) => b.title)
  const layers = project.designLayers || []
  const onStep = (i) => {
    const el = document.getElementById(`process-${i}`)
    if (!el) return
    document.querySelectorAll('[id^="process-"]').forEach((n) => n.classList.remove('process-lit'))
    el.classList.add('process-lit')
  }
  const layerFor = (step) => {
    const t = String(step).toLowerCase()
    return layers.findIndex((l) => (l.match || [l.title]).some((m) => t.includes(String(m).toLowerCase())))
  }
  return (
    <Flow
      title="How it's designed"
      summary={project.designSummary}
      flowLabel="Process"
      flow={flow}
      details={process.map((b) => b.text)}
      images={process.map((b) => (b.images?.[0]?.src ? asset(b.images[0].src) : null))}
      layers={layers}
      decisions={null}
      scenarios={null}
      onStep={onStep}
      layerFor={layerFor}
    />
  )
}

/** Internal link to the sibling entry: the design case study of a build, or
 *  the build of a design. Same button, different destination. */
function RelatedButton({ related }) {
  return (
    <Button to={`/project/${related.id}`} variant="stroke" withArrow className="btn--block-mobile">
      {related.label}
    </Button>
  )
}

function ActionButton({ href, variant, children }) {
  return (
    <Button
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      withArrow
      className="btn--block-mobile"
    >
      {children}
    </Button>
  )
}

/**
 * A button that opens a list of links on hover, focus or tap. Used when one
 * project spans several pages, so the visitor picks where to go.
 */
function ActionMenu({ label, items, variant }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="relative max-xs:w-full"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
      }}
    >
      <Button
        onClick={() => setOpen((v) => !v)}
        variant={variant}
        withArrow
        className="btn--block-mobile"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <span className="ml-2 text-[0.7em] opacity-70">({items.length})</span>
      </Button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 z-20 min-w-full w-max max-w-[min(320px,90vw)] pb-2"
          >
            <div className="overflow-hidden rounded-xl border border-white/10 bg-gray-9/95 shadow-[0_16px_40px_rgba(0,0,0,.45)] backdrop-blur-md">
              {items.map((item) => (
                <li key={item.url} role="none">
                  <a
                    role="menuitem"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 px-5 py-3.5 text-(length:--text-sm) text-white/90 transition-colors hover:bg-white/[0.06] hover:text-accent"
                  >
                    <span>
                      <span className="block font-semibold">{item.label}</span>
                      {item.note && (
                        <span className="block text-(length:--text-xs) text-content">{item.note}</span>
                      )}
                    </span>
                    <svg viewBox="0 0 24 24" className="size-3.5 shrink-0 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                </li>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

function BackLink() {
  return (
    <Link
      to="/#works"
      className="group inline-flex min-h-11 items-center gap-3 text-(length:--text-xs) tracking-(--tracking-nav) text-content-light transition-colors duration-300 hover:text-accent"
    >
      <span className="flex size-9 items-center justify-center rounded-full border border-white/15 transition-[border-color,transform] duration-300 ease-(--ease-out-soft) group-hover:-translate-x-1 group-hover:border-accent">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
        </svg>
      </span>
      Back to projects
    </Link>
  )
}

function Section({ title, children, html }) {
  if (!children && !html) return null

  return (
    <Reveal as="section" className="min-w-0">
      <h2 className="text-pretitle mb-(--vspace-0_375) text-(length:--text-xs)">{title}</h2>
      {html ? (
        <div
          className="[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_p]:mb-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="mb-0">{children}</p>
      )}
    </Reveal>
  )
}

function ImageBlock({ title, sources, alt }) {
  return (
    <section className="mt-(--vspace-2)">
      <Reveal as="h2" className="text-pretitle">
        {title}
      </Reveal>

      <div className="mt-(--vspace-0_75) grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-start gap-4">
        {sources.map((src, index) => (
          <motion.figure
            key={src}
            className="m-0 overflow-hidden rounded-lg border border-white/10 bg-white transition-[border-color,box-shadow,transform] duration-300 ease-(--ease-out-soft) hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-20px_rgb(0_0_0/0.9)]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <img
              src={asset(src)}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="block max-h-[280px] w-full object-contain"
            />
          </motion.figure>
        ))}
      </div>
    </section>
  )
}

function PagerLink({ project, direction }) {
  const isNext = direction === 'next'

  if (!project) return <span className="flex-1" aria-hidden="true" />

  return (
    <Link
      to={`/project/${project.id}`}
      rel={direction}
      className={`group flex flex-1 flex-col gap-1 rounded-lg border border-white/10 p-5 transition-[border-color,background-color,transform] duration-300 ease-(--ease-out-soft) hover:border-accent/40 hover:bg-white/[0.03] ${
        isNext ? 'items-end text-right' : 'items-start'
      }`}
    >
      <span className="text-(length:--text-xs) tracking-(--tracking-nav) text-content-light">
        {isNext ? 'Next' : 'Previous'}
      </span>
      <span className="font-display text-(length:--text-lg) leading-tight text-white transition-colors duration-300 group-hover:text-accent">
        {project.title}
      </span>
    </Link>
  )
}
