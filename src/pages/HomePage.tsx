import { A } from '@solidjs/router'
import CircuitBoard from '../components/hub/CircuitBoard'
import PageMeta from '../components/PageMeta'
import { useEntrance } from '../lib/entrance'
import styles from './HomePage.module.css'

/**
 * The hub — a focused dispatcher, not a landing page. One board whose modules
 * are the doors into each discipline; the nav and the CTA carry the rest.
 * No marketing scroll: you arrive, you choose, you leave.
 */
export default function HomePage() {
  const { entered } = useEntrance()
  return (
    <>
      <PageMeta
        title="Gabriel Fortunato — Hub de engenharia full stack"
        description="Hub de engenharia de Gabriel Fortunato. Escolha um caminho: frontend, backend, infraestrutura, projetos ou blog."
      />

      <section class={styles.stage} aria-label="Placa de engenharia — escolha um caminho">
        <CircuitBoard />

        <div class={styles.cta} data-enter={entered() ? '' : undefined}>
          <A href="/contato" class={styles.ctaButton} aria-label="Iniciar projeto">
            <span class={styles.ctaGlyph} />
          </A>
          <span class={styles.ctaLabel}>INICIAR PROJETO</span>
        </div>
      </section>
    </>
  )
}
