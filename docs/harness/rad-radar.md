# Harness Engineering Radar: Live Labs & Builder Tracker (`rad-radar.md`)

This living document tracks cutting-edge methods, discoveries, and best practices emerging from frontier AI labs (OpenAI, Anthropic, Cursor, Factory, Cognition) and the builders sharing architectures on social platforms, specifically **X (Twitter)**.

---

## 1. Monitored Labs & Builders on X

| Source / Entity | Key Focus & Handle | Primary Contributions |
| :--- | :--- | :--- |
| **Mitchell Hashimoto** | `@mitchellh` | Coined the term "Harness Engineering" (Feb 2026). Focus on deterministic developer environments and runtime isolation. |
| **Ryan Lopopolo** | `@lopopolo` (OpenAI) | Authored *"Harness engineering: leveraging Codex in an agent-first world"*. Pioneered 1M+ LOC with 0% hand-written code, Staff Engineer delegation mindset, and local harness daemons. |
| **Anthropic Research** | `@AnthropicAI` / Claude Code team | Context window management, two-agent (Generator vs. Evaluator) splits, MCP (Model Context Protocol), and subagent context isolation. |
| **Cursor / Anysphere** | `@cursor_run` (Aman Sanger, Michael Truell) | `AGENTS.md` standard, Cloud Agent automations, Linear MCP integrations, and IDE-native skill definitions. |
| **Addy Osmani** | `@addyosmani` | *Agent Harness Engineering* field guide: sprint contracts, planner/generator/evaluator GAN-style loops, and self-verification hooks. |
| **Simon Willison** | `@simonw` | Spec-driven development, tool namespacing, and prompt injection defense in agent tools. |
| **Martin Fowler / Birgitta Böckeler** | `@martinfowler` | Enterprise harness architecture, guides-and-sensors discipline, and evolutionary architectural records. |
| **LangChain Team** | `@LangChainAI` / `@hwchase17` | Terminal Bench 2.0 optimization via harness design (improving benchmark scores from Top 30 to Top 5 without changing the model). |

---

## 2. Core Method Log & Breakthrough Discoveries

### Entry 2026-10: The Cache-First Context Revolution
- **Lab/Source:** Anthropic & Community Research
- **Insight:** Prompt caching is not merely a cost saver; it is an architectural primitive. Prompt prefixes (system instructions, core conventions, tool definitions) must remain strictly immutable across sessions to maximize cache hits. Dynamic state must only be appended as messages or referenced by external handles.
- **Harness Adoption:** Established fixed Layer 1 context order: Immutable Prefix $\to$ Project Conventions $\to$ Session Summary $\to$ Recent Message History.

### Entry 2026-06: Planner / Generator / Evaluator Splits
- **Lab/Source:** Addy Osmani & Anthropic Research
- **Insight:** Single agents cannot reliably grade their own work; they exhibit positive skew and declare tasks "complete" as soon as code compiles. Splitting tasks into a **Generator** and an **Evaluator** (evaluating against an agreed-upon "done contract") eliminates premature completion.
- **Harness Adoption:** Created `.cursor/agents/` reviewer matrix and `.cursor/agents/conflict-resolver.md`.

### Entry 2026-04: The Local Pre-Flight Shield
- **Lab/Source:** Ryan Lopopolo (OpenAI)
- **Insight:** Autonomous agents generating dozens of commits an hour exhaust CI runner limits and bloat cloud costs. CI must be shielded by local daemons and pre-flight hooks that run tests and lints locally before code is pushed to remote repositories.
- **Harness Adoption:** Added `npm run harness:check` and local pre-flight requirements in `.agents/rules/standard.md`.

### Entry 2026-02: "Agent = Model + Harness"
- **Lab/Source:** Mitchell Hashimoto & Ryan Lopopolo (OpenAI)
- **Insight:** The model is a rented commodity; the harness is the proprietary asset. When an agent fails, do not write a longer prompt; modify the environment (add a linter rule, a test, or a schema boundary).
- **Harness Adoption:** Formulated `AGENTS.md` and `ARCHITECTURE.md` around mechanical backpressure.

---

## 3. Protocol for Ingesting New Discoveries

Whenever a new research paper, lab announcement, or notable thread on X emerges:
1. **Analyze the Discovery:** Identify which layer of the harness it impacts (1. Context, 2. Memory, 3. Tools, 4. Guardrails, 5. Reviewers).
2. **Determine Mechanical Feasibility:** Can this insight be enforced via code, a linter, an ADR, or an agent rule?
3. **Log & Update:**
   - Append an entry to this radar file (`docs/harness/rad-radar.md`).
   - Run the upgrade script (`node scripts/fetch-radar.mjs`).
   - Update corresponding rule files or reviewer personas.
