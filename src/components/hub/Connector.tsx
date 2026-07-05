import { createSignal, onCleanup, onMount } from 'solid-js'
import { useEntrance } from '../../lib/entrance'
import styles from './Connector.module.css'

export type Bend = 'down' | 'flat' | 'up'

const HEIGHT = 48 // fixed wire height (px); the width is measured at runtime
const CY = 24 // vertical centre — aligns with the module's centre
const GAP = 3 // half-distance between the two parallel traces
const CONVERGE = 10 // how far the pair steps toward the board centre
const STEP_FROM_CPU = 64 // where the bend begins, measured back from the CPU end

/**
 * Build the two parallel traces for the measured width. Because the SVG viewBox
 * matches the element's pixel size 1:1, every coordinate here is a real pixel —
 * nothing is stretched, so strokes stay crisp and the port stays a true circle.
 */
function geometry(w: number, bend: Bend) {
  const delta = bend === 'down' ? CONVERGE : bend === 'up' ? -CONVERGE : 0
  const ecy = CY + delta // pair centre at the CPU end
  const s0 = Math.max(6, w - STEP_FROM_CPU) // step start
  const s1 = Math.max(s0 + 10, w - 46) // step end
  const trace = (o: number) => `M0,${CY + o} L${s0},${CY + o} L${s1},${ecy + o} L${w},${ecy + o}`
  return { a: trace(-GAP), b: trace(GAP), portX: w - 4, portY: ecy - GAP }
}

/**
 * A circuit wire bridging one module to the CPU. Sibling of its module in a
 * vertically-centred flex row, so it always aligns with the module's centre.
 * Two parallel grey traces draw on entrance; a dashed ember current flows from
 * the card toward the CPU. `right` mirrors the whole wire (which also flips the
 * flow to still read card→centre).
 */
export default function Connector(props: { side: 'left' | 'right'; bend: Bend; delay?: number }) {
  const { entered } = useEntrance()
  const [width, setWidth] = createSignal(120)
  let el: SVGSVGElement | undefined

  onMount(() => {
    if (!el) return
    setWidth(el.getBoundingClientRect().width)
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    onCleanup(() => ro.disconnect())
  })

  const g = () => geometry(width(), props.bend)
  const stagger = () => `${(props.delay ?? 0) * 0.12}s`

  return (
    <svg
      ref={el}
      class={styles.wire}
      data-side={props.side}
      data-enter={entered() ? '' : undefined}
      style={{ '--stagger': stagger() }}
      viewBox={`0 0 ${width()} ${HEIGHT}`}
      aria-hidden="true"
    >
      <path class={styles.line} d={g().b} pathLength="1" />
      <path class={styles.line} d={g().a} pathLength="1" />
      <path class={styles.ember} d={g().a} />
      <circle class={styles.port} cx={g().portX} cy={g().portY} r="3" />
    </svg>
  )
}
