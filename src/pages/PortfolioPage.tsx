import { For } from 'solid-js'
import PageMeta from '../components/PageMeta'
import PremiumHero from '../components/premium/PremiumHero'
import ProjectCard from '../components/ProjectCard'
import { reveal } from '../lib/directives'
import { projects } from '../data/projects'

void reveal

export default function PortfolioPage() {
  return (
    <>
      <PageMeta
        title="Portfolio | Gabriel Fortunato"
        description="Portfolio de Gabriel Fortunato com projetos frontend, backend e infraestrutura própria."
      />

      <PremiumHero
        badge="Portfolio · Infra & Cloud"
        title="Projetos reais"
        titleText="Projetos reais"
        lead="Uma visão organizada do que está publicado, do que está em construção e do que ainda vira estudo mais profundo."
        primary={{ label: 'Falar comigo', href: '/contato' }}
      />

      <section class="p-section">
        <div class="p-grid cols-2">
          <For each={projects}>
            {(project, i) => (
              <div use:reveal={{ delay: i() * 100 }}>
                <ProjectCard project={project} />
              </div>
            )}
          </For>
        </div>
      </section>
    </>
  )
}
