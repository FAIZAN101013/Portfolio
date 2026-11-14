import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Intro } from '../components/Intro'
import { Projects } from '../components/Projects'
import { Services } from '../components/Services'
import { useSeo } from '../lib/seo'

export function Home() {
  useSeo()
  return (
    <main className="flex-1">
      <Intro />
      <About />
      <Projects />
      <Services />
      <Contact />
    </main>
  )
}
