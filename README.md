# gabrielfortunato.com

Site pessoal em SolidJS + Vite + TypeScript.

## Stack

- SolidJS
- Vite
- TypeScript
- Docker multi-stage
- nginx servindo build estatico
- GitHub Actions -> GHCR -> VPS

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

O deploy roda automaticamente no push para `main`.

Fluxo:

```text
git push
GitHub Actions
Docker build
GHCR
SSH na VPS
docker compose pull/up em /srv/apps/site
```
