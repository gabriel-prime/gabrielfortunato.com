import { For } from 'solid-js'
import PageMeta from '../components/PageMeta'
import PremiumHero from '../components/premium/PremiumHero'
import { reveal } from '../lib/directives'

void reveal

const frontendTracks = [
  {
    title: 'Interfaces premium',
    description:
      'Experimentos focados em composição visual, microinterações, responsividade e acabamento fino.',
  },
  {
    title: 'Design systems',
    description:
      'Tokens, componentes reutilizáveis, estados acessíveis e consistência visual entre telas.',
  },
  {
    title: 'Fronts performáticos',
    description:
      'Aplicações leves com SolidJS, Vite, build estático e deploy previsível em container.',
  },
] as const

export default function FrontendPage() {
  return (
    <>
      <PageMeta
        title="Frontend | Gabriel Fortunato"
        description="Projetos frontend de Gabriel Fortunato com interfaces premium, SolidJS, design fino e performance."
      />

      <PremiumHero
        badge="Frontend · SolidJS"
        title="Interfaces com ritmo"
        titleText="Interfaces com ritmo"
        lead="Projetos visuais, estudos de interação e telas feitas para parecerem simples sem serem genéricas."
        primary={{ label: 'Ver portfólio', href: '/portfolio' }}
        secondary={{ label: 'Blog', href: '/blog' }}
      />

      <section class="p-section">
        <div class="p-heading">
          <p class="p-eyebrow">Frontend</p>
          <h2>Onde a interface encontra o acabamento.</h2>
        </div>

        <div class="p-grid cols-3">
          <For each={frontendTracks}>
            {(track, i) => (
              <article class="p-card" use:reveal={{ delay: i() * 100 }}>
                <span class="p-card-kicker">visual system</span>
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
