import { For, Show } from 'solid-js'
import type { Project } from '../data/projects'

const isExternal = (href: string) => /^https?:\/\//.test(href)

export default function ProjectCard(props: { readonly project: Project }) {
  return (
    <article class="p-card">
      <span class="p-card-kicker">case</span>
      <h3>{props.project.name}</h3>
      <p>{props.project.summary}</p>
      <p class="p-muted">{props.project.impact}</p>

      <ul class="p-tags" aria-label={`Stack do projeto ${props.project.name}`}>
        <For each={props.project.stack}>{(item) => <li>{item}</li>}</For>
      </ul>

      <Show
        when={isExternal(props.project.href)}
        fallback={
          <a class="p-link" href={props.project.href}>
            Abrir <span aria-hidden="true">→</span>
          </a>
        }
      >
        <a class="p-link" href={props.project.href} target="_blank" rel="noreferrer">
          Abrir <span aria-hidden="true">→</span>
        </a>
      </Show>
    </article>
  )
}
