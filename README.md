# Buttprint FE

SvelteKit display layer for [Buttprint](https://github.com/kacper-wojtaszczyk/buttprint-api). Gathers location and time from the user, fetches a parametric SVG butt from the API, and displays it.

## Stack

- SvelteKit 2 + Svelte 5
- TypeScript (strict)
- Node adapter (SSR for meta tags)

## Running

```bash
cp .env.example .env      # Configure API URL
npm install
npm run dev               # Dev server at localhost:5173
```

## Project Structure

```
src/
  routes/       Pages and layouts
  lib/          Shared utilities and components
static/         Static assets
```

## Related Repos

Part of the [Climacterium](https://github.com/kacper-wojtaszczyk?tab=repositories) ecosystem:

| Repo                                                                           | Description                                                     |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| [jackfruit](https://github.com/kacper-wojtaszczyk/jackfruit)                   | Environmental data ingestion + serving (Go, Python, ClickHouse) |
| [buttprint-api](https://github.com/kacper-wojtaszczyk/buttprint-api)           | Atmospheric scoring API + SVG butt generation (Go)              |
| [climacterium-infra](https://github.com/kacper-wojtaszczyk/climacterium-infra) | Terraform + Kubernetes deployment (Scaleway)                    |
