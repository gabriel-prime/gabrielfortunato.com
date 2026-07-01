import { For } from 'solid-js'
import PageMeta from '../components/PageMeta'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

export default function ProjectsPage() {
  return (
    <>
      <PageMeta
        title="Projetos | Gabriel Fortunato"
        description="Projetos pessoais de Gabriel Fortunato com Go, SolidJS, Docker e infraestrutura em VPS."
      />

      <section class="page-header">
        <p class="eyebrow">Projetos</p>
        <h1>Coisas que estou construindo</h1>
        <p>
          Uma lista curta do que esta em producao, em estudo ou virando base para outros
          experimentos.
        </p>
      </section>

      <section class="card-grid">
        <For each={projects}>{(project) => <ProjectCard project={project} />}</For>
      </section>
    </>
  )
}
