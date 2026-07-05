import { A } from '@solidjs/router'
import { Show, type JSX } from 'solid-js'
import styles from './PremiumHero.module.css'

type CTA = { readonly label: string; readonly href: string }

type PremiumHeroProps = {
  readonly badge: string
  readonly title: JSX.Element
  readonly lead: string
  readonly primary?: CTA
  readonly secondary?: CTA
  /** Plain-text mirror of `title` for the glow overlay + a11y. */
  readonly titleText: string
}

/**
 * Signature dark hero: floating glass orbs with pointer parallax and a title
 * that stays fully legible while a cursor-tracked glow sweeps across it — the
 * "blur-to-focus" reveal from the design, minus the legibility cost.
 */
export default function PremiumHero(props: PremiumHeroProps) {
  let glow: HTMLSpanElement | undefined

  const onMove = (event: PointerEvent & { currentTarget: HTMLElement }) => {
    if (!glow) return
    const r = event.currentTarget.getBoundingClientRect()
    glow.style.setProperty('--mx', `${event.clientX - r.left}px`)
    glow.style.setProperty('--my', `${event.clientY - r.top}px`)
    glow.style.setProperty('--r', '200px')
  }

  const onLeave = () => glow?.style.setProperty('--r', '0px')

  return (
    <section class={styles.hero}>
      <span class={styles.orb} data-orb="a" aria-hidden="true" />
      <span class={styles.orb} data-orb="b" aria-hidden="true" />
      <span class={styles.orb} data-orb="c" aria-hidden="true" />
      <span class={styles.ring} aria-hidden="true" />

      <div class={styles.inner}>
        <span class="p-badge">
          <i /> {props.badge}
        </span>

        <div class={styles.titleWrap} onPointerMove={onMove} onPointerLeave={onLeave}>
          <h1 class={styles.title}>{props.title}</h1>
          <span ref={glow} class={styles.titleGlow} aria-hidden="true">
            {props.titleText}
          </span>
        </div>

        <p class="p-lead">{props.lead}</p>

        <Show when={props.primary || props.secondary}>
          <div class="p-actions">
            <Show when={props.primary}>
              {(cta) => (
                <A class="p-btn" href={cta().href}>
                  {cta().label}
                </A>
              )}
            </Show>
            <Show when={props.secondary}>
              {(cta) => (
                <A class="p-btn-ghost" href={cta().href}>
                  {cta().label} <span aria-hidden="true">▸</span>
                </A>
              )}
            </Show>
          </div>
        </Show>
      </div>
    </section>
  )
}
