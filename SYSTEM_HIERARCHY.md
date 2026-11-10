# System Precedence & Conflict Resolution (`SYSTEM_HIERARCHY.md`)

When multiple reviewer personas, lint checks, or subagents produce conflicting instructions, this hierarchy serves as the non-negotiable arbitration rule.

---

## 1. Arbitration Hierarchy

| Tier | Domain | Focus Area | Overrides |
| :--- | :--- | :--- | :--- |
| **Tier 1** | **Safety & Core Invariants** | System boundaries, safety invariants, load-bearing constraints | Tiers 2–6 |
| **Tier 2** | **Security & Privacy** | Credential isolation, injection defense, auth checks, data leak prevention | Tiers 3–6 |
| **Tier 3** | **Reliability & Resilience** | Network timeouts, exponential retries, failure queues, idempotency | Tiers 4–6 |
| **Tier 4** | **Specification Adherence** | Explicit PRD / user acceptance criteria, API contracts | Tiers 5–6 |
| **Tier 5** | **Performance & Cost** | Token spend, execution latency, memory footprint | Tier 6 |
| **Tier 6** | **Aesthetics & Syntactic Style** | Idiomatic sugar, DRYing, subjective style preferences | None |

---

## 2. Resolving the "Bullied Agent" Problem

A "Bullied Agent" loop occurs when Reviewer A demands X (e.g., Performance) and Reviewer B demands Y (e.g., Security), leaving the implementation agent trapped in an endless correction loop.

### Protocol:
1. **Automated De-duplication:** The Conflict Resolver agent parses all pending reviewer comments.
2. **Apply System Hierarchy:** Whichever recommendation sits at a higher Tier in the table above wins unconditionally.
3. **Generate Unified Remediation Plan:** The resolver issues a single, unified action list.
4. **Escalate Unresolvable Policy Gaps:** If two requirements clash within the same tier (e.g., contradictory security requirements), work halts and the decision is escalated to the Human Pilot.
