export type Project = {
  readonly name: string
  readonly summary: string
  readonly impact: string
  readonly href: string
  readonly stack: readonly string[]
  readonly featured?: boolean
}

export const projects: readonly Project[] = [
  {
    name: 'Zapbot',
    summary: 'API em Go para webhook da WhatsApp Cloud API, deploy automatico e Postgres isolado.',
    impact: 'Infra real em VPS com Docker Compose, Caddy, GHCR e monitoramento.',
    href: 'https://api.gabrielfortunato.com/health',
    stack: ['Go', 'Docker', 'Postgres', 'GitHub Actions'],
    featured: true,
  },
  {
    name: 'gabrielfortunato.com',
    summary: 'Site pessoal em SolidJS para registrar projetos, estudos e notas tecnicas.',
    impact: 'Front leve, versionado e publicado na propria VPS.',
    href: '/',
    stack: ['SolidJS', 'Vite', 'TypeScript', 'nginx'],
    featured: true,
  },
  {
    name: 'VPS pessoal',
    summary: 'Ambiente centralizado para APIs, sites, bancos, backups e paineis privados.',
    impact: 'Controle direto da stack sem depender de PaaS para tudo.',
    href: 'https://monitor.gabrielfortunato.com',
    stack: ['Debian', 'Caddy', 'Beszel', 'Dockge'],
  },
] as const
