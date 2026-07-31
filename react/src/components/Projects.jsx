import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Reveal'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getProjectsByTag } from '../data/projects'
import { EASE_OUT_SOFT } from '../lib/motion'

const INITIAL_COUNT = 6
const INCREMENT = 3

const TABS = [
  { key: 'projects', label: 'Projects', tag: 'project' },
  { key: 'design', label: 'Design Projects', tag: 'design' },
]

export function Projects() {
  const [activeTab, setActiveTab] = useState('projects')
  const [visible, setVisible] = useState({ projects: INITIAL_COUNT, design: INITIAL_COUNT })
  const reduced = useReducedMotion()

  const tab = TABS.find((t) => t.key === activeTab)
  const all = useMemo(() => getProjectsByTag(tab.tag), [tab.tag])

  const visibleCount = visible[activeTab]
  const shown = all.slice(0, visibleCount)
  const hasMoreToToggle = all.length > INITIAL_COUNT
  const expanded = visibleCount >= all.length

  const toggleShowMore = () => {
    setVisible((current) => ({
      ...current,
      [activeTab]: expanded ? INITIAL_COUNT : Math.min(visibleCount + INCREMENT, all.length),
    }))
  }

  return (
    <section id="works" className="scroll-mt-(--header-height) pt-(--vspace-3)">
      <div className="row">
        <div className="column col-12">
          <Reveal as="h2" className="text-pretitle">
            Projects
          </Reveal>
          <Reveal as="p" className="text-h1 mt-0" delay={0.1}>
            Here are some of my favorite projects I&apos;ve worked on. Feel free to check them
            out.
          </Reveal>

          {/* ---------- tabs ---------- */}
          <Reveal delay={0.2} className="mb-(--vspace-1_5) flex justify-center" y={12}>
            <div
              role="tablist"
              aria-label="Project categories"
              className="relative inline-flex gap-1 rounded-full border border-white/10 bg-white/5 p-1 max-xs:w-full max-xs:flex-col"
            >
              {TABS.map(({ key, label }) => {
                const active = activeTab === key
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls="projects-panel"
                    onClick={() => setActiveTab(key)}
                    className={[
                      'relative min-w-[170px] cursor-pointer rounded-full px-7 py-3 text-(length:--text-xs) font-semibold uppercase tracking-[.2em] transition-colors duration-300 max-xs:w-full max-xs:min-w-0',
                      active ? 'text-black' : 'text-content hover:text-white',
                    ].join(' ')}
                  >
                    {active && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-full bg-accent"
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 380, damping: 32 }
                        }
                      />
                    )}
                    <span className="relative z-1">{label}</span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* ---------- grid ---------- */}
          <div id="projects-panel" role="tabpanel" aria-label={tab.label}>
            {shown.length === 0 ? (
              <p className="py-8 text-center">No projects found in this category.</p>
            ) : (
              <motion.div
                layout={!reduced}
                className="grid grid-cols-3 gap-2 max-lg:grid-cols-2 max-md:grid-cols-1"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {shown.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout={!reduced}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
                      transition={{
                        duration: 0.45,
                        delay: Math.min(index, 5) * 0.06,
                        ease: EASE_OUT_SOFT,
                      }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {hasMoreToToggle && (
              <div className="mt-(--vspace-1_5) text-center">
                <button
                  type="button"
                  onClick={toggleShowMore}
                  aria-expanded={expanded}
                  className="btn btn--medium btn--stroke"
                >
                  {expanded ? 'Show Less' : 'Show More'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
