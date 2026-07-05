import { A } from '@solidjs/router'
import type { HubOutput } from '../../data/hub'
import { useEntrance } from '../../lib/entrance'
import Icon from './icons'
import styles from './OutputModule.module.css'

/** An output node — a deploy slot shipping a class of product. */
export default function OutputModule(props: { output: HubOutput; delay?: number }) {
  const { entered } = useEntrance()
  return (
    <A
      href={props.output.href}
      class={styles.wrap}
      data-enter={entered() ? '' : undefined}
      style={{ 'animation-delay': `${(props.delay ?? 0) * 0.1}s` }}
      aria-label={`${props.output.label} — ${props.output.slot}`}
    >
      <div class={styles.card}>
        <div>
          <div class={styles.label}>{props.output.label}</div>
          <div class={styles.slot}>{props.output.slot}</div>
        </div>
        <span class={styles.badge}>
          <Icon name={props.output.icon} size={15} />
        </span>
      </div>
      <div class={styles.tray}>
        <span class={styles.dot} data-on="" />
        <span class={styles.dot} />
      </div>
    </A>
  )
}
