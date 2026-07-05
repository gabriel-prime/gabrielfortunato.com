import { onCleanup, type Accessor } from 'solid-js'

/*
 * Custom Solid directives that replace the imperative window listeners from
 * the original design export with declarative, self-cleaning primitives.
 *
 *   use:parallax={{ depth: 26 }}   — pointer-driven depth translation
 *   use:reveal={{ delay: 120 }}    — reveal-on-scroll via IntersectionObserver
 *
 * Both honor prefers-reduced-motion and share a single throttled resource so
 * N elements never mean N listeners.
 */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ------------------------------------------------------------------ *
 * Shared pointer: one mousemove listener, one rAF, many subscribers.
 * Exposes normalized coordinates in the range [-0.5, 0.5].
 * ------------------------------------------------------------------ */
type PointerSubscriber = (nx: number, ny: number) => void

const subscribers = new Set<PointerSubscriber>()
let pointerX = 0
let pointerY = 0
let frameQueued = false
let listening = false

function flush() {
  frameQueued = false
  const nx = pointerX / window.innerWidth - 0.5
  const ny = pointerY / window.innerHeight - 0.5
  for (const notify of subscribers) notify(nx, ny)
}

function onPointerMove(event: MouseEvent) {
  pointerX = event.clientX
  pointerY = event.clientY
  if (!frameQueued) {
    frameQueued = true
    requestAnimationFrame(flush)
  }
}

function subscribePointer(subscriber: PointerSubscriber): () => void {
  subscribers.add(subscriber)
  if (!listening) {
    window.addEventListener('mousemove', onPointerMove, { passive: true })
    listening = true
  }
  return () => {
    subscribers.delete(subscriber)
    if (subscribers.size === 0 && listening) {
      window.removeEventListener('mousemove', onPointerMove)
      listening = false
    }
  }
}

export type ParallaxOptions = {
  /** Translation amplitude in px at the viewport edge. Negative inverts. */
  readonly depth?: number
  /** Optional rotation amplitude in degrees, tied to horizontal pointer. */
  readonly rotate?: number
}

export function parallax(el: HTMLElement, value: Accessor<ParallaxOptions>) {
  if (prefersReducedMotion()) return

  const dispose = subscribePointer((nx, ny) => {
    const { depth = 20, rotate = 0 } = value() ?? {}
    const spin = rotate ? ` rotate(${(nx * rotate).toFixed(3)}deg)` : ''
    el.style.transform = `translate3d(${(nx * depth).toFixed(2)}px, ${(ny * depth).toFixed(2)}px, 0)${spin}`
  })

  el.style.willChange = 'transform'
  onCleanup(dispose)
}

/* ------------------------------------------------------------------ *
 * Reveal on scroll — one shared IntersectionObserver.
 * ------------------------------------------------------------------ */
export type RevealOptions = {
  /** Stagger delay in ms before the element reveals. */
  readonly delay?: number
}

const revealDelays = new WeakMap<Element, number>()

let observer: IntersectionObserver | undefined

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          const delay = revealDelays.get(el) ?? 0
          window.setTimeout(() => {
            el.dataset.reveal = 'in'
          }, delay)
          observer!.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
  }
  return observer
}

export function reveal(el: HTMLElement, value: Accessor<RevealOptions>) {
  // Establish the hidden pre-state; base.css transitions from here.
  el.dataset.reveal = 'out'

  if (prefersReducedMotion()) {
    el.dataset.reveal = 'in'
    return
  }

  revealDelays.set(el, value()?.delay ?? 0)
  const io = getObserver()
  io.observe(el)
  onCleanup(() => io.unobserve(el))
}

/* Tell TypeScript about the `use:` directives so JSX typechecks. */
declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Directives {
      parallax: ParallaxOptions
      reveal: RevealOptions
    }
  }
}
