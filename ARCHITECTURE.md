# Modern Agent Harness Architecture (`ARCHITECTURE.md`)

This document defines the 5-layer engineering harness that surrounds and steers autonomous AI coding agents.

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 5: Multi-Agent Deliberation & Reviewer Matrix        │
│ (Reliability Reviewer, Security Reviewer, Conflict Resolver)│
├─────────────────────────────────────────────────────────────┤
│ Layer 4: Deterministic Guardrails & Verification Backpressure│
│ (Linters with Actionable Prompts, Test Suites, Pre-commit)  │
├─────────────────────────────────────────────────────────────┤
│ Layer 3: Capability Surface, Tools & Power Skills           │
│ (File Ops, Terminal Exec, Subagents, Model Context Protocol)│
├─────────────────────────────────────────────────────────────┤
│ Layer 2: Externalized Memory & State Persistence            │
│ (Filesystem as Working Memory: PLANS.md, PROGRESS.md, ADRs) │
├─────────────────────────────────────────────────────────────┤
│ Layer 1: Context Engineering & Cache Discipline             │
│ (Stable Prefix Caching, Token Budgets, Small Files < 350 LOC)│
└─────────────────────────────────────────────────────────────┘
```

---

## Layer 1: Context Engineering & Cache Discipline
- **Cache-First Design:** Maintain a stable system prompt and tool definition prefix to leverage provider prompt-caching (Anthropic/OpenAI/Google).
- **Legibility over Implementation:** Structure files so context required for any task is immediately "page-able" by the model without deep recursive imports.
- **Context Limit Invariant:** Strict cap of **350 lines per file**. When a file grows beyond 350 lines, split into cohesive sub-modules.

---

## Layer 2: Externalized Memory & State Persistence
- **Context is Ephemeral; Filesystem is Durable:** Never rely on model conversational memory across long sessions.
- **Key Working State Files:**
  - `PLANS.md`: High-level milestones and active execution roadmap.
  - `PROGRESS.md`: Chronological log of decisions, fixes, and current status.
  - `docs/adrs/`: Architecture Decision Records marking "load-bearing" structures that agents must not refactor away.

---

## Layer 3: Capability Surface, Tools & Power Skills
- **Minimal Action Space:** High-leverage primitives (Read, Write, Execute, Search, Subagent Delegation, User Elicitation).
- **Portable Skills (`.cursor/skills/`):** Self-contained packages with `SKILL.md` (metadata & instructions), `scripts/` (executable tools), and `references/` (domain standards).
- **Subagent Topology:**
  - **Read-Only Delegation:** Fan out parallel subagents for research and codebase exploration.
  - **Single Write Path:** Limit write execution to one agent to prevent merge collisions and backpressure flooding.

---

## Layer 4: Deterministic Guardrails & Verification Backpressure
- **Linters as Actionable Prompts:** Error messages must tell the agent *how to fix* the problem (e.g., *"We parse at boundary; use Zod schema in src/common"*).
- **Automated Verification:** Exit code 2 blocks execution; exit code 1 warns.
- **Zero-Touch CI Shield:** Local pre-flight checks run before changes touch remote CI to prevent pipeline cost bloat.

---

## Layer 5: Multi-Agent Deliberation & Reviewer Matrix
- **Planner / Generator / Evaluator Split:** Generation and evaluation must be separated into distinct agent runs because models reliably skew lenient when evaluating their own code.
- **Conflict Resolver Agent:** Arbitrates contradictory reviewer feedback using [`SYSTEM_HIERARCHY.md`](./SYSTEM_HIERARCHY.md) to eliminate "Bullied Agent" circular loops.
