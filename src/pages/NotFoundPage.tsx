import { A } from '@solidjs/router'
import PageMeta from '../components/PageMeta'

export default function NotFoundPage() {
  return (
    <section class="p-section" style={{ 'text-align': 'center', 'padding-top': '12vh' }}>
      <PageMeta
        title="Página não encontrada | Gabriel Fortunato"
        description="A página solicitada não existe."
      />

      <p class="p-eyebrow">404</p>
      <div class="p-heading" style={{ margin: '0 auto 32px' }}>
        <h1>Página não encontrada</h1>
        <p>Essa rota ainda não existe ou foi movida.</p>
      </div>
      <A class="p-btn" href="/">
        Voltar para o início
      </A>
    </section>
  )
}
