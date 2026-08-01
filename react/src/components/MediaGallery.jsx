import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { asset, videoMimeType } from '../lib/asset'
import { EASE_OUT_SOFT } from '../lib/motion'

/**
 * Inline viewer used on every project detail page: one large frame plus a
 * thumbnail rail. Replaces the old lightbox — the media now lives on the page
 * rather than behind a popup, and images and video are handled identically.
 */
export function MediaGallery({ media = [], title }) {
  const [[index, direction], setSlide] = useState([0, 0])
  const reduced = useReducedMotion()

  const count = media.length
  const hasRail = count > 1

  const paginate = useCallback(
    (delta) => {
      if (count < 2) return
      setSlide(([current]) => [(current + delta + count) % count, delta])
    },
    [count]
  )

  useEffect(() => {
    if (!hasRail) return
    const onKeyDown = (event) => {
      // Only when the gallery region owns focus, so page-level scrolling with
      // arrow keys still works everywhere else.
      if (!document.activeElement?.closest('[data-gallery]')) return
      if (event.key === 'ArrowRight') paginate(1)
      if (event.key === 'ArrowLeft') paginate(-1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [hasRail, paginate])

  if (!count) return null

  const current = media[index]

  const variants = {
    enter: (dir) => (reduced ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => (reduced ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? -40 : 40 }),
  }

  // A swipe counts if it either travelled far enough or was thrown fast
  // enough — distance alone ignores a quick flick, velocity alone fires on a
  // slow deliberate drag that was meant to be cancelled.
  const onDragEnd = (_, { offset, velocity }) => {
    const power = offset.x + velocity.x * 0.2
    if (power < -70) paginate(1)
    else if (power > 70) paginate(-1)
  }

  return (
    <section data-gallery aria-label={`${title} media`} className="mt-(--vspace-1_5)">
      <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/40 max-md:min-h-[200px]">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduced ? 0.15 : 0.42, ease: EASE_OUT_SOFT }}
            className={`flex w-full items-center justify-center ${
              hasRail && current.type !== 'video' ? 'cursor-grab active:cursor-grabbing' : ''
            }`}
            // Video keeps its own gesture surface: dragging across a <video>
            // is how you scrub it, and hijacking that to change slides would
            // make the controls unusable.
            drag={hasRail && current.type !== 'video' ? 'x' : false}
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
          >
            {current.type === 'video' ? (
              <video
                controls
                controlsList="nodownload"
                playsInline
                preload="metadata"
                className="block max-h-[62vh] w-full object-contain"
              >
                <source src={asset(current.src)} type={videoMimeType(current.src)} />
                Your browser does not support this video format.
              </video>
            ) : (
              <img
                src={asset(current.src)}
                alt={`${title} — view ${index + 1} of ${count}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                // The browser's own image-drag would start a file drag and
                // swallow the pointer before the swipe gesture ever begins.
                draggable="false"
                className="block max-h-[62vh] w-full select-none object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {hasRail && (
          <>
            {/* Arrows are the pointer affordance; on touch the swipe is the
                primary gesture, so they shrink out of the way of the image. */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4 max-md:px-2">
              <ArrowButton label="Previous media" onClick={() => paginate(-1)} dir="left" />
              <ArrowButton label="Next media" onClick={() => paginate(1)} dir="right" />
            </div>

            <span className="pointer-events-none absolute bottom-3 right-4 rounded-full bg-black/60 px-3 py-1 font-mono text-(length:--text-xs) text-white/80 backdrop-blur-sm">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {hasRail && (
        <p className="mb-0 mt-2 hidden text-(length:--text-xs) uppercase tracking-[.2em] text-content-light touch:block">
          Swipe to browse
        </p>
      )}

      {hasRail && (
        // Wraps on desktop, scrolls horizontally on a phone: eight thumbnails
        // wrapped to four rows pushed the page content below the fold.
        <ul className="mt-3 flex list-none flex-wrap gap-2 p-0 max-md:snap-rail max-md:no-scrollbar max-md:flex-nowrap">
          {media.map((item, dot) => (
            <li key={item.src} className="max-md:snap-card">
              <button
                type="button"
                onClick={() => setSlide(([c]) => [dot, dot > c ? 1 : -1])}
                aria-label={`Show media ${dot + 1}`}
                aria-current={dot === index}
                className={`relative block h-16 w-24 overflow-hidden rounded-md border transition-[border-color,opacity,transform] duration-300 ease-(--ease-out-soft) max-xs:h-12 max-xs:w-16 ${
                  dot === index
                    ? 'border-accent opacity-100'
                    : 'border-white/10 opacity-55 hover:-translate-y-0.5 hover:opacity-100'
                }`}
              >
                {item.type === 'video' ? (
                  <span className="flex size-full items-center justify-center bg-black/60 text-accent">
                    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                ) : (
                  <img
                    src={asset(item.src)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function ArrowButton({ label, onClick, dir }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="pointer-events-auto flex size-12 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white opacity-85 backdrop-blur-[6px] transition-[background-color,transform,opacity] duration-300 ease-(--ease-out-soft) hover:scale-110 hover:bg-black/70 hover:opacity-100 active:scale-95 max-md:size-10"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        />
      </svg>
    </button>
  )
}
