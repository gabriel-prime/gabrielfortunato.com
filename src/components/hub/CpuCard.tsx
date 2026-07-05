import { createCycler } from '../../lib/primitives'
import { cpuWords } from '../../data/hub'
import Icon from './icons'
import styles from './CpuCard.module.css'

/**
 * The board's centerpiece: a processor card whose inset LCD cycles through the
 * kinds of product it powers. The word, slider position and auto-advance are
 * all driven by a single reactive index — no imperative DOM juggling.
 */
export default function CpuCard() {
  const { index, next, prev } = createCycler(cpuWords.length, { interval: 2800 })
  const sliderLeft = () => `${8 + index() * (84 / cpuWords.length)}%`

  return (
    <div class={styles.card}>
      <div class={styles.top}>
        <div class={styles.pins}>
          <span data-hot="" />
          <span data-hot="" />
          <span />
        </div>
        <span class={styles.chip}>
          <Icon name="chip" size={22} />
        </span>
      </div>

      <h1 class={styles.title}>
        O motor
        <br />
        full stack
      </h1>

      <p class={styles.lead}>
        A base de engenharia que o seu próximo produto digital precisa — do primeiro commit ao
        deploy.
      </p>

      <div class={styles.lcd}>
        <button type="button" class={styles.lcdBtn} onClick={prev} aria-label="Anterior">
          ‹
        </button>
        <div class={styles.display} aria-live="polite">
          <span class={styles.word}>{cpuWords[index()]}</span>
          <span class={styles.scan} aria-hidden="true" />
        </div>
        <button type="button" class={styles.lcdBtn} onClick={next} aria-label="Próximo">
          ›
        </button>
      </div>

      <div class={styles.groove} aria-hidden="true">
        <span class={styles.knob} style={{ left: sliderLeft() }} />
      </div>
    </div>
  )
}
