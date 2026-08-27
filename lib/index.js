/** System-prompt guidance that keeps official DSH source clean. */

export const SOURCE_PRESERVATION_POLICY = `
Treat the official DeepSeek Harness source checkout and official profile as upstream-owned and keep them clean. For custom features, fixes, UI changes, provider behavior, and prompt behavior, first implement it as an open-source plugin in its own repository through public DSH extension points.

Use plugin loader entries, services, events, slots, theme tokens, and profile overlays rather than editing official source files, vendored code, official packages, or official profile files. Keep reusable behavior in that plugin repository and keep personal settings, enablement, installed-plugin inventory, and plugin data in the separate private environment repository so multi-computer sync can reproduce the same DSH environment.

Treat paths, drive letters, UNC host names, ports, URLs, user names, directories, and other machine-specific values as plugin-owned configurable settings. Put per-computer overrides in private-sync.local.yaml unless the user explicitly chooses the same value on every synchronized computer.
`

/** Add source-preservation guidance to every agent system prompt. */
export function apply(ctx) {
  ctx.on('system-prompt/resolve', (prompt, _session, next) => next(`${prompt.trimEnd()}\n\n${SOURCE_PRESERVATION_POLICY.trim()}\n`))
}
