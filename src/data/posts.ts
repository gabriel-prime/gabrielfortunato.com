export type BlogPost = {
  readonly slug: string
  readonly title: string
  readonly description: string
  readonly publishedAt: string
  readonly readingTime: string
  readonly tags: readonly string[]
  readonly body: readonly string[]
}

export const posts: readonly BlogPost[] = [
  {
    slug: 'vps-pessoal-com-docker-compose',
    title: 'Minha VPS pessoal com Docker Compose',
    description:
      'Como estou organizando proxy, apps, banco, deploy automatico, monitoramento e backups em uma VPS unica.',
    publishedAt: '2026-06-30',
    readingTime: '4 min',
    tags: ['VPS', 'Docker', 'Infra'],
    body: [
      'A ideia da VPS pessoal e simples: manter controle sobre as pecas importantes sem criar uma operacao grande demais para um projeto individual.',
      'O proxy reverso fica como entrada unica da internet. As aplicacoes rodam em stacks Docker Compose separadas, conectadas por uma rede compartilhada chamada proxy quando precisam receber trafego publico.',
      'Bancos ficam em redes privadas por aplicacao. Assim, o Postgres da API nao precisa expor porta para a internet nem para outros apps que nao precisam falar com ele.',
      'O deploy automatico segue o fluxo git push, GitHub Actions, imagem no GHCR e atualizacao do container na VPS por SSH. A VPS nao precisa compilar tudo localmente.',
      'Monitoramento e backups entram como parte da infraestrutura, nao como detalhe para depois. Primeiro metricas de host e containers; depois alertas e backup externo.',
    ],
  },
  {
    slug: 'por-que-solidjs-no-site-pessoal',
    title: 'Por que escolhi SolidJS para este site',
    description:
      'SolidJS entra como uma forma de estudar reatividade fina, manter controle da interface e ainda publicar um front estatico leve.',
    publishedAt: '2026-06-30',
    readingTime: '3 min',
    tags: ['SolidJS', 'Frontend', 'TypeScript'],
    body: [
      'Para um site pessoal, eu poderia usar algo ainda mais pronto. Mas a intencao aqui tambem e aprender e manter controle direto sobre a interface.',
      'SolidJS e interessante porque a reatividade e explicita e granular. Isso deixa claro quando um estado muda e qual pedaco da tela depende dele.',
      'Neste primeiro momento, o site usa Vite e build estatico. Isso simplifica o deploy: o container final serve apenas arquivos com nginx.',
      'Se no futuro fizer sentido ter SSR, rotas de servidor ou uma camada de dados mais elaborada, SolidStart fica como proximo passo natural.',
    ],
  },
] as const

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}
