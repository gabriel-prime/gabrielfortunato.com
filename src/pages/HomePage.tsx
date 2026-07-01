import { A } from '@solidjs/router'
import { For } from 'solid-js'
import heroImage from '../assets/hero.png'
import PageMeta from '../components/PageMeta'
import PostPreview from '../components/PostPreview'
import ProjectCard from '../components/ProjectCard'
import { posts } from '../data/posts'
import { projects } from '../data/projects'

const featuredProjects = projects.filter((project) => project.featured)
const latestPosts = posts.slice(0, 2)

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="Gabriel Fortunato"
        description="Site pessoal de Gabriel Fortunato: projetos, estudos e notas tecnicas sobre software, Go, SolidJS e infraestrutura."
      />

      <section class="hero-section">
        <div class="hero-copy">
          <p class="eyebrow">Software, automacao e infraestrutura pessoal</p>
          <h1>Gabriel Fortunato</h1>
          <p class="lead">
            Estou construindo projetos reais com Go, SolidJS e uma VPS propria para aprender,
            publicar e controlar a stack de ponta a ponta.
          </p>
          <div class="hero-actions" aria-label="Acoes principais">
            <A class="button primary" href="/projetos">
              Ver projetos
            </A>
            <A class="button secondary" href="/blog">
              Ler blog
            </A>
          </div>
        </div>

        <div class="hero-visual" aria-label="Resumo tecnico do ambiente">
          <img src={heroImage} alt="" width="340" height="358" />
          <div class="system-panel">
            <span class="status-dot" aria-hidden="true"></span>
            <div>
              <strong>VPS online</strong>
              <span>Docker Compose, Caddy, Beszel e GHCR</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section-block">
        <div class="section-heading">
          <p class="eyebrow">Agora</p>
          <h2>Projetos em andamento</h2>
        </div>

        <div class="card-grid">
          <For each={featuredProjects}>{(project) => <ProjectCard project={project} />}</For>
        </div>
      </section>

      <section class="section-block">
        <div class="section-heading split">
          <div>
            <p class="eyebrow">Notas</p>
            <h2>Ultimos textos</h2>
          </div>
          <A class="inline-link" href="/blog">
            Ver todos <span aria-hidden="true">-&gt;</span>
          </A>
        </div>

        <div class="post-list compact">
          <For each={latestPosts}>{(post) => <PostPreview post={post} />}</For>
        </div>
      </section>
    </>
  )
}
