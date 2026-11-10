# Harness Reliability & Resource Governance (`RELIABILITY.md`)

This document defines reliability standards, mechanical backpressure, and resource governance to prevent runaway agent loops.

---

## 1. Network & System Resilience

1. **Explicit Timeouts on Everything:**
   - Every network request, database call, and LLM invocation must declare a timeout.
   - Unbounded asynchronous waits are rejected by static analysis.
2. **Exponential Backoff & Retries:**
   - Transient operations must use retry wrappers with jitter (`withRetry`).
   - Non-idempotent operations must provide an idempotency key.
3. **Dead-Letter Queues (DLQ) & Graceful Fallbacks:**
   - Any background job failing after 3 attempts must be moved to a DLQ and logged.
   - The system must fail visibly and safely, never silently swallowing errors.

---

## 2. Token Satiation & Resource Governance

1. **Tiered Model Review:**
   - Do not trigger expensive, high-reasoning models for trivial typo or formatting fixes.
   - Use fast, lightweight models for pre-flight triage before spinning up heavy reviewer matrices.
2. **Context Window Protection:**
   - Prohibit recursive tool output dumping (e.g., dumping 10,000 lines of logs into context).
   - Use pagination, grep, or summary subagents for large exploratory operations.
3. **Local Pre-Flight Shields:**
   - Run tests and linters locally before pushing to remote CI. Never use remote CI as a substitute for local test execution.
