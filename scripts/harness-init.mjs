#!/usr/bin/env node

/**
 * Harness Project Initializer (`harness:init`)
 * Scaffolds a new project with the complete Harness Engineering 5-Layer framework.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const projectName = process.argv[2];

if (!projectName) {
  console.error('❌ Error: Please specify a project name or directory.');
  console.error('Usage: npm run harness:init <project-name>');
  process.exit(1);
}

const targetDir = path.isAbsolute(projectName)
  ? projectName
  : path.resolve(process.cwd(), projectName);

console.log(`🚀 Initializing Harness Engineering scaffold in: ${targetDir}`);

if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
  console.warn(`⚠️  Target directory exists and is not empty: ${targetDir}`);
} else {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Directory Structure to Create
const dirs = [
  '.agents/rules',
  '.cursor/agents',
  '.cursor/skills',
  'docs/harness',
  'docs/adrs',
  'scripts',
  'src',
  'tests',
];

for (const dir of dirs) {
  fs.mkdirSync(path.join(targetDir, dir), { recursive: true });
}

// 2. Core Template Files to Copy or Generate
const sourceRoot = path.resolve(import.meta.dirname, '..');

const filesToCopy = [
  'SYSTEM_HIERARCHY.md',
  'SECURITY.md',
  'RELIABILITY.md',
  '.agents/rules/standard.md',
  '.cursor/agents/reliability-reviewer.md',
  '.cursor/agents/security-reviewer.md',
  '.cursor/agents/type-architect.md',
  '.cursor/agents/qa-planner.md',
  '.cursor/agents/conflict-resolver.md',
  'docs/harness/core-principles.md',
  'docs/harness/operational-risks.md',
  'docs/harness/rad-radar.md',
  'docs/harness/radar.json',
  'scripts/harness-check.mjs',
  '.gitignore',
];

for (const relPath of filesToCopy) {
  const src = path.join(sourceRoot, relPath);
  const dest = path.join(targetDir, relPath);
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// 3. Generate Project-Customized AGENTS.md
const agentsMdContent = `# ${projectName} - Agent Operating Guide (\`AGENTS.md\`)

> **"Humans steer. Agents execute."**
> **"Agent = Model + Harness."** The model is a rented constant. The harness is the system you own.

---

## 1. Core Operating Principles

1. **The Golden Rule:**
   If a rule can be enforced by deterministic code (linters, type checkers, tests, pre-commit hooks), enforce it by code. Reserve \`AGENTS.md\` for orientation, soft conventions, and system navigation.
2. **Context is Scarce; Code is Free:**
   - Keep files small, cohesive, and strictly under **350 lines**.
   - Do not bloat context with large dumps or speculative scaffolding.
   - Use the filesystem as external working memory (\`PLANS.md\`, \`PROGRESS.md\`, ADRs).
3. **Mechanical Backpressure:**
   Never mark a task complete without proving it works through automated verification (\`npm run test\` and \`npm run harness:check\`).
4. **Self-Improving Harness Loop:**
   If you stumble on a build step, missing command, or ambiguous rule, **do not just fix the code**—update the corresponding documentation in the harness so future agent loops never repeat the mistake.

---

## 2. Navigation Index

- **System Architecture:** [\`ARCHITECTURE.md\`](./ARCHITECTURE.md)
- **Conflict Arbitration:** [\`SYSTEM_HIERARCHY.md\`](./SYSTEM_HIERARCHY.md)
- **Security & Sandboxing:** [\`SECURITY.md\`](./SECURITY.md)
- **Reliability & Backpressure:** [\`RELIABILITY.md\`](./RELIABILITY.md)
- **Active Plans & Milestones:** [\`PLANS.md\`](./PLANS.md)
- **Session Progress Log:** [\`PROGRESS.md\`](./PROGRESS.md)
`;

fs.writeFileSync(path.join(targetDir, 'AGENTS.md'), agentsMdContent, 'utf8');

// 4. Generate Project-Customized ARCHITECTURE.md
const archMdContent = `# ${projectName} - Architecture Blueprint (\`ARCHITECTURE.md\`)

## 1. System Overview
Define high-level product intent and core domain boundaries.

## 2. Domain Boundaries
- \`src/core/\`: Core domain models and business invariants
- \`src/api/\`: External boundary adapters and API handlers (validated with Zod/parsers)
- \`src/common/\`: Resilience wrappers, logging, and shared utilities

## 3. The 5-Layer Harness Architecture
Adheres to the universal 5-layer harness topology:
1. Context System & Cache Discipline (< 350 lines/file)
2. Externalized Memory (\`PLANS.md\`, \`PROGRESS.md\`)
3. Capability Surface & Skills (\`.cursor/skills/\`)
4. Deterministic Guardrails & Verification (\`scripts/harness-check.mjs\`)
5. Multi-Agent Deliberation (\`.cursor/agents/\`)
`;

fs.writeFileSync(path.join(targetDir, 'ARCHITECTURE.md'), archMdContent, 'utf8');

// 5. Generate Initial PLANS.md and PROGRESS.md
const plansMdContent = `# Active Execution Plans (\`PLANS.md\`)

## Objective: ${projectName} Initial Milestone
- [ ] Establish domain boundaries and core types
- [ ] Set up test suite and CI verification
- [ ] Implement initial happy-path feature
`;

fs.writeFileSync(path.join(targetDir, 'PLANS.md'), plansMdContent, 'utf8');

const progressMdContent = `# Progress & Handoff Log (\`PROGRESS.md\`)

## Session: ${new Date().toISOString().split('T')[0]}
- **Event:** Initialized project with Harness Engineering framework.
- **Status:** Scaffolding complete. Ready for architectural decomposition.
`;

fs.writeFileSync(path.join(targetDir, 'PROGRESS.md'), progressMdContent, 'utf8');

// 6. Generate package.json
const pkgJsonContent = {
  name: path.basename(targetDir).toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
  version: '0.1.0',
  private: true,
  type: 'module',
  scripts: {
    test: 'node scripts/harness-check.mjs',
    'harness:check': 'node scripts/harness-check.mjs',
  },
  devDependencies: {
    '@types/node': '^22.7.4',
  },
};

fs.writeFileSync(
  path.join(targetDir, 'package.json'),
  JSON.stringify(pkgJsonContent, null, 2),
  'utf8'
);

// 7. Initialize Git if not already a repo
try {
  execSync('git init', { cwd: targetDir, stdio: 'ignore' });
  console.log('  ✓ Initialized Git repository.');
} catch {
  // Ignore if git is not available or fails
}

console.log(`\n✅ Successfully initialized ${projectName} with Harness Engineering!`);
console.log(`\nNext steps:`);
console.log(`  cd ${path.relative(process.cwd(), targetDir) || '.'}`);
console.log(`  npm run harness:check`);
