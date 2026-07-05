import { A } from '@solidjs/router'
import CircuitBoard from '../components/hub/CircuitBoard'
import PageMeta from '../components/PageMeta'
import styles from './HomePage.module.css'

/**
 * The hub — a focused dispatcher, not a landing page. One board whose modules
 * are the doors into each discipline; the nav and the CTA carry the rest.
 * No marketing scroll: you arrive, you choose, you leave.
 */
export default function HomePage() {
  return (
    <>
      <PageMeta
        title="Gabriel Fortunato — Hub de engenharia full stack"
        description="Hub de engenharia de Gabriel Fortunato. Escolha um caminho: frontend, backend, infraestrutura, projetos ou blog."
      />

      <section class={styles.stage} aria-label="Placa de engenharia — escolha um caminho">
        <CircuitBoard />

        <div class={styles.cta}>
          <A href="/contato" class={styles.ctaButton} aria-label="Iniciar projeto">
            <span class={styles.ctaGlyph} />
          </A>
          <span class={styles.ctaLabel}>INICIAR PROJETO</span>
        </div>
      </section>
    </>
  )
}
