import { A } from '@solidjs/router'
import { For, type JSX } from 'solid-js'

const navigation = [
  { href: '/', label: 'Inicio', end: true },
  { href: '/projetos', label: 'Projetos', end: false },
  { href: '/blog', label: 'Blog', end: false },
  { href: '/contato', label: 'Contato', end: false },
] as const

type LayoutProps = {
  readonly children?: JSX.Element
}

export default function Layout(props: LayoutProps) {
  return (
    <div class="site-shell">
      <a class="skip-link" href="#content">
        Pular para o conteudo
      </a>

      <header class="site-header">
        <A class="brand" href="/" aria-label="Gabriel Fortunato - inicio">
          <span class="brand-mark" aria-hidden="true">
            GF
          </span>
          <span>Gabriel Fortunato</span>
        </A>

        <nav class="site-nav" aria-label="Navegacao principal">
          <For each={navigation}>
            {(item) => (
              <A href={item.href} end={item.end} activeClass="active" inactiveClass="inactive">
                {item.label}
              </A>
            )}
          </For>
        </nav>
      </header>

      <main id="content">{props.children}</main>

      <footer class="site-footer">
        <span>gabrielfortunato.com</span>
        <span>SolidJS, Go e infraestrutura propria.</span>
      </footer>
    </div>
  )
}
