/**
 * Hero entrance choreography, transcribed from the anime.js timeline in
 * js/main.js.
 *
 *   const tl = anime.timeline({ easing: 'easeInOutCubic', duration: 800 })
 *     .add({ '#loader',    opacity: 0, duration: 1000 })          // 0    → 1000
 *     .add({ '#preloader', opacity: 0 })                          // 1000 → 1800
 *     .add({ '.s-header',  translateY: [-100, 0] }, '-=200')      // 1600 → 2400
 *     .add({ '.s-intro .text-pretitle', '.s-intro .text-huge-title',
 *            translateX: [100, 0], delay: stagger(400) })         // 2400 → 3600
 *     .add({ '.circles span', keyframes: [...],
 *            delay: stagger(100, reverse) })                      // 3600 → 5200
 *     .add({ '.intro-social li', translateX: [-50, 0],
 *            delay: stagger(100, reverse) })                      // 5200 →
 *     .add({ '.intro-scrolldown', translateY: [100, 0] }, '-=800')
 *
 * Offsets below are measured from the header's entrance (t=1600 above), since
 * the 1.6s preloader head start doesn't apply here — this build has no
 * blocking loader to wait out. Everything after that keeps the original's
 * order, gaps, per-element staggers, durations and easing.
 *
 * HERO_SCALE compresses the whole sequence uniformly — every delay, duration
 * and stagger scales by it, so the choreography is unchanged, just faster.
 * 1 is the original's pacing (last element lands ~4.5s). It is set to 0.6,
 * which brings that to ~2.7s with the circles starting at 1.26s.
 */
export const EASE_IN_OUT_CUBIC = [0.645, 0.045, 0.355, 1]
export const EASE_OUT_SOFT = [0.215, 0.61, 0.355, 1]

export const HERO_SCALE = 0.6

const at = (seconds) => +(seconds * HERO_SCALE).toFixed(3)

/** anime's timeline default, scaled. */
export const HERO_DURATION = at(0.8)

export const HERO_DELAY = {
  header: at(0.1),
  pretitle: at(0.9), // 800ms after the header starts
  title: at(1.3), // 400ms stagger behind the pretitle
  circles: at(2.1), // begins once the intro text block completes
  social: at(3.7), // begins once the circles block completes
  scrolldown: at(3.7), // '-=800' overlaps it with the social rail
}

/** Reverse stagger: last item first, `step` seconds apart. */
export const reverseStagger = (index, count, step = 0.1) =>
  (count - 1 - index) * step * HERO_SCALE
