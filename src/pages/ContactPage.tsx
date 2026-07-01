import { For } from 'solid-js'
import PageMeta from '../components/PageMeta'

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/gabriel-prime',
    description: 'Repositorios, estudos e projetos publicados.',
  },
  {
    label: 'API status',
    href: 'https://api.gabrielfortunato.com/health',
    description: 'Healthcheck publico da API Go.',
  },
  {
    label: 'Dominio',
    href: 'https://gabrielfortunato.com',
    description: 'Ponto central para site, blog e projetos.',
  },
] as const

export default function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contato | Gabriel Fortunato"
        description="Links principais de Gabriel Fortunato."
      />

      <section class="page-header">
        <p class="eyebrow">Contato</p>
        <h1>Onde me encontrar</h1>
        <p>
          Por enquanto, este espaco concentra os links publicos que fazem parte da stack pessoal.
        </p>
      </section>

      <section class="card-grid">
        <For each={links}>
          {(link) => (
          <article class="card">
            <h3>{link.label}</h3>
            <p>{link.description}</p>
            <a class="inline-link" href={link.href}>
              Abrir <span aria-hidden="true">-&gt;</span>
            </a>
          </article>
          )}
        </For>
      </section>
    </>
  )
}
