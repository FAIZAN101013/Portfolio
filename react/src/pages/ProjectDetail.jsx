import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { MediaGallery } from '../components/MediaGallery'
import { Reveal } from '../components/Reveal'
import { getProjectById, projects } from '../data/projects'
import { asset } from '../lib/asset'

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
    document.title = project ? `${project.title} — Faizan` : 'Project not found — Faizan'
    return () => {
      document.title = 'Faizan'
    }
  }, [project])

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

  const chips = isDesign ? project.tools : project.techStack
  const chipsLabel = isDesign ? 'Tools' : 'Tech Stack'
  const result = project.result || project.learning

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

          {chips?.length > 0 && (
            <Reveal className="mt-(--vspace-0_75)" delay={0.1}>
              <h2 className="sr-only">{chipsLabel}</h2>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-(length:--text-xs) font-semibold uppercase tracking-[.16em] text-accent transition-[background-color,transform] duration-300 ease-(--ease-out-soft) hover:-translate-y-0.5 hover:bg-accent/20"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </header>

        <MediaGallery media={project.media} title={project.title} />

        {/* ---------- narrative ---------- */}
        <div className="mt-(--vspace-2) grid grid-cols-2 gap-x-(--vspace-2) gap-y-(--vspace-1_25) max-lg:grid-cols-1">
          <Section title="Overview" html={project.description} />
          <Section title="Problem Statement">{project.problemStatement}</Section>
          <Section title="Research">{project.research}</Section>
          <Section title="Result / Learning">{result}</Section>
        </div>

        {project.features?.length > 0 && (
          <section className="mt-(--vspace-2)">
            <Reveal as="h2" className="text-pretitle">
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

        {/* ---------- actions ----------
            Stacks below 500px. "View Figma Prototype" at the button's 0.35em
            tracking is wider than a 360px viewport, and .btn is nowrap, so
            side-by-side was pushing the page into a horizontal scroll. */}
        <Reveal className="mt-(--vspace-2) flex flex-wrap items-center gap-2 max-xs:flex-col max-xs:items-stretch">
          {project.githubLink && (
            <ActionButton href={project.githubLink}>View Project</ActionButton>
          )}
          {project.liveDemo && (
            <ActionButton href={project.liveDemo} variant="stroke">
              Live Demo
            </ActionButton>
          )}
          {project.prototypeLink && (
            <ActionButton href={project.prototypeLink} variant="stroke">
              View Figma Prototype
            </ActionButton>
          )}
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

function BackLink() {
  return (
    <Link
      to="/#works"
      className="group inline-flex min-h-11 items-center gap-3 text-(length:--text-xs) uppercase tracking-[.25em] text-content-light transition-colors duration-300 hover:text-accent"
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
      <span className="text-(length:--text-xs) uppercase tracking-[.25em] text-content-light">
        {isNext ? 'Next' : 'Previous'}
      </span>
      <span className="font-display text-(length:--text-lg) leading-tight text-white transition-colors duration-300 group-hover:text-accent">
        {project.title}
      </span>
    </Link>
  )
}
