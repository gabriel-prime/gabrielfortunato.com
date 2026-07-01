import { For } from 'solid-js'
import type { Project } from '../data/projects'

type ProjectCardProps = {
  readonly project: Project
}

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <article class="card project-card">
      <div>
        <h3>{props.project.name}</h3>
        <p>{props.project.summary}</p>
      </div>

      <p class="muted">{props.project.impact}</p>

      <ul class="tag-list" aria-label={`Stack do projeto ${props.project.name}`}>
        <For each={props.project.stack}>{(item) => <li>{item}</li>}</For>
      </ul>

      <a href={props.project.href} class="inline-link">
        Abrir <span aria-hidden="true">-&gt;</span>
      </a>
    </article>
  )
}
