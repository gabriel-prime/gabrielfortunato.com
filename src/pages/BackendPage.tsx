import { For } from 'solid-js'
import PageMeta from '../components/PageMeta'
import PremiumHero from '../components/premium/PremiumHero'
import { reveal } from '../lib/directives'

void reveal

const backendTracks = [
  {
    title: 'APIs em Go',
    description: 'Serviços pequenos, tipados, observáveis e pensados para operar em VPS própria.',
  },
  {
    title: 'Arquitetura',
    description:
      'Separação de redes, banco isolado, reverse proxy, containers e deploys reproduzíveis.',
  },
  {
    title: 'Operação',
    description:
      'Backups, monitoramento, logs, healthchecks e automatizações que tornam o sistema confiável.',
  },
] as const

const flow = ['Internet', 'Caddy', 'Docker network', 'Go API', 'Postgres privado'] as const

export default function BackendPage() {
  return (
    <>
      <PageMeta
        title="Backend | Gabriel Fortunato"
        description="Projetos backend e arquitetura de Gabriel Fortunato com Go, Docker, Postgres e infraestrutura própria."
      />

      <PremiumHero
        badge="Backend · Go"
        title="Sistemas que duram"
        titleText="Sistemas que duram"
        lead="Menos brilho visual, mais desenho técnico: fluxos, diagramas, contratos, operação e segurança."
        primary={{ label: 'Ver projetos', href: '/projetos' }}
      />

      <section class="p-section">
        <div class="p-heading">
          <p class="p-eyebrow">Arquitetura</p>
          <h2>Uma requisição, do proxy ao banco privado.</h2>
        </div>

        <div class="p-diagram" use:reveal={{}}>
          <For each={flow}>
            {(node, i) => (i() === 0 || i() === flow.length - 1 ? <span>{node}</span> : <strong>{node}</strong>)}
          </For>
        </div>
      </section>

      <section class="p-section">
        <div class="p-grid cols-3">
          <For each={backendTracks}>
            {(track, i) => (
              <article class="p-card" use:reveal={{ delay: i() * 100 }}>
                <span class="p-card-kicker">system design</span>
                <h3>{track.title}</h3>
                <p>{track.description}</p>
              </article>
            )}
          </For>
        </div>
      </section>
    </>
  )
}
