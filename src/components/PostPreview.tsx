import { A } from '@solidjs/router'
import { For } from 'solid-js'
import type { BlogPost } from '../data/posts'

type PostPreviewProps = {
  readonly post: BlogPost
}

export default function PostPreview(props: PostPreviewProps) {
  return (
    <article class="card post-preview">
      <div class="post-meta">
        <time dateTime={props.post.publishedAt}>{formatDate(props.post.publishedAt)}</time>
        <span>{props.post.readingTime}</span>
      </div>

      <h3>
        <A href={`/blog/${props.post.slug}`}>{props.post.title}</A>
      </h3>

      <p>{props.post.description}</p>

      <ul class="tag-list" aria-label={`Tags do post ${props.post.title}`}>
        <For each={props.post.tags}>{(tag) => <li>{tag}</li>}</For>
      </ul>
    </article>
  )
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))
}
