import { motion } from 'framer-motion'
import { Button } from './Button'
import { Reveal } from './Reveal'
import { TextReveal } from './TextReveal'
import { Icon } from './Icon'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { site, socials } from '../data/site'

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-(--header-height) pt-(--vspace-3)">
      <div className="row border-t border-hairline pt-(--vspace-5) max-md:pt-(--vspace-4)">
        <div className="column col-12">
          <Reveal as="h2" className="text-pretitle">
            Get In Touch
          </Reveal>
          <TextReveal
            as="p"
            className="text-h1 mt-0"
            text="I love to hear from you. Whether you have a question or just want to chat about design, tech and art, shoot me a message."
            delay={0.05}
          />
        </div>
      </div>

      <div className="row mt-(--vspace-2) items-start border-b border-hairline pb-(--vspace-3)">
        <Reveal className="column col-4 max-xl:w-1/2 max-md:w-full max-md:mb-(--vspace-1)">
          <h3 className="text-pretitle mb-(--vspace-0_5)">Reach Me At</h3>
          <ul className="m-0 list-none space-y-(--vspace-0_25) p-0 text-(length:--text-md) font-light leading-(--vspace-1_25)">
            <li>
              <ContactLink href={`mailto:${site.email}`} icon="envelope">
                {site.email}
              </ContactLink>
            </li>
            <li>
              <ContactLink href={`tel:${site.phone}`} icon="telephone">
                {site.phone}
              </ContactLink>
            </li>
          </ul>
        </Reveal>

        <Reveal
          className="column col-4 max-xl:w-1/2 max-md:w-full max-md:mb-(--vspace-1)"
          delay={0.1}
        >
          <h3 className="text-pretitle mb-(--vspace-0_5)">Social</h3>
          <ul className="m-0 list-none space-y-(--vspace-0_25) p-0 text-(length:--text-md) font-light leading-(--vspace-1_25)">
            {socials.map(({ label, url, icon }) => (
              <li key={label}>
                <ContactLink href={url} icon={icon} external>
                  {label}
                </ContactLink>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          className="column col-4 flex max-xl:w-full max-xl:mt-(--vspace-1)"
          delay={0.2}
        >
          <Button
            href={`mailto:${site.email}`}
            fullWidth
            magnetic
            withArrow
            className="self-start"
            wrapperClassName="ml-auto mr-[5vw] max-xl:mx-0"
          >
            Say Hello.
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

function ContactLink({ href, icon, children, external = false }) {
  const reduced = useReducedMotion()

  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      // min-h-11 (44px) and the wrapping break-all are both mobile fixes: the
      // 36px icon left the row under the touch minimum, and the email address
      // is long enough to overflow a 360px column unbroken.
      className="group inline-flex min-h-11 max-w-full items-center gap-3 text-content-light transition-colors duration-300 hover:text-accent"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-[background-color,border-color,transform] duration-300 ease-(--ease-out-soft) group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:bg-accent/10">
        <Icon name={icon} className="size-[1.5rem]" />
      </span>
      <span className="link-underline min-w-0 break-words">{children}</span>
    </motion.a>
  )
}
