import { createEffect, createSignal, For, onCleanup, Show } from 'solid-js'
import { useEntrance } from '../../lib/entrance'
import styles from './GateLoader.module.css'

const TICKS = Array.from({ length: 18 }, (_, i) => i)

/** The machined hardware repeated on each door (top + bottom mirror it). */
function PanelHardware() {
  return (
    <>
      <span class={styles.seam} />
      <span class={styles.plate} />
      <span class={styles.rail} data-side="l" />
      <span class={styles.rail} data-side="r" />
      <span class={styles.vents} />
      <span class={styles.screw} data-side="l" />
      <span class={styles.screw} data-side="r" />
    </>
  )
}

/**
 * Intro gate: two brushed-metal doors that retract to reveal the board, joined
 * by a central docking plate, side rails, screws and vents. The loader (spinning
 * mark, filling ticks, percentage) sits on the seam. Reactive off signals; the
 * whole overlay unmounts once the doors finish sliding.
 */
export default function GateLoader() {
  const { progress, entered: open } = useEntrance()
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
          <div class={styles.hardware}>
            <PanelHardware />
          </div>
        </div>
        <div class={styles.panelBottom}>
          <div class={styles.hardware} data-flip="">
            <PanelHardware />
          </div>
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
