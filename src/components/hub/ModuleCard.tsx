import { A } from '@solidjs/router'
import type { HubModule } from '../../data/hub'
import { parallax } from '../../lib/directives'
import { useEntrance } from '../../lib/entrance'
import Icon from './icons'
import styles from './ModuleCard.module.css'

// Referenced so the `use:parallax` directive is retained by the compiler.
void parallax

/** An input module on the board — a neumorphic tile that routes to a page. */
export default function ModuleCard(props: { module: HubModule; delay?: number }) {
  const { entered } = useEntrance()
  return (
    <A
      href={props.module.href}
      class={styles.card}
      data-enter={entered() ? '' : undefined}
      style={{ 'animation-delay': `${(props.delay ?? 0) * 0.1}s` }}
      aria-label={`Ir para ${props.module.label}`}
    >
      <div class={styles.head}>
        <span class={styles.badge} use:parallax={{ depth: 5 }}>
          <Icon name={props.module.icon} size={17} />
        </span>
        <span class={styles.led} aria-hidden="true" />
      </div>
      <span class={styles.label}>{props.module.label}</span>
    </A>
  )
}
