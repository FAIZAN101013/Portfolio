/** Everything that was hardcoded across index.html, in one place. */

export const site = {
  name: 'Faizan Patel.',
  roles: ['Software', 'Developer'],
  email: 'faizan.m.patel10@gmail.com',
  phone: '+918805910192',
  cvUrl:
    'https://drive.google.com/file/d/1-Z9lvHd8ZQ4vAf9IpsnkNeCltV36Bphm/view?usp=drive_link',
  photo: '/images/prof.jpg',
}

export const socials = [
  { label: 'GitHub', url: 'https://github.com/FAIZAN101013', icon: 'github' },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/faizan-p-6939821b5',
    icon: 'linkedin',
  },
  { label: 'LeetCode', url: 'https://leetcode.com/u/I9ERYn6IQy/', icon: 'code' },
]

export const navLinks = [
  { id: 'works', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export const aboutParagraphs = [
  `I'm a software developer and UI/UX designer from Pune. I take a project from the first Figma wireframe to a live domain, and I have done that solo for paying clients: <strong>Orniva Packaging</strong>, a marketing site with an enquiry API, and <strong>Modern Display</strong>, a catalogue with a full CRM behind it.`,
  `I work in <strong>React</strong>, <strong>Next.js</strong> and <strong>Node</strong> with PostgreSQL or Supabase underneath, and I design in <strong>Figma</strong> before I build. I'm available for freelance work and open to full-time roles.`,
]

/** Shown as four short lines under the About text, in place of a logo wall. */
export const skillGroups = [
  { label: 'Frontend', items: 'React, Next.js, JavaScript, Tailwind CSS, Framer Motion' },
  { label: 'Backend', items: 'Node, Express, PostgreSQL, Prisma, Supabase, MongoDB' },
  { label: 'Design', items: 'Figma, UI/UX research, wireframes, prototypes' },
  { label: 'Also', items: 'Git, Playwright, Netlify, Vercel, AI-assisted development' },
]

export const experience = [
  {
    title: 'Freelance developer & designer',
    meta: 'March 2026 – present',
    desc: 'Orniva Packaging, Modern Display and a session-booking site, each shipped solo from design to deployment.',
  },
  {
    title: 'Eniacworld Media',
    meta: 'UI/UX and React intern · Mar – May 2025',
    desc: 'Built responsive UIs and Express APIs for the TrekingMantra travel site and its CRM.',
  },
  {
    title: 'Varcons Tech',
    meta: 'Full-stack intern · Sep – Oct 2023',
    desc: 'Responsive interfaces and performance work on client web apps.',
  },
]

export const education = [
  {
    title: 'Maratha Mandal Engineering College, Belgaum',
    meta: 'B.E. in Computer Science Engineering',
    timeframe: '2020 - 2024',
    desc: "Completed a Bachelor's degree in Computer Science Engineering with a CGPA of 6.7.",
  },
  {
    title: 'Rajiv Gandhi Academy of E-Learning School & Science Junior College, Pune',
    meta: 'Science (12th Grade)',
    timeframe: '2018 - 2020',
    desc: 'Completed higher secondary education in Science with a percentage of 72.4%.',
  },
]
