# Universal Agent Operating Guide (`AGENTS.md`)

> **"Humans steer. Agents execute."**
> **"Agent = Model + Harness."** The model is a constant rented from providers. The harness is the system you own—context, tools, guardrails, and verification loops.

---

## 1. Core Operating Principles

1. **The Golden Rule:**
   If a rule can be enforced by deterministic code (linters, type checkers, tests, pre-commit hooks), enforce it by code. Reserve `AGENTS.md` for orientation, soft conventions, and system navigation.
2. **Context is Scarce; Code is Free:**
   - Keep files small, cohesive, and strictly under **350 lines**.
   - Do not bloat context with large dumps or speculative scaffolding.
   - Use the filesystem as external working memory (`PLANS.md`, `PROGRESS.md`, ADRs).
3. **Mechanical Backpressure:**
   Never mark a task complete without proving it works through automated verification (tests, linter pass, type checks).
4. **Self-Improving Harness Loop:**
   If you stumble on a build step, missing command, or ambiguous rule, **do not just fix the code**—update the corresponding documentation in the harness so future agent loops never repeat the mistake.
5. **No Hallucinated Scope:**
   Build only what is explicitly specified. Do not invent speculative features or add dependencies without rationale.

---

## 2. Repository Navigation Index

- **System Architecture:** [`ARCHITECTURE.md`](./ARCHITECTURE.md) — 5-layer harness topology & design.
- **Conflict Arbitration:** [`SYSTEM_HIERARCHY.md`](./SYSTEM_HIERARCHY.md) — Precedence matrix when reviewer agents or requirements conflict.
- **Security & Sandboxing:** [`SECURITY.md`](./SECURITY.md) — Boundary enforcement, secrets isolation, and prompt defense.
- **Reliability & Backpressure:** [`RELIABILITY.md`](./RELIABILITY.md) — Timeouts, retries, and token-burn controls.
- **Active Plans & Milestones:** [`PLANS.md`](./PLANS.md) — Current state, active task lists, and deliverables.
- **Session Progress Log:** [`PROGRESS.md`](./PROGRESS.md) — Externalized human/agent handoff log.
- **Living Radar & Industry Intel:** [`docs/harness/rad-radar.md`](./docs/harness/rad-radar.md) — Continuous tracker for new methods from AI labs & X builders.

---

## 3. Session Protocol for Agents

Every agent turn must follow this predictable execution cycle:
1. **Orient:** Read `AGENTS.md`, `PROGRESS.md`, and the active section of `PLANS.md`.
2. **Decompose:** Plan minimal, testable units of work.
3. **Execute in Local Harness:** Make atomic code changes.
4. **Verify Mechanically:** Run `npm run test` and `npm run harness:check`.
5. **Update State:** Record progress and learnings in `PROGRESS.md` before returning control to the human pilot.
