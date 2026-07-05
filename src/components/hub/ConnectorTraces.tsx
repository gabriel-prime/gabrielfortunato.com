import { useEntrance } from '../../lib/entrance'
import styles from './ConnectorTraces.module.css'

/**
 * Circuit traces linking a module column to the CPU. On entrance each line
 * *draws* from the module toward the centre (stroke reveal), then the ember
 * current starts flowing — so the connection forms with the cards instead of
 * sitting there fixed. `left` is drawn; `right` mirrors it via CSS. Decorative,
 * hidden on narrow screens.
 */
export default function ConnectorTraces(props: { side: 'left' | 'right' }) {
  const { entered } = useEntrance()

  return (
    <svg
      class={styles.traces}
      data-side={props.side}
      data-enter={entered() ? '' : undefined}
      viewBox="0 0 130 620"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g class={styles.base}>
        <path pathLength="1" d="M0,90 L38,90 L60,122 L130,122" />
        <path pathLength="1" d="M0,102 L34,102 L56,134 L130,134" />
        <path pathLength="1" d="M0,310 L130,310" />
        <path pathLength="1" d="M0,322 L130,322" />
        <path pathLength="1" d="M0,530 L38,530 L60,498 L130,498" />
        <path pathLength="1" d="M0,518 L34,518 L56,486 L130,486" />
      </g>
      <g class={styles.flow}>
        <path d="M0,90 L38,90 L60,122 L130,122" />
        <path d="M0,310 L130,310" />
        <path d="M0,530 L38,530 L60,498 L130,498" />
      </g>
    </svg>
  )
}
