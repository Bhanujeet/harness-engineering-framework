# Harness Engineering Radar: Live Labs & Builder Tracker (`rad-radar.md`)

This living document tracks cutting-edge methods, discoveries, and best practices emerging from frontier AI labs (OpenAI, Anthropic, Cursor, Factory, Cognition) and the builders sharing architectures on social platforms, specifically **X (Twitter)**.

---

## 1. Monitored Labs & Builders on X

| Source / Entity | Key Focus & Handle | Primary Contributions |
| :--- | :--- | :--- |
| **Mitchell Hashimoto** | `@mitchellh` | Coined "Harness Engineering" (Feb 2026). Focus on deterministic runtime environments. |
| **Ryan Lopopolo** | `@lopopolo` (OpenAI) | Authored *"Harness engineering: leveraging Codex in an agent-first world"*. 1M+ LOC with 0% hand-written code. |
| **Anthropic Research** | `@AnthropicAI` | Context window management, two-agent (Generator vs. Evaluator) splits, prompt caching, and MCP. |
| **Cursor / Anysphere** | `@cursor_run` | `AGENTS.md` standard, Cloud Agent automations, Linear MCP integrations, IDE skill definitions. |
| **Addy Osmani** | `@addyosmani` | *Agent Harness Engineering* field guide: sprint contracts, evaluator loops, and self-verification hooks. |
| **Simon Willison** | `@simonw` | Spec-driven development, tool namespacing, and prompt injection defense in agent tools. |
| **Martin Fowler / Birgitta Böckeler** | `@martinfowler` | Enterprise harness architecture, guides-and-sensors discipline, and evolutionary records. |
| **LangChain Team** | `@LangChainAI` | Terminal Bench 2.0 optimization via harness design (Top 30 to Top 5 without changing models). |

---

## 2. Core Method Log & Breakthrough Discoveries

| Date | Source / Handle | Title | Impacted Layer | Summary |
| :--- | :--- | :--- | :--- | :--- |
| **2026-10-15** | `@AnthropicAI` | **Cache-First Context Engineering** | Layer 1: Context Engineering | Prompt prefix stability determines prompt caching rates. Static instructions and tool schemas must stay immutable. |
| **2026-06-19** | `@addyosmani` | **Planner / Generator / Evaluator Splits** | Layer 5: Multi-Agent Deliberation | Decoupled evaluator agents outperform self-evaluation by eliminating positive confirmation bias. |
| **2026-04-17** | `@lopopolo` | **Local Pre-Flight Harness Shield** | Layer 4: Deterministic Guardrails | Shield remote CI/CD by enforcing local verification daemons before code changes push to remotes. |
| **2026-02-11** | `@mitchellh` | **The Harness Invariant (Agent = Model + Harness)** | Architecture | The model is a rented constant; the harness is the proprietary asset. Fix mistakes in the harness, not in longer prompts. |

---

## 3. Protocol for Ingesting New Discoveries

Whenever a new research paper, lab announcement, or notable thread on X emerges:
1. **Analyze the Discovery:** Identify which layer of the harness it impacts (1. Context, 2. Memory, 3. Tools, 4. Guardrails, 5. Reviewers).
2. **Determine Mechanical Feasibility:** Can this insight be enforced via code, a linter, an ADR, or an agent rule?
3. **Log & Update:**
   - Run `npm run radar:update "@handle" "Title" "Layer" "Summary"`.
   - Run `npm run radar:sync` to synchronize documentation.
