import { Reveal } from './Reveal'
import { TextReveal } from './TextReveal'
import { Button } from './Button'

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
    desc: 'Landing pages and brand sites that present your work properly and turn visitors into enquiries — designed, built, animated and deployed on your own domain, like ornivapackaging.com.',
  },
  {
    title: 'Full-stack web applications',
    desc: 'Dashboards, admin consoles and e-commerce — real products with authentication, roles, payments and a proper database, like the enquiry pipeline behind moderndisplay.store.',
  },
  {
    title: 'UI/UX design',
    desc: 'Figma-first design: research, wireframes and high-fidelity prototypes — either handed off, or carried straight through into the working product by the same person.',
  },
  {
    title: 'APIs & integrations',
    desc: 'Node and Express backends, PostgreSQL or MongoDB data layers, and the glue work — email delivery, payment gateways, third-party APIs — wired in and tested.',
  },
]

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
            text="I take on freelance work — from a single landing page to a full product, built end to end."
            delay={0.05}
          />

          <ul className="m-0 mt-(--vspace-1_5) list-none border-t border-hairline p-0">
            {SERVICES.map((service, index) => (
              <Reveal
                as="li"
                key={service.title}
                delay={index * 0.06}
                className="group grid grid-cols-[7rem_1.1fr_1.4fr] items-baseline gap-x-10 border-b border-hairline py-(--vspace-1) transition-colors duration-300 hover:bg-white/[0.025] max-lg:grid-cols-[3.5rem_1fr] max-lg:gap-x-4 max-lg:gap-y-2"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-(length:--text-lg) leading-none text-accent/45 transition-colors duration-300 group-hover:text-accent"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="m-0 font-display text-(length:--text-xl) leading-[1.15] text-white transition-colors duration-300 group-hover:text-accent max-lg:text-(length:--text-lg)">
                  {service.title}
                </h3>
                <p className="m-0 max-w-[62ch] text-(length:--text-md) font-light leading-(--vspace-1) text-content max-lg:col-start-2">
                  {service.desc}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal
            className="mt-(--vspace-1_5) flex items-center justify-between gap-6 max-md:flex-col max-md:items-stretch"
            delay={0.1}
          >
            <p className="mb-0 text-(length:--text-md) font-light text-content-light">
              Every project so far has shipped and is live — the two above are in the
              featured row.
            </p>
            <Button href="#contact" magnetic withArrow className="btn--block-mobile shrink-0">
              Start a project
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
