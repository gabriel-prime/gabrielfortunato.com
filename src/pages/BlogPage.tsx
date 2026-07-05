import { For } from 'solid-js'
import PageMeta from '../components/PageMeta'
import PostPreview from '../components/PostPreview'
import { reveal } from '../lib/directives'
import { posts } from '../data/posts'

void reveal

export default function BlogPage() {
  return (
    <>
      <PageMeta
        title="Blog | Gabriel Fortunato"
        description="Notas técnicas sobre desenvolvimento, SolidJS, Go, Docker e infraestrutura pessoal."
      />

      <section class="p-section">
        <div class="p-heading">
          <p class="p-eyebrow">Blog</p>
          <h1>Notas técnicas e aprendizados</h1>
          <p>
            Textos curtos sobre decisões de arquitetura, bugs, deploys e tecnologias que estou
            estudando.
          </p>
        </div>

        <div class="p-grid cols-2">
          <For each={posts}>
            {(post, i) => (
              <div use:reveal={{ delay: i() * 100 }}>
                <PostPreview post={post} />
              </div>
            )}
          </For>
        </div>
      </section>
    </>
  )
}
