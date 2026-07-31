const devicon = (slug, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`

/**
 * Tailwind and UI/UX were inline <svg> in the original markup because devicon
 * has no matching icon. Keeping them as inline paths preserves that exactly.
 */
export const skills = [
  { name: 'HTML', icon: devicon('html5') },
  { name: 'CSS', icon: devicon('css3') },
  {
    name: 'TAILWIND CSS',
    svg: {
      viewBox: '0 0 32 32',
      fill: '#38bdf8',
      d: 'M9 13.7q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1Zm-7 8.4q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1Z',
    },
  },
  { name: 'BOOTSTRAP', icon: devicon('bootstrap') },
  { name: 'SASS', icon: devicon('sass') },
  { name: 'JAVASCRIPT', icon: devicon('javascript') },
  { name: 'REACT JS', icon: devicon('react') },
  { name: 'GITHUB', icon: devicon('github') },
  { name: 'NODE JS', icon: devicon('nodejs') },
  { name: 'FIGMA', icon: devicon('figma') },
  { name: 'MONGODB', icon: devicon('mongodb') },
  {
    name: 'UI/UX',
    svg: {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z',
    },
  },
]
