import { A, useParams } from '@solidjs/router'
import { For, Show } from 'solid-js'
import PageMeta from '../components/PageMeta'
import { getPostBySlug } from '../data/posts'
import NotFoundPage from './NotFoundPage'

export default function PostPage() {
  const params = useParams<{ slug: string }>()
  const post = () => getPostBySlug(params.slug)

  return (
    <Show when={post()} fallback={<NotFoundPage />}>
      {(currentPost) => (
        <article class="p-article">
          <PageMeta
            title={`${currentPost().title} | Gabriel Fortunato`}
            description={currentPost().description}
          />

          <A href="/blog" class="p-link">
            <span aria-hidden="true">←</span> Blog
          </A>

          <header style={{ 'margin-top': '28px' }}>
            <div class="p-meta">
              <time dateTime={currentPost().publishedAt}>{currentPost().publishedAt}</time>
              <span>{currentPost().readingTime}</span>
            </div>
            <h1>{currentPost().title}</h1>
            <p class="p-muted" style={{ 'font-size': '18px', 'line-height': '1.6' }}>
              {currentPost().description}
            </p>
            <ul class="p-tags" style={{ 'margin-top': '22px' }} aria-label="Tags do post">
              <For each={currentPost().tags}>{(tag) => <li>{tag}</li>}</For>
            </ul>
          </header>

          <div class="p-article-body">
            <For each={currentPost().body}>{(paragraph) => <p>{paragraph}</p>}</For>
          </div>
        </article>
      )}
    </Show>
  )
}
