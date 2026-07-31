import { Reveal } from './Reveal'
import { education, experience } from '../data/site'

export function Timelines() {
  return (
    <div className="row pt-(--vspace-3) [--timeline-left-padding:var(--vspace-1\_75)] [--timeline-top-adjust:var(--vspace-0\_5)]">
      <TimelineColumn heading="Experience" entries={experience} />
      <TimelineColumn heading="Education" entries={education} />
    </div>
  )
}

function TimelineColumn({ heading, entries }) {
  return (
    <div className="column col-6 max-lg:w-full max-lg:pt-(--vspace-1)">
      <Reveal as="h2" className="text-pretitle ml-(--timeline-left-padding)">
        {heading}
      </Reveal>

      <ol className="relative m-0 mt-(--vspace-1_25) list-none p-0 pr-[1vw] before:absolute before:left-[3px] before:top-(--timeline-top-adjust) before:block before:h-[calc(100%-var(--timeline-top-adjust))] before:w-px before:bg-hairline before:content-['']">
        {entries.map((entry, index) => (
          <Reveal
            as="li"
            key={entry.title}
            delay={index * 0.08}
            className="group relative pb-(--vspace-1) pl-(--timeline-left-padding) last:pb-0"
          >
            <span
              className="absolute left-0 top-(--timeline-top-adjust) block size-2 rounded-full bg-accent transition-[transform,box-shadow] duration-300 ease-(--ease-out-soft) group-hover:scale-150 group-hover:shadow-[0_0_0_4px_rgb(234_190_124/0.15)]"
              aria-hidden="true"
            />

            <h4 className="mb-(--vspace-0_125) mt-0 font-sans text-(length:--text-lg) font-medium leading-(--vspace-1) text-white">
              {entry.title}
            </h4>
            <h5 className="mb-(--vspace-0_125) mt-0 font-sans text-[calc(var(--text-size)*1.1053)] font-light leading-(--vspace-0_875) text-white/85">
              {entry.meta}
            </h5>
            {entry.timeframe && (
              <p className="mb-(--vspace-0_25) mt-[.4rem] text-(length:--text-xs) uppercase leading-(--vspace-0_75) tracking-[.2em] text-content-light">
                {entry.timeframe}
              </p>
            )}
            <p className="mb-0 mt-(--vspace-0_25)">{entry.desc}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
