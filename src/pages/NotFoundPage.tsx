import { A } from '@solidjs/router'
import PageMeta from '../components/PageMeta'

export default function NotFoundPage() {
  return (
    <section class="page-header not-found">
      <PageMeta
        title="Pagina nao encontrada | Gabriel Fortunato"
        description="A pagina solicitada nao existe."
      />

      <p class="eyebrow">404</p>
      <h1>Pagina nao encontrada</h1>
      <p>Essa rota ainda nao existe ou foi movida.</p>
      <A class="button primary" href="/">
        Voltar para inicio
      </A>
    </section>
  )
}
