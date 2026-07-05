import { createEffect, createSignal, For, onCleanup, Show } from 'solid-js'
import { createGate } from '../../lib/primitives'
import styles from './GateLoader.module.css'

const TICKS = Array.from({ length: 18 }, (_, i) => i)

/**
 * Intro gate: split panels that retract to reveal the board, with a loader
 * (spinning mark, filling ticks, percentage). Purely reactive — the panels
 * animate off [data-open], and the whole overlay unmounts once the slide
 * finishes so it never traps focus or paints over the page.
 */
export default function GateLoader() {
  const { progress, open } = createGate({ duration: 2200 })
  const [removed, setRemoved] = createSignal(false)

  createEffect(() => {
    if (!open()) return
    const timer = setTimeout(() => setRemoved(true), 1300)
    onCleanup(() => clearTimeout(timer))
  })

  const pct = () => Math.round(progress() * 100)
  const filled = () => Math.round(progress() * TICKS.length)

  return (
    <Show when={!removed()}>
      <div class={styles.gate} data-open={open() ? '' : undefined} aria-hidden="true">
        <div class={styles.panelTop}>
          <span class={styles.seam} />
        </div>
        <div class={styles.panelBottom}>
          <span class={styles.seam} />
        </div>

        <Show when={!open()}>
          <div class={styles.loader}>
            <span class={styles.mark}>
              <span class={styles.markCore} />
            </span>

            <div class={styles.ticks}>
              <For each={TICKS}>
                {(i) => (
                  <span
                    class={styles.tick}
                    data-state={i < filled() ? (i === filled() - 1 ? 'edge' : 'on') : 'off'}
                  />
                )}
              </For>
            </div>

            <div class={styles.status}>
              <span class={styles.statusLabel}>CONECTANDO_</span>
              <span class={styles.statusPct}>{pct()}%</span>
            </div>
          </div>
        </Show>
      </div>
    </Show>
  )
}
