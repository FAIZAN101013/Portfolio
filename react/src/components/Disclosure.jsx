import { useId, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

/**
 * On phones, a section that opens on tap; on wider screens, always open with
 * no toggle. Keeps long pages short where there is no room to skim.
 */
export function Disclosure({ summary, children, defaultOpen = false, className = '', query = '(max-width: 800px)' }) {
  const compact = useMediaQuery(query)
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  if (!compact) return children
  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-12 w-full items-center justify-between gap-4 border-b border-white/10 py-3 text-left"
      >
        <span className="text-(length:--text-xs) font-medium uppercase tracking-[0.18em] text-white">{summary}</span>
        <span
          aria-hidden="true"
          className={`grid size-7 shrink-0 place-items-center rounded-full border border-white/15 text-accent transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      <div id={id} hidden={!open} className="pt-2">
        {children}
      </div>
    </div>
  )
}
