# Universal Code Standards
**Activation:** Always On

## 1. File Size & Context Economics
- **The 350-Line Hard Cap:** Every source file must remain under 350 lines of code. If a file approaches 300 lines, extract cohesive helper modules.
- **High Cohesion, Low Coupling:** Keep directory hierarchies shallow and predictable.
- **Named Exports:** Prefer named exports over default exports to ensure searchability and seamless refactoring across agent loops.

## 2. Invariant Enforcement
- **Parse, Don't Validate:** Enforce boundary safety using schema parsers (e.g. Zod, Pydantic, or TypeBox) at external perimeters.
- **Fail Fast & Loud:** Never silently catch exceptions with empty blocks. Every error must be typed, logged, and surfaced.
- **No Unused Code / Dead Weight:** Remove dead code immediately. Do not leave commented-out blocks or speculative stubs.

## 3. Testing & Verification
- Every new feature or fix must include unit tests.
- Tests must cover:
  1. The Happy Path.
  2. At least two edge cases (boundary values, null/empty states, failure modes).
- Run `npm test` and `npm run lint` before declaring a task ready for review.
