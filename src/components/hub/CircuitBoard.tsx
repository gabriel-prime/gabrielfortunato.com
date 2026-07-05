import { For } from 'solid-js'
import { inputModules, outputModules } from '../../data/hub'
import Connector, { type Bend } from './Connector'
import CpuCard from './CpuCard'
import ModuleCard from './ModuleCard'
import OutputModule from './OutputModule'
import styles from './CircuitBoard.module.css'

/** Top row bends toward the centre, bottom bends up, middle runs flat. */
const bendFor = (i: number, count: number): Bend =>
  i === 0 ? 'down' : i === count - 1 ? 'up' : 'flat'

/**
 * The board stage. Three columns — inputs · CPU · outputs — where each module
 * carries its own wire as a flex sibling, so a trace is always centred on its
 * module regardless of card height. Reflows to a single stacked column on
 * small screens (wires hidden).
 */
export default function CircuitBoard() {
  return (
    <div class={styles.board}>
      <div class={styles.inputs}>
        <For each={inputModules}>
          {(module, i) => (
            <div class={styles.node}>
              <ModuleCard module={module} delay={i() + 1} />
              <Connector side="left" bend={bendFor(i(), inputModules.length)} delay={i()} />
            </div>
          )}
        </For>
      </div>

      <div class={styles.core}>
        <CpuCard />
      </div>

      <div class={styles.outputs}>
        <For each={outputModules}>
          {(output, i) => (
            <div class={styles.node}>
              <Connector side="right" bend={bendFor(i(), outputModules.length)} delay={i()} />
              <OutputModule output={output} delay={i() + 2} />
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
