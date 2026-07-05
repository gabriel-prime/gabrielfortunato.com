import { A } from '@solidjs/router'
import { For, type JSX } from 'solid-js'

const navLinks = [
  { href: '/', label: 'Home', end: true },
  { href: '/frontend', label: 'Frontend', end: false },
  { href: '/backend', label: 'Backend', end: false },
  { href: '/portfolio', label: 'Portfolio', end: false },
  { href: '/blog', label: 'Blog', end: false },
] as const

/** Chrome for the deep-dark "premium" variant pages. */
export default function PremiumLayout(props: { children?: JSX.Element }) {
  return (
    <div class="premium">
      <div class="premium-inner">
        <nav class="p-nav" aria-label="Navegação principal">
          <A href="/" class="p-brand">
            Gabriel Fortunato
          </A>

          <div class="p-nav-links">
            <For each={navLinks}>
              {(link) => (
                <A href={link.href} end={link.end} activeClass="p-active">
                  {link.label}
                </A>
              )}
            </For>
          </div>

          <A href="/contato" class="p-nav-cta">
            Contato <span aria-hidden="true">↗</span>
          </A>
        </nav>

        <main id="content">{props.children}</main>

        <footer class="p-footer">
          <span>© 2026 Gabriel Fortunato</span>
          <div class="p-social">
            <a href="https://github.com/gabriel-prime" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://gabrielfortunato.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://gabrielfortunato.com" target="_blank" rel="noreferrer">
              X
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
