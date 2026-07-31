/**
 * Several asset paths contain spaces, parentheses and ampersands
 * ("/images/Hotel App ui/Research/Journey Map & Scenario.png").
 * React does not encode src attributes, so we do it per-segment —
 * encodeURI would leave "&" and "?" ambiguous inside a filename.
 */
export function asset(path) {
  if (!path) return ''
  if (/^(https?:)?\/\//.test(path)) return path
  return path.split('/').map(encodeURIComponent).join('/')
}

/** Matches the original getVideoType() mapping. */
export function videoMimeType(src) {
  const ext = src.split('.').pop().toLowerCase()
  if (ext === 'webm') return 'video/webm'
  if (ext === 'ogg' || ext === 'ogv') return 'video/ogg'
  return 'video/mp4'
}
