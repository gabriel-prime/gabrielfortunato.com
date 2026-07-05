import { A } from '@solidjs/router'
import { For } from 'solid-js'
import type { HubOutput } from '../../data/hub'
import { useEntrance } from '../../lib/entrance'
import Icon from './icons'
import styles from './OutputModule.module.css'

/** An output node — a kind of product the board ships, with its stack. */
export default function OutputModule(props: { output: HubOutput; delay?: number }) {
  const { entered } = useEntrance()
  return (
    <A
      href={props.output.href}
      class={styles.wrap}
      data-enter={entered() ? '' : undefined}
      style={{ 'animation-delay': `${(props.delay ?? 0) * 0.1}s` }}
      aria-label={`${props.output.label} — ${props.output.desc}`}
    >
      <div class={styles.card}>
        <div class={styles.text}>
          <div class={styles.label}>{props.output.label}</div>
          <div class={styles.desc}>{props.output.desc}</div>
        </div>
        <span class={styles.badge}>
          <Icon name={props.output.icon} size={15} />
        </span>
      </div>

      <div class={styles.meta}>
        <div class={styles.tags}>
          <For each={props.output.tags}>{(tag) => <span class={styles.tag}>{tag}</span>}</For>
        </div>
        <span class={styles.go} aria-hidden="true">→</span>
      </div>
    </A>
  )
}
