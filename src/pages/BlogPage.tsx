import { For } from 'solid-js'
import PageMeta from '../components/PageMeta'
import PostPreview from '../components/PostPreview'
import { posts } from '../data/posts'

export default function BlogPage() {
  return (
    <>
      <PageMeta
        title="Blog | Gabriel Fortunato"
        description="Notas tecnicas sobre desenvolvimento, SolidJS, Go, Docker e infraestrutura pessoal."
      />

      <section class="page-header">
        <p class="eyebrow">Blog</p>
        <h1>Notas tecnicas e aprendizados</h1>
        <p>
          Textos curtos sobre decisoes de arquitetura, bugs, deploys e tecnologias que estou
          estudando.
        </p>
      </section>

      <section class="post-list">
        <For each={posts}>{(post) => <PostPreview post={post} />}</For>
      </section>
    </>
  )
}
