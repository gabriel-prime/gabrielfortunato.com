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
        <article class="article-page">
          <PageMeta
            title={`${currentPost().title} | Gabriel Fortunato`}
            description={currentPost().description}
          />

          <A href="/blog" class="inline-link back-link">
            <span aria-hidden="true">&lt;-</span> Blog
          </A>

          <header class="article-header">
            <div class="post-meta">
              <time dateTime={currentPost().publishedAt}>{currentPost().publishedAt}</time>
              <span>{currentPost().readingTime}</span>
            </div>
            <h1>{currentPost().title}</h1>
            <p>{currentPost().description}</p>
            <ul class="tag-list" aria-label={`Tags do post ${currentPost().title}`}>
              <For each={currentPost().tags}>{(tag) => <li>{tag}</li>}</For>
            </ul>
          </header>

          <div class="article-body">
            <For each={currentPost().body}>{(paragraph) => <p>{paragraph}</p>}</For>
          </div>
        </article>
      )}
    </Show>
  )
}
