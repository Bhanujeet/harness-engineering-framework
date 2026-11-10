# Harness Engineering: Core Principles & Methodology

> *"Implementation is no longer the scarce resource. Code is free. The goal is to build the structures that enable agents to do the full job."*
> — **Ryan Lopopolo**, OpenAI

> *"Harness engineering is the discipline of building everything around an AI model except the model itself: context, tools, specs, automated checks, and human review. Shorthand: Agent = Model + Harness."*
> — **Mitchell Hashimoto**

---

## 1. The Paradigm Shift

In traditional software engineering, human developers write syntax and manually verify logic. In **Harness Engineering**, the human's role shifts from an individual implementer to a **Systems Architect & Delegator** managing a fleet of parallel coding agents.

```
┌─────────────────────────────────────────────────────────────┐
│                 HUMAN: System Steering                      │
│      • Intent Definition • Non-Functional Constraints       │
│      • Architectural Guidance • P0 Escalation Triage        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 HARNESS: The Environment                    │
│      • Context Engineering     • Verification Backpressure  │
│      • Filesystem Memory       • Multi-Reviewer Matrix      │
│      • Skills & MCP Tools      • Conflict Arbitration       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 AGENTS: Model Execution                     │
│      • Code Generation         • Self-Verification Loop     │
│      • Test Authoring          • Atomic Commits             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Foundational Tenets

### 1. Code is Free; Attention & Context are Scarce
- The cost to write, refactor, and delete code has collapsed to near zero.
- The truly scarce resources are **Human Attention** and the **Model Context Window**.
- Software must be designed for **Legibility over Implementation**: files must be modular (< 350 lines), directory structures predictable, and side effects strictly isolated so that any task's context can be instantly paged in without context exhaustion.

### 2. Shape the Environment, Not the Model
- You rent the model from frontier labs (OpenAI, Anthropic, Google).
- You own the harness.
- **The Golden Heuristic:** When an agent makes a mistake twice, do **not** write a longer prompt. Change the harness—add a linter rule with an actionable remediation message, introduce a test, or persist an ADR in the filesystem.

### 3. Mechanical Backpressure Over Advisory Text
- Advisory text in prompts is probabilistic; deterministic tools are absolute.
- If a convention matters:
  - Enforce it via type checkers, linters, pre-commit hooks, and test suites.
  - Return exit code `2` to block actions and pipe compiler diagnostics directly back to the agent.

### 4. Filesystem as Working Memory
- Single-session context windows inevitably saturate and suffer from attention degradation.
- By externalizing state to structured files (`PLANS.md`, `PROGRESS.md`, `tasks.json`, ADRs), agents can start each session with a fresh context window while seamlessly resuming multi-day tasks.

### 5. Separation of Generation and Evaluation
- Agents skew reliably optimistic when grading their own code ("GANs for prose").
- Always decouple the **Implementation Agent** from the **Reviewer Agents**. Reviewers operate with isolated system prompts, specific domain breadcrumbs, and strict severity thresholds (P1/P2 only).
