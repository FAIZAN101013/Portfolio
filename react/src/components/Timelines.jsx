import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Reveal } from './Reveal'
import { useReducedMotion } from '../hooks/useReducedMotion'
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
  const listRef = useRef(null)
  const reduced = useReducedMotion()

  // The line draws itself as the column passes the middle of the viewport:
  // 'start 80%' starts it just after the first entry appears, 'end 60%' has it
  // complete as the last entry settles, so the stroke always reads as arriving
  // slightly ahead of the text rather than chasing it.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 80%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 180, damping: 34 })

  return (
    <div className="column col-6 max-lg:w-full max-lg:pt-(--vspace-1)">
      <Reveal as="h2" className="text-pretitle ml-(--timeline-left-padding)">
        {heading}
      </Reveal>

      <ol
        ref={listRef}
        className="relative m-0 mt-(--vspace-1_25) list-none p-0 pr-[1vw]"
      >
        {/* Track and stroke, rather than the single ::before rule this used to
            carry — the track keeps the column's structure visible before the
            stroke arrives, and while reduced motion pins the stroke at full. */}
        <span
          aria-hidden="true"
          className="absolute left-[3px] top-(--timeline-top-adjust) block h-[calc(100%-var(--timeline-top-adjust))] w-px bg-hairline"
        />
        <motion.span
          aria-hidden="true"
          className="absolute left-[3px] top-(--timeline-top-adjust) block h-[calc(100%-var(--timeline-top-adjust))] w-px origin-top bg-linear-to-b from-accent to-accent/20"
          style={reduced ? { scaleY: 1 } : { scaleY }}
        />

        {entries.map((entry, index) => (
          <TimelineEntry key={entry.title} entry={entry} index={index} />
        ))}
      </ol>
    </div>
  )
}

function TimelineEntry({ entry, index }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  // The dot fills in as it crosses the middle of the screen. Two stops rather
  // than a ramp: it should read as a switch throwing, not as a slow fade.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'start 55%'],
  })
  const dotScale = useTransform(scrollYProgress, [0, 1], [0.4, 1])
  const dotOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 1])

  return (
    <Reveal
      as="li"
      ref={ref}
      delay={index * 0.08}
      className="group relative pb-(--vspace-1) pl-(--timeline-left-padding) last:pb-0"
    >
      <motion.span
        className="absolute left-0 top-(--timeline-top-adjust) block size-2 rounded-full bg-accent transition-shadow duration-300 ease-(--ease-out-soft) group-hover:shadow-[0_0_0_4px_rgb(234_190_124/0.15)]"
        style={reduced ? undefined : { scale: dotScale, opacity: dotOpacity }}
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
  )
}
