import { Reveal } from './Reveal'
import { TextReveal } from './TextReveal'
import { Button } from './Button'

/**
 * The freelance half of the portfolio's double life: recruiters read the
 * projects and timeline, prospective clients read this — what I can be hired
 * to build, phrased as outcomes rather than technologies. The CTA feeds the
 * existing contact section instead of adding a second form.
 */
const SERVICES = [
  {
    title: 'Marketing Websites',
    desc: 'Landing pages and brand sites that present your work properly and turn visitors into enquiries — designed, built, animated and deployed on your own domain, like ornivapackaging.com.',
  },
  {
    title: 'Full-Stack Web Applications',
    desc: 'Dashboards, admin consoles and e-commerce — real products with authentication, roles, payments and a proper database, like the enquiry pipeline behind moderndisplay.store.',
  },
  {
    title: 'UI/UX Design',
    desc: 'Figma-first design: research, wireframes and high-fidelity prototypes — either handed off, or carried straight through into the working product by the same person.',
  },
  {
    title: 'APIs & Integrations',
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
            className="attention-getter mb-0"
            text="Available for freelance work — here's what I build for clients"
            delay={0.05}
          />

          <div className="mt-(--vspace-1_5) grid grid-cols-2 gap-2 max-md:grid-cols-1">
            {SERVICES.map((service, index) => (
              <Reveal
                key={service.title}
                delay={index * 0.08}
                className="group rounded-lg border border-white/5 bg-white/5 p-8 transition-[background-color,border-color,transform] duration-300 ease-(--ease-out-soft) hover:-translate-y-1 hover:border-accent/30 hover:bg-white/10 max-xs:p-6"
              >
                <span className="font-display text-(length:--text-lg) text-accent/60 transition-colors duration-300 group-hover:text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-(--vspace-0_375) mt-(--vspace-0_25) font-display text-(length:--text-lg) leading-tight text-white">
                  {service.title}
                </h3>
                <p className="mb-0 text-(length:--text-md) leading-(--vspace-1) text-content">
                  {service.desc}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-(--vspace-1_5) flex items-center gap-5 max-xs:flex-col max-xs:items-stretch" delay={0.1}>
            <Button href="#contact" magnetic withArrow className="btn--block-mobile">
              Have a project in mind? Say hello
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
