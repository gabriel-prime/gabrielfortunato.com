import { For } from 'solid-js'
import PageMeta from '../components/PageMeta'
import ProjectCard from '../components/ProjectCard'
import { reveal } from '../lib/directives'
import { projects } from '../data/projects'

void reveal

export default function ProjectsPage() {
  return (
    <>
      <PageMeta
        title="Projetos | Gabriel Fortunato"
        description="Projetos pessoais de Gabriel Fortunato com Go, SolidJS, Docker e infraestrutura em VPS."
      />

      <section class="p-section">
        <div class="p-heading">
          <p class="p-eyebrow">Projetos</p>
          <h1>Coisas que estou construindo</h1>
          <p>
            Uma lista curta do que está em produção, em estudo ou virando base para outros
            experimentos.
          </p>
        </div>

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
