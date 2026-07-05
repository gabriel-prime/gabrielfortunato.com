import { For } from 'solid-js'
import PageMeta from '../components/PageMeta'
import { reveal } from '../lib/directives'

void reveal

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/gabriel-prime',
    description: 'Repositórios, estudos e projetos publicados.',
  },
  {
    label: 'API status',
    href: 'https://api.gabrielfortunato.com/health',
    description: 'Healthcheck público da API Go.',
  },
  {
    label: 'E-mail',
    href: 'mailto:gabripacheco634@gmail.com',
    description: 'Para conversas de projeto, freelance e vagas full-stack.',
  },
] as const

export default function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contato | Gabriel Fortunato"
        description="Links principais e canais de contato de Gabriel Fortunato."
      />

      <section class="p-section">
        <div class="p-heading">
          <p class="p-eyebrow">Contato</p>
          <h1>Vamos conversar</h1>
          <p>Disponível para projetos freelance e posições full-stack.</p>
        </div>

        <div class="p-grid cols-3">
          <For each={links}>
            {(link, i) => (
              <article class="p-card" use:reveal={{ delay: i() * 100 }}>
                <span class="p-card-kicker">canal</span>
                <h3>{link.label}</h3>
                <p>{link.description}</p>
                <a class="p-link" href={link.href} target="_blank" rel="noreferrer">
                  Abrir <span aria-hidden="true">→</span>
                </a>
              </article>
            )}
          </For>
        </div>
      </section>
    </>
  )
}
