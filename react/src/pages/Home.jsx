import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Intro } from '../components/Intro'
import { Projects } from '../components/Projects'

export function Home() {
  return (
    <main className="flex-1">
      <Intro />
      <About />
      <Projects />
      <Contact />
    </main>
  )
}
