import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { FeaturedProjects } from '../components/FeaturedProjects'
import { Intro } from '../components/Intro'
import { Projects } from '../components/Projects'
import { Services } from '../components/Services'
import { useSeo } from '../lib/seo'

export function Home() {
  useSeo()
  return (
    <main className="flex-1">
      <Intro />
      <FeaturedProjects />
      <About />
      <Projects />
      <Services />
      <Contact />
    </main>
  )
}
