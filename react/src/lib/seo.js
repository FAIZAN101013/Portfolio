import { useEffect } from 'react'

export const SITE_URL = 'https://faziansportfolio.netlify.app'
const DEFAULT_TITLE = 'Faizan Patel | Software Developer & UI/UX Designer'
const DEFAULT_DESCRIPTION =
  'Portfolio of Faizan Patel, a software developer and UI/UX designer building fast React websites, web apps and Figma designs for clients and startups.'
const DEFAULT_IMAGE = `${SITE_URL}/images/prof.jpg`

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [name, key] = selector.replace(/^meta\[|\]$/g, '').split('=')
    el.setAttribute(name, key.replace(/"/g, ''))
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Keeps <head> in sync with the current route. Each page passes what differs;
 * everything else falls back to the home-page defaults from index.html.
 */
export function useSeo({ title, description, path = '/', image, noindex = false } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Faizan Patel` : DEFAULT_TITLE
    const desc = description || DEFAULT_DESCRIPTION
    const url = `${SITE_URL}${path}`
    const img = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE

    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, follow' : 'index, follow')
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', desc)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:image"]', 'content', img)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', desc)
    setMeta('meta[name="twitter:image"]', 'content', img)
    setCanonical(url)
  }, [title, description, path, image, noindex])
}
