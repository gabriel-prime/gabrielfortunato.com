import { For } from 'solid-js'
import { inputModules, outputModules } from '../../data/hub'
import ConnectorTraces from './ConnectorTraces'
import CpuCard from './CpuCard'
import ModuleCard from './ModuleCard'
import OutputModule from './OutputModule'
import styles from './CircuitBoard.module.css'

/**
 * The board stage. A genuinely responsive 5-track grid on desktop
 * (inputs · traces · CPU · traces · outputs) that reflows to a single
 * stacked column on small screens — no fixed-canvas scaling hacks.
 */
export default function CircuitBoard() {
  return (
    <div class={styles.board}>
      <div class={styles.inputs}>
        <For each={inputModules}>
          {(module, i) => <ModuleCard module={module} delay={i() + 1} />}
        </For>
      </div>

      <ConnectorTraces side="left" />

      <div class={styles.core}>
        <CpuCard />
      </div>

      <ConnectorTraces side="right" />

      <div class={styles.outputs}>
        <For each={outputModules}>
          {(output, i) => <OutputModule output={output} delay={i() + 2} />}
        </For>
      </div>
    </div>
  )
}
