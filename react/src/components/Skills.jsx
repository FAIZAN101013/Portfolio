import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { skills } from '../data/skills'

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-(--header-height) pt-(--vspace-3)">
      <div className="row">
        <div className="column col-12">
          <Reveal as="h2" className="text-pretitle">
            Skills &amp; Technologies
          </Reveal>
          <Reveal as="p" className="attention-getter mb-0" delay={0.1}>
            Here are the technologies I work with to bring ideas to life
          </Reveal>

          <ul className="mt-(--vspace-1_5) grid list-none grid-cols-5 gap-8 p-0 max-md:grid-cols-3 max-xs:grid-cols-2">
            {skills.map((skill, index) => (
              <motion.li
                key={skill.name}
                className="group flex flex-col items-center rounded-lg border border-white/5 bg-white/5 p-6 transition-[background-color,border-color,transform,box-shadow] duration-300 ease-(--ease-out-soft) hover:-translate-y-[5px] hover:border-accent/30 hover:bg-white/10 hover:shadow-[0_12px_28px_-12px_rgb(0_0_0/0.6)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: 0.06 * index,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                <SkillIcon skill={skill} />
                <p className="m-0 text-center text-(length:--text-sm) leading-(--vspace-0_75) text-white/90 transition-colors group-hover:text-white">
                  {skill.name}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function SkillIcon({ skill }) {
  const className =
    'mb-4 size-[60px] transition-transform duration-300 ease-(--ease-out-soft) group-hover:scale-110 max-xs:size-[48px]'

  if (skill.svg) {
    return (
      <svg
        className={className}
        viewBox={skill.svg.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d={skill.svg.d} fill={skill.svg.fill} />
      </svg>
    )
  }

  return (
    <img
      src={skill.icon}
      alt=""
      width="60"
      height="60"
      loading="lazy"
      decoding="async"
      className={className}
      aria-hidden="true"
    />
  )
}
