import { Reveal } from './Reveal'
import { TextReveal } from './TextReveal'
import { Link } from 'react-router-dom'
import { Button } from './Button'
import { asset } from '../lib/asset'

/**
 * The freelance half of the portfolio's double life: recruiters read the
 * projects and timeline, prospective clients read this — what I can be hired
 * to build, phrased as outcomes rather than technologies. The CTA feeds the
 * existing contact section instead of adding a second form.
 *
 * Rendered as an editorial numbered list rather than a card grid: hairline
 * rows are the site's own language (nav, marquee, contact), and four equal
 * boxes read as filler next to the display-serif sections around them.
 */
const SERVICES = [
  {
    title: 'Marketing websites',
    desc: 'Brand sites and landing pages that turn visitors into enquiries, deployed on your own domain.',
    timeline: '1 to 2 weeks',
    proof: { id: 'modal-01', label: 'Orniva Packaging', image: '/images/orniva/Screenshot (1636).png' },
    form: 'Marketing website',
  },
  {
    title: 'Full-stack web applications',
    desc: 'Dashboards, admin consoles and catalogues with sign-in, roles and a real database.',
    timeline: '3 to 6 weeks',
    proof: { id: 'modal-02', label: 'Modern Display + CRM', image: '/images/moderndisplay/Screenshot (1623).png' },
    form: 'Full-stack web application',
  },
  {
    title: 'UI/UX design',
    desc: 'Research, wireframes and high-fidelity Figma prototypes, handed off or built by the same person.',
    timeline: '1 to 3 weeks',
    proof: { id: 'modal-13', label: 'Noted, 60+ screens', image: '/images/noted/landing-hero.jpg' },
    form: 'UI/UX design',
  },
  {
    title: 'APIs & integrations',
    desc: 'Node and Express backends, PostgreSQL or MongoDB, plus email, payments and third-party APIs wired in and tested.',
    timeline: '1 to 2 weeks',
    proof: { id: 'modal-01', label: 'Orniva enquiry API', image: '/images/orniva/Screenshot (1613).png' },
    form: 'API & integrations',
  },
]

/** What happens after the first email. Clients who have never hired a
 *  freelancer want this spelled out; it is also where the handover videos
 *  get their line. */
const STEPS = [
  { title: 'Brief', text: 'A short call or email. I send back a plan, a timeline and what I need from you.' },
  { title: 'Build', text: 'Design first, then code. You see progress on a live preview link, not at the end.' },
  { title: 'Launch', text: 'Deployed on your own domain, with analytics, SEO basics and a backup of everything.' },
  { title: 'Handover', text: 'Walkthrough videos of how to use and update what I built, so you are never stuck.' },
]

/** Scrolls to the form and preselects the matching "What do you need?" option. */
const formHref = (service) => `#contact?need=${encodeURIComponent(service)}`

export function Services() {
  return (
    <section id="services" className="scroll-mt-(--header-height) pt-(--vspace-3)">
      <div className="row">
        <div className="column col-12">
          <Reveal as="h2" className="text-pretitle">
            Services
          </Reveal>
          <TextReveal
            as="p"
            className="text-h1 mt-0"
            text="Hire me for the whole thing, design to live domain."
            delay={0.05}
          />

          <ul className="m-0 mt-(--vspace-1_5) list-none border-t border-hairline p-0">
            {SERVICES.map((service, index) => (
              <Reveal
                as="li"
                key={service.title}
                delay={index * 0.06}
                className="group grid grid-cols-[5rem_1fr_1.2fr_16rem] items-center gap-x-8 border-b border-hairline py-(--vspace-1) transition-colors duration-300 hover:bg-white/[0.025] max-lg:grid-cols-[3rem_1fr_9rem] max-lg:gap-x-4 max-lg:gap-y-3 max-md:grid-cols-[3rem_1fr] max-md:gap-y-3"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-(length:--text-lg) leading-none text-accent/45 transition-colors duration-300 group-hover:text-accent"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="max-lg:col-start-2">
                  <h3 className="m-0 font-display text-(length:--text-xl) leading-[1.15] text-white transition-colors duration-300 group-hover:text-accent max-lg:text-(length:--text-lg)">
                    {service.title}
                  </h3>
                  <p className="m-0 mt-2 text-(length:--text-xs) uppercase tracking-[0.18em] text-content-light">
                    Usually {service.timeline}
                  </p>
                </div>

                <div className="max-lg:col-span-2 max-lg:col-start-2">
                  <p className="m-0 max-w-[58ch] text-(length:--text-md) font-light leading-(--vspace-1) text-content">
                    {service.desc}
                  </p>
                  <a
                    href={formHref(service.form)}
                    className="mt-2 inline-flex min-h-9 items-center gap-2 text-(length:--text-xs) uppercase tracking-[0.2em] text-accent transition-colors hover:text-white"
                  >
                    Ask about this
                    <span aria-hidden="true">→</span>
                  </a>
                </div>

                {/* Proof: the shipped project that shows this service done. */}
                <Link
                  to={`/project/${service.proof.id}`}
                  className="group/proof block max-lg:col-start-3 max-lg:row-start-1 max-lg:row-span-2 max-md:col-start-2 max-md:row-start-auto max-md:row-span-1 max-md:w-[14rem]"
                  aria-label={`See ${service.proof.label}`}
                >
                  <span className="block aspect-[1.6] overflow-hidden rounded-sm ring-1 ring-white/10 transition-[box-shadow] duration-300 group-hover/proof:ring-accent/60">
                    <img
                      src={asset(service.proof.image)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="block h-full w-full object-cover object-top transition-transform duration-500 group-hover/proof:scale-[1.04]"
                    />
                  </span>
                  <span className="mt-2 block text-(length:--text-xs) leading-snug text-content-light transition-colors group-hover/proof:text-accent">
                    {service.proof.label}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>

          {/* How we work */}
          <ol className="m-0 mt-(--vspace-1_5) grid list-none grid-cols-4 gap-x-8 gap-y-6 p-0 max-lg:grid-cols-2 max-xs:grid-cols-1">
            {STEPS.map((step, index) => (
              <Reveal as="li" key={step.title} delay={0.08 * index} className="border-t border-white/10 pt-4">
                <span className="block text-(length:--text-xs) uppercase tracking-[0.2em] text-accent">
                  Step {index + 1}
                </span>
                <span className="mt-1 block font-display text-(length:--text-lg) text-white">
                  {step.title}
                </span>
                <p className="m-0 mt-2 text-(length:--text-sm) leading-(--vspace-0_75) text-content">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal
            className="mt-(--vspace-1_5) flex items-center justify-between gap-6 max-md:flex-col max-md:items-stretch"
            delay={0.1}
          >
            <p className="mb-0 text-(length:--text-md) font-light text-content-light">
              Every project on this page is live. Tell me what you need and I will reply
              with a plan and a timeline, usually within a day.
            </p>
            <Button href="#contact?need=Something%20else" magnetic withArrow className="btn--block-mobile shrink-0">
              Start a project
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
