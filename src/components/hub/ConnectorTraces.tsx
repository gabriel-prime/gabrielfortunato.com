import styles from './ConnectorTraces.module.css'

/**
 * Circuit traces linking the input/output columns to the CPU. The `left`
 * variant is drawn; the right column mirrors it via CSS. Decorative, so it is
 * marked aria-hidden and hidden entirely on narrow screens.
 */
export default function ConnectorTraces(props: { side: 'left' | 'right' }) {
  return (
    <svg
      class={styles.traces}
      data-side={props.side}
      viewBox="0 0 130 620"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g class={styles.base}>
        <path d="M0,90 L38,90 L60,122 L130,122" />
        <path d="M0,102 L34,102 L56,134 L130,134" />
        <path d="M0,310 L130,310" />
        <path d="M0,322 L130,322" />
        <path d="M0,530 L38,530 L60,498 L130,498" />
        <path d="M0,542 L34,542 L56,510 L130,510" />
      </g>
      <g class={styles.flow}>
        <path d="M0,90 L38,90 L60,122 L130,122" />
        <path d="M0,310 L130,310" />
        <path d="M0,530 L38,530 L60,498 L130,498" />
      </g>
    </svg>
  )
}
