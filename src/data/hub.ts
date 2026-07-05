import type { IconName } from '../components/hub/icons'

/** An input node on the board — a discipline that routes to a variant page. */
export type HubModule = {
  readonly label: string
  readonly desc: string
  readonly href: string
  readonly icon: IconName
}

/** An output node — a kind of product the board can ship, with its stack. */
export type HubOutput = {
  readonly label: string
  readonly desc: string
  readonly tags: readonly string[]
  readonly icon: IconName
  readonly href: string
}

export const inputModules: readonly HubModule[] = [
  { label: 'FRONTEND', desc: 'interfaces, design system, motion', href: '/frontend', icon: 'layout' },
  { label: 'BACKEND', desc: 'APIs, arquitetura, operação', href: '/backend', icon: 'server' },
  { label: 'INFRA & CLOUD', desc: 'VPS, Docker, deploy próprio', href: '/portfolio', icon: 'cloud' },
]

export const outputModules: readonly HubOutput[] = [
  { label: 'PRODUTO SAAS', desc: 'dashboards & billing', tags: ['Go', 'Postgres'], icon: 'layers', href: '/projetos' },
  { label: 'E-COMMERCE', desc: 'checkout & catálogo', tags: ['SolidJS', 'API'], icon: 'cart', href: '/projetos' },
  { label: 'AUTOMAÇÃO', desc: 'workers & filas', tags: ['Go', 'Docker'], icon: 'bolt', href: '/projetos' },
]

/** The CPU's LCD cycles the stack it runs on — not the product types on the
    right, so the two never read as duplicates. */
export const cpuWords: readonly string[] = ['SOLIDJS', 'GO', 'POSTGRES', 'DOCKER', 'CADDY']
