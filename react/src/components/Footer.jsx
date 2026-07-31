import { Icon } from './Icon'

/**
 * The original footer, kept exactly as designed: one copyright line and a
 * back-to-top box that sits half outside the row, pulled up by --vspace-1.
 *
 * Polish only — a focusable, labelled control, a nudge on the arrow, and a
 * stacked layout below 600px so the box never collides with the text.
 */
export function Footer() {
  const scrollTop = (event) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="mt-auto pb-(--vspace-3) pt-(--vspace-1) text-content-light">
      <div className="row relative">
        <div className="column -mt-(--vspace-0_25) mr-[5.2rem] leading-(--vspace-0_875) max-sm:mr-0">
          <span className="inline-block text-(length:--text-sm)">Copyright Faizan</span>
        </div>

        <div className="absolute right-(--gutter) top-[calc(var(--vspace-1)*-1)] z-2 max-sm:top-[calc(var(--vspace-0_25)*-1)]">
          <a
            href="#top"
            onClick={scrollTop}
            title="Back to Top"
            aria-label="Back to top"
            className="group flex h-[calc(1.625*var(--space))] w-(--vspace-1_5) items-center justify-center border border-content bg-body no-underline transition-[background-color,border-color] duration-300 ease-(--ease-in-out-soft) hover:border-white hover:bg-white focus-visible:border-white focus-visible:bg-white"
          >
            <Icon
              name="arrowUp"
              className="size-(--vspace-0_5) fill-white transition-[fill,transform] duration-300 ease-(--ease-out-soft) group-hover:-translate-y-0.5 group-hover:fill-black group-focus-visible:fill-black"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
