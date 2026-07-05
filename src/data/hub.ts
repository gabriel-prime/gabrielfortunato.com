import type { IconName } from '../components/hub/icons'

/** An input node on the board — a discipline that routes to a variant page. */
export type HubModule = {
  readonly label: string
  readonly href: string
  readonly icon: IconName
}

/** An output node — a class of product the board ships. */
export type HubOutput = {
  readonly label: string
  readonly slot: string
  readonly icon: IconName
  readonly href: string
}

export const inputModules: readonly HubModule[] = [
  { label: 'FRONTEND', href: '/frontend', icon: 'layout' },
  { label: 'BACKEND', href: '/backend', icon: 'server' },
  { label: 'INFRA & CLOUD', href: '/portfolio', icon: 'cloud' },
]

export const outputModules: readonly HubOutput[] = [
  { label: 'PRODUTO SAAS', slot: 'deploy slot 01', icon: 'layers', href: '/projetos' },
  { label: 'E-COMMERCE', slot: 'deploy slot 02', icon: 'cart', href: '/projetos' },
  { label: 'AUTOMAÇÃO', slot: 'deploy slot 03', icon: 'bolt', href: '/projetos' },
]

/** Words cycled through the CPU's LCD display. */
export const cpuWords: readonly string[] = [
  'E-COMMERCE',
  'FINTECH',
  'SAAS',
  'AUTOMAÇÃO',
  'DASHBOARDS',
]
