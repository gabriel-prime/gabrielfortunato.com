import { A } from '@solidjs/router'
import { For, type JSX } from 'solid-js'
import GateLoader from '../components/hub/GateLoader'
import ThemeToggle from '../components/hub/ThemeToggle'
import { parallax } from '../lib/directives'
import { EntranceProvider } from '../lib/entrance'
import styles from './HubLayout.module.css'

// Retain the directive through tree-shaking.
void parallax

const navLinks = [
  { href: '/blog', label: 'BLOG' },
  { href: '/projetos', label: 'PROJETOS' },
  { href: '/portfolio', label: 'PORTFOLIO' },
] as const

/** Chrome for the neumorphic hub: frosted pill nav, board decor, footer. */
export default function HubLayout(props: { children?: JSX.Element }) {
  return (
    <EntranceProvider>
    <div class={styles.shell}>
      <GateLoader />

      {/* Corner screws + board texture — pure decoration. */}
      <span class={styles.screw} data-pos="tl" aria-hidden="true" />
      <span class={styles.screw} data-pos="tr" aria-hidden="true" />
      <span class={styles.screw} data-pos="bl" aria-hidden="true" />
      <span class={styles.screw} data-pos="br" aria-hidden="true" />
      <span class={styles.dots} use:parallax={{ depth: -6 }} aria-hidden="true" />

      <nav class={styles.nav} aria-label="Navegação principal">
        <A href="/" class={styles.brand}>
          Gabriel Fortunato
        </A>

        <div class={styles.links}>
          <For each={navLinks}>
            {(link) => (
              <A href={link.href} class={styles.link} activeClass={styles.linkActive}>
                {link.label}
              </A>
            )}
          </For>
        </div>

        <div class={styles.actions}>
          <ThemeToggle />
          <A href="/contato" class={styles.cta}>
            CONTATO
          </A>
        </div>
      </nav>

      <main id="content">{props.children}</main>

      <footer class={styles.footer}>
        <span>© 2026 GABRIEL FORTUNATO</span>
        <div class={styles.social}>
          <a href="https://github.com/gabriel-prime" target="_blank" rel="noreferrer">
            GITHUB
          </a>
          <a href="https://gabrielfortunato.com" target="_blank" rel="noreferrer">
            LINKEDIN
          </a>
          <a href="https://gabrielfortunato.com" target="_blank" rel="noreferrer">
            X
          </a>
        </div>
      </footer>
    </div>
    </EntranceProvider>
  )
}
