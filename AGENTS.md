# Buttprint frontend

SvelteKit, TypeScript, and Vite. Read package.json and neighboring components for current versions and patterns. The frontend presents Buttprint API results; it does not score environmental data or generate the SVG.

- Preserve the Node adapter and the client/server boundary: SSR supplies page metadata; browser-side code fetches Buttprint data. Verify the existing route/load flow before changing it.
- Use typed API responses, Svelte's existing reactive patterns, and scoped/plain CSS. Do not add a component library or relax types without an agreed reason.
- Preserve timezone-qualified timestamps, shareable URLs, nullable lineage handling, and safe rendering of API-provided SVG/HTML.
- Checks: npm run check, npm run lint, npm run test, and npm run build, scoped to the change. Make targets wrap dev/build/check/lint/format. Do not run formatting across unrelated files or start the dev server by default.
