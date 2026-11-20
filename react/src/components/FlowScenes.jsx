import { motion } from 'framer-motion'

/**
 * Small animated scenes that *show* what a layer does when the flow reaches
 * it: the form fills itself, the API logs the call, the row lands in the
 * table, the mail arrives, the deploy goes green. One generic scene per layer
 * type, picked from the layer title and tools, so every project page gets
 * them without per-project artwork. Each scene replays whenever `step`
 * changes while it is lit; `label` is the current flow step text.
 */
const kinds = [
  ['email', /mail|resend|brevo|sendgrid|smtp/],
  ['auth', /auth|login|session|oauth|role/],
  ['pay', /pay|stripe|razorpay|checkout|upi|split/],
  ['data', /data|postgres|mongo|prisma|sql|store|supabase|db|offline/],
  ['ai', /\bai\b|prompt|llm|openai|gpt|score/],
  ['host', /host|netlify|vercel|deploy|domain|https|cdn/],
  ['api', /api|express|server|route|node|function|edge/],
  ['ui', /front|react|next|html|landing|app ui|page|vite|tailwind|design system|screen/],
  ['brand', /identity|logo|mark|brand|wordmark|colour|color|type/],
  ['digital', /digital|icon|favicon|token|web kit|social|cover|post/],
  ['print', /physical|print|jacket|helmet|box|pack|merch|stationery/],
  ['research', /research|interview|audit|competitor|persona|brief/],
  ['wire', /wire|flow|sketch|lo-fi|structure|ia\b/],
  ['proto', /proto|hi-fi|visual|handoff|launch|ship/],
]
const stepKinds = [
  ['visit', /^(visitor|user|buyer|shopper|customer|admin|lands|types|arrives|picks|browses|searches|pastes|adds|logs)/],
  ['req', /^(post|get|put|enquiry form|submit|download|git push|jwt|token)/],
  ['done', /(confirmed|back to the ui|chart|inbox|lead list|charts|^visitor$)/],
]
export function sceneKind(layer, label = '') {
  const l = String(label).toLowerCase()
  const byStep = stepKinds.find(([, re]) => re.test(l))
  if (byStep && !(byStep[0] === 'done' && /^visitor$/.test(l))) return byStep[0]
  const t = [layer.title, ...(layer.items || [])].join(' ').toLowerCase()
  return (kinds.find(([, re]) => re.test(t)) || ['default'])[0]
}

const ease = [0.22, 1, 0.36, 1]
const seq = (i, base = 0.15) => ({ delay: base * i, duration: 0.45, ease })
const typing = (i) => ({ delay: 0.35 * i, duration: 0.5, ease: 'linear' })

function Frame({ children, bar = true }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md border border-white/15 bg-black/5">
      {bar && (
        <div className="flex gap-1 border-b border-white/10 px-2 py-1.5">
          <span className="size-1.5 rounded-full bg-white/25" />
          <span className="size-1.5 rounded-full bg-white/25" />
          <span className="size-1.5 rounded-full bg-white/25" />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 top-[22px] p-2.5">{children}</div>
    </div>
  )
}

function Line({ w = '100%', i = 0, accent }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={typing(i)}
      style={{ width: w, originX: 0 }}
      className={`block h-1.5 rounded-full ${accent ? 'bg-accent' : 'bg-white/30'}`}
    />
  )
}

function Check({ i = 2 }) {
  return (
    <motion.svg viewBox="0 0 24 24" className="size-5 text-accent" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d="M5 13l4 4L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 * i, duration: 0.4, ease }} />
    </motion.svg>
  )
}

const scenes = {
  ui: ({ label }) => (
    <Frame>
      <div className="flex h-full flex-col gap-2">
        <Line w="55%" i={0} />
        <div className="rounded border border-white/20 px-2 py-1"><Line w="70%" i={1} /></div>
        <div className="rounded border border-white/20 px-2 py-1"><Line w="45%" i={2} /></div>
        <motion.div initial={{ opacity: 0.4 }} animate={{ opacity: 1, scale: [1, 0.96, 1] }} transition={{ delay: 1.2, duration: 0.4 }} className="mt-auto rounded bg-accent px-2 py-1 text-center text-[11px] font-medium leading-none text-black">
          {label}
        </motion.div>
      </div>
    </Frame>
  ),
  api: ({ label }) => (
    <Frame>
      <div className="font-mono text-[11px] leading-5 text-white/80">
        {[`> ${label}`, 'validate  ok', 'handle    ok', '200 · 48ms'].map((l, i) => (
          <motion.div key={l} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={seq(i, 0.3)} className={i === 3 ? 'text-accent' : ''}>
            {l}
          </motion.div>
        ))}
      </div>
    </Frame>
  ),
  auth: ({ label }) => (
    <Frame>
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <motion.svg viewBox="0 0 24 24" className="size-9 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <motion.path d="M8 11V7a4 4 0 0 1 8 0v4" initial={{ rotate: 0 }} animate={{ rotate: -25, x: -2 }} transition={{ delay: 0.9, duration: 0.4, ease }} style={{ originX: '8px', originY: '11px' }} />
        </motion.svg>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-[11px] text-accent">{label}</motion.span>
      </div>
    </Frame>
  ),
  data: ({ label }) => (
    <Frame>
      <div className="flex flex-col gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex gap-1.5">
            <Line w="25%" i={0} /><Line w="40%" i={0} /><Line w="20%" i={0} />
          </div>
        ))}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.4, ease }} className="flex items-center gap-1.5 rounded bg-accent/15 px-1.5 py-1">
          <Line w="25%" accent /><Line w="40%" accent /><span className="ml-auto text-[10px] text-accent">+1</span>
        </motion.div>
        <span className="mt-1 truncate text-[11px] text-white/70">{label}</span>
      </div>
    </Frame>
  ),
  email: ({ label }) => (
    <Frame>
      <div className="relative flex h-full flex-col gap-1.5">
        {[0, 1].map((i) => <div key={i} className="flex items-center gap-2 rounded border border-white/10 px-2 py-1.5"><span className="size-2 rounded-full bg-white/25" /><Line w="60%" i={0} /></div>)}
        <motion.div initial={{ x: '110%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.6, ease }} className="flex items-center gap-2 rounded border border-accent bg-accent/15 px-2 py-1.5">
          <span className="size-2 rounded-full bg-accent" /><span className="truncate text-[11px] text-white">{label}</span>
        </motion.div>
      </div>
    </Frame>
  ),
  pay: ({ label }) => (
    <Frame>
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <motion.div initial={{ x: -30, rotate: -8, opacity: 0 }} animate={{ x: 0, rotate: 0, opacity: 1 }} transition={{ duration: 0.6, ease }} className="h-10 w-16 rounded border border-white/30 bg-white/10 p-1.5">
          <span className="block h-2 w-4 rounded-sm bg-accent" />
        </motion.div>
        <div className="flex items-center gap-1 text-[11px] text-accent"><Check i={3} />{label}</div>
      </div>
    </Frame>
  ),
  ai: ({ label }) => (
    <Frame>
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] text-white/60">{label}</span>
        {[90, 75, 60].map((w, i) => <Line key={w} w={`${w}%`} i={i + 1} accent={i === 0} />)}
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0, 1] }} transition={{ delay: 0.4, duration: 1.4 }} className="h-3 w-1 bg-accent" />
      </div>
    </Frame>
  ),
  host: ({ label }) => (
    <Frame>
      <div className="flex h-full flex-col justify-center gap-2">
        <span className="text-[11px] text-white/70">{label}</span>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <motion.span initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, ease }} className="block h-full bg-accent" />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-accent"><Check i={4} />live</div>
      </div>
    </Frame>
  ),
  brand: ({ label }) => (
    <Frame bar={false}>
      <div className="flex h-full items-center justify-center gap-3">
        <motion.span initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease }} className="grid size-10 place-items-center rounded-full bg-accent font-display text-lg text-black">a</motion.span>
        <div className="flex flex-col gap-1.5"><Line w="48px" i={1} /><Line w="32px" i={2} accent /></div>
        <span className="sr-only">{label}</span>
      </div>
    </Frame>
  ),
  digital: ({ label }) => (
    <Frame bar={false}>
      <div className="grid h-full grid-cols-4 gap-1.5">
        {[...Array(8)].map((_, i) => (
          <motion.span key={i} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={seq(i, 0.1)} className={`rounded ${i % 3 === 0 ? 'bg-accent' : 'bg-white/20'}`} />
        ))}
      </div>
      <span className="sr-only">{label}</span>
    </Frame>
  ),
  print: ({ label }) => (
    <Frame bar={false}>
      <div className="flex h-full items-end justify-center gap-2">
        {[28, 40, 34].map((h, i) => (
          <motion.span key={h} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={seq(i, 0.2)} style={{ height: h }} className={`w-8 rounded-t ${i === 1 ? 'bg-accent' : 'bg-white/25'}`} />
        ))}
      </div>
      <span className="sr-only">{label}</span>
    </Frame>
  ),
  research: ({ label }) => (
    <Frame>
      <div className="flex flex-col gap-1.5">
        {[['Who', 70], ['Why', 55], ['What', 85]].map(([k, w], i) => (
          <div key={k} className="flex items-center gap-2 text-[10px] text-white/60"><span className="w-7">{k}</span><Line w={`${w}%`} i={i} accent={i === 2} /></div>
        ))}
        <span className="mt-1 truncate text-[11px] text-white/70">{label}</span>
      </div>
    </Frame>
  ),
  wire: ({ label }) => (
    <Frame>
      <div className="grid h-full grid-cols-3 gap-1.5">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={seq(0)} className="col-span-3 h-4 rounded border border-dashed border-white/40" />
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={seq(1)} className="col-span-2 rounded border border-dashed border-white/40" />
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={seq(2)} className="rounded border border-dashed border-accent" />
      </div>
      <span className="sr-only">{label}</span>
    </Frame>
  ),
  proto: ({ label }) => (
    <Frame>
      <div className="relative h-full">
        <div className="flex flex-col gap-1.5"><Line w="60%" i={0} /><Line w="90%" i={1} /><Line w="40%" i={2} accent /></div>
        <motion.svg viewBox="0 0 24 24" className="absolute right-2 top-4 size-5 text-accent" fill="currentColor" initial={{ x: 30, y: 30, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1, scale: [1, 0.85, 1] }} transition={{ delay: 0.6, duration: 0.8, ease }}>
          <path d="M5 3l14 9-7 1-4 7z" />
        </motion.svg>
        <span className="sr-only">{label}</span>
      </div>
    </Frame>
  ),
}
scenes.visit = ({ label }) => (
  <Frame>
    <div className="relative h-full">
      <div className="flex flex-col gap-1.5"><Line w="50%" i={0} /><Line w="80%" i={0} /></div>
      <motion.span initial={{ scale: 0.6, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1, duration: 0.3 }} className="absolute bottom-2 left-2 rounded bg-accent px-2 py-1 text-[11px] font-medium text-black">{label}</motion.span>
      <motion.svg viewBox="0 0 24 24" className="absolute size-5 text-white" fill="currentColor" initial={{ x: 120, y: 10, opacity: 0 }} animate={{ x: 44, y: 54, opacity: 1 }} transition={{ duration: 0.9, ease }}>
        <path d="M4 3l7 17 2-7 7-2z" />
      </motion.svg>
      <motion.span initial={{ scale: 0, opacity: 0.6 }} animate={{ scale: 2.4, opacity: 0 }} transition={{ delay: 1, duration: 0.6 }} className="absolute bottom-3 left-3 size-3 rounded-full border border-accent" />
    </div>
  </Frame>
)
scenes.req = ({ label }) => (
  <Frame>
    <div className="relative flex h-full items-center">
      <span className="h-px w-full bg-white/20" />
      <motion.span initial={{ left: '0%', opacity: 0 }} animate={{ left: ['0%', '60%'], opacity: 1 }} transition={{ duration: 1, ease }} className="absolute -translate-y-1/2 rounded border border-accent bg-accent/15 px-2 py-1 font-mono text-[10px] text-white">
        {label}
      </motion.span>
      <span className="absolute right-0 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-white/40" />
    </div>
  </Frame>
)
scenes.done = ({ label }) => (
  <Frame>
    <div className="flex h-full flex-col items-center justify-center gap-1.5">
      <Check i={1} />
      <span className="text-[11px] text-accent">{label}</span>
    </div>
  </Frame>
)
scenes.default = scenes.proto

export function Scene({ layer, label, step }) {
  const S = scenes[sceneKind(layer, label)]
  return (
    <div key={step} className="aspect-[16/9] w-full">
      <S label={label} />
    </div>
  )
}
