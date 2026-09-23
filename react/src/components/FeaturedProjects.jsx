import { Reveal } from './Reveal'
import { TextReveal } from './TextReveal'
import { ProjectCard } from './ProjectCard'
import { getFeaturedProjects } from '../data/projects'

/**
 * Highlight reel straight after the hero: the two shipped freelance builds and
 * the strongest personal project, ahead of the long-form About/Projects scroll.
 * Which projects appear is data-driven — `featured: true` in projects.js —
 * so promoting a different project is a one-line data change.
 */
export function FeaturedProjects() {
  const featured = getFeaturedProjects()

  if (featured.length === 0) return null

  return (
    <section id="featured" className="scroll-mt-(--header-height) pt-(--vspace-3)">
      <div className="row">
        <div className="column col-12">
          <Reveal as="h2" className="text-pretitle">
            Featured Projects
          </Reveal>
          <TextReveal
            as="p"
            className="attention-getter mb-0"
            text="Client work shipped solo, and the build I'm proudest of"
            delay={0.05}
          />

          <div className="mt-(--vspace-1_5) grid grid-cols-3 gap-2 max-lg:grid-cols-2 max-md:grid-cols-1">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
