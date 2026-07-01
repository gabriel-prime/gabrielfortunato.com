import { createEffect } from 'solid-js'

type PageMetaProps = {
  readonly title: string
  readonly description: string
}

export default function PageMeta(props: PageMetaProps) {
  createEffect(() => {
    document.title = props.title

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) {
      description.content = props.description
    }
  })

  return null
}
