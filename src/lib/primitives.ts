import { createSignal, onCleanup, type Accessor } from 'solid-js'

/**
 * A self-advancing carousel index. Auto-cycles on an interval; manual
 * next/prev restart the timer so a deliberate click is never immediately
 * overridden. Fully reactive — no imperative DOM writes.
 */
export function createCycler(
  length: number,
  options: { interval?: number } = {},
): {
  index: Accessor<number>
  next: () => void
  prev: () => void
} {
  const { interval = 2800 } = options
  const [index, setIndex] = createSignal(0)

  const move = (dir: number) => setIndex((i) => (i + dir + length) % length)

  let timer: ReturnType<typeof setInterval>
  const start = () => {
    clearInterval(timer)
    timer = setInterval(() => move(1), interval)
  }
  start()
  onCleanup(() => clearInterval(timer))

  return {
    index,
    next: () => {
      move(1)
      start()
    },
    prev: () => {
      move(-1)
      start()
    },
  }
}

/**
 * Drives the intro gate: an eased progress value from 0 → 1 over `duration`,
 * then flips `open`. Skips entirely (progress 1, open true) when the visitor
 * has already seen it this session or prefers reduced motion — so it delights
 * once without ever getting in the way.
 */
export function createGate(options: { duration?: number } = {}): {
  progress: Accessor<number>
  open: Accessor<boolean>
} {
  const { duration = 2000 } = options
  const [progress, setProgress] = createSignal(0)
  const [open, setOpen] = createSignal(false)

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const alreadySeen =
    typeof sessionStorage !== 'undefined' &&
    sessionStorage.getItem('gf-gate-seen') === '1'

  if (reducedMotion || alreadySeen) {
    setProgress(1)
    setOpen(true)
    return { progress, open }
  }

  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('gf-gate-seen', '1')
  }

  const start = performance.now()
  let raf = 0
  const step = (now: number) => {
    const raw = Math.min(1, (now - start) / duration)
    // Ease-out so the counter decelerates into 100%.
    setProgress(1 - Math.pow(1 - raw, 2.2))
    if (raw < 1) {
      raf = requestAnimationFrame(step)
    } else {
      setOpen(true)
    }
  }
  raf = requestAnimationFrame(step)
  onCleanup(() => cancelAnimationFrame(raf))

  return { progress, open }
}
