# The Replacement Pipeline: Progressive System Generation

This document outlines the end-to-end pipeline for bootstrapping and evolving production software from intent to deployment using agent skills.

---

## The Generation Sequence

Rather than prompting an agent to "write the whole app", the pipeline uses specialized, decoupled skills that generate documentation layers before any backend logic is written:

```
                  ┌────────────────────────┐
                  │      Client Brief      │
                  │   (Intent / Interview) │
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │     prd-generator      │ ──> PRD.md
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │  prd-to-architecture   │ ──> ARCHITECTURE.md
                  └───────────┬────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ generate-security│ │generate-reliabil.│ │ generate-frontend│
│   SECURITY.md    │ │  RELIABILITY.md  │ │   FRONTEND.md    │
└────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │ generate-quality-score │ ──> QUALITY_SCORE.md
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │    generate-agents     │ ──> AGENTS.md
                  │  (Indexes all layers)  │
                  └────────────────────────┘
```

---

## Stage-by-Stage Breakdown

### Stage 1: Actors Before Features
- Who uses the system dictates every downstream constraint.
- For every actor: how they enter, what they see upon arrival, what they are trying to accomplish, and what they are strictly forbidden from doing.

### Stage 2: Structural Architecture & User Flows
- Convert the PRD into discrete pages, API routes, state models, and external dependencies.
- Define boundaries upfront.

### Stage 3: Progressive Living Specs
- **`SECURITY.md`:** Auth mechanism, PII sensitivity, compliance baselines, human review thresholds.
- **`RELIABILITY.md`:** Service dependencies, SLA targets, circuit breakers, fallback modes.
- **`FRONTEND.md`:** Framework, styling tokens, data fetching conventions, component anti-patterns.
- **`QUALITY_SCORE.md`:** Test coverage floor, PR size limits, Definition of Done.

### Stage 4: Frontend Prototype with Mock Data
- Build interactive frontend components with mock fixtures before writing backend services.
- Present visual artifacts to stakeholders to validate intuition before data persistence is locked down.

### Stage 5: Schema, API & Database Synthesis
- Derive API specifications and database schemas directly from the approved frontend state and architecture documents.
- Use MCP connectors (e.g. Supabase MCP, PostgreSQL MCP) to generate migrations safely without manual SQL intervention.

### Stage 6: The Root Index (`AGENTS.md`)
- `AGENTS.md` is generated **last**. It indexes all the `.md` assets created across the pipeline, serving as the agent's authoritative roadmap.
