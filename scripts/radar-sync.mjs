#!/usr/bin/env node

/**
 * Radar Sync & Markdown Synchronizer
 * Parses radar.json, deduplicates entries, and updates rad-radar.md cleanly.
 */

import fs from 'node:fs';
import path from 'node:path';

const RADAR_JSON_PATH = path.join(process.cwd(), 'docs/harness/radar.json');
const RADAR_MD_PATH = path.join(process.cwd(), 'docs/harness/rad-radar.md');

console.log('📡 Running Radar Sync & Ingestion Engine...');

if (!fs.existsSync(RADAR_JSON_PATH)) {
  console.error(`❌ Error: ${RADAR_JSON_PATH} not found.`);
  process.exit(1);
}

let entries = [];
try {
  entries = JSON.parse(fs.readFileSync(RADAR_JSON_PATH, 'utf8'));
} catch (err) {
  console.error('❌ Failed to parse radar.json:', err.message);
  process.exit(1);
}

// Deduplicate entries by handle + title
const seen = new Set();
const uniqueEntries = [];
for (const entry of entries) {
  const key = `${entry.handle}:${entry.title}`.toLowerCase();
  if (!seen.has(key)) {
    seen.add(key);
    uniqueEntries.push(entry);
  }
}

// Sort newest first
uniqueEntries.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

fs.writeFileSync(RADAR_JSON_PATH, JSON.stringify(uniqueEntries, null, 2), 'utf8');

// Render the Markdown file
const header = `# Harness Engineering Radar: Live Labs & Builder Tracker (\`rad-radar.md\`)

This living document tracks cutting-edge methods, discoveries, and best practices emerging from frontier AI labs (OpenAI, Anthropic, Cursor, Factory, Cognition) and the builders sharing architectures on social platforms, specifically **X (Twitter)**.

---

## 1. Monitored Labs & Builders on X

| Source / Entity | Key Focus & Handle | Primary Contributions |
| :--- | :--- | :--- |
| **Mitchell Hashimoto** | \`@mitchellh\` | Coined "Harness Engineering" (Feb 2026). Focus on deterministic runtime environments. |
| **Ryan Lopopolo** | \`@lopopolo\` (OpenAI) | Authored *"Harness engineering: leveraging Codex in an agent-first world"*. 1M+ LOC with 0% hand-written code. |
| **Anthropic Research** | \`@AnthropicAI\` | Context window management, two-agent (Generator vs. Evaluator) splits, prompt caching, and MCP. |
| **Cursor / Anysphere** | \`@cursor_run\` | \`AGENTS.md\` standard, Cloud Agent automations, Linear MCP integrations, IDE skill definitions. |
| **Addy Osmani** | \`@addyosmani\` | *Agent Harness Engineering* field guide: sprint contracts, evaluator loops, and self-verification hooks. |
| **Simon Willison** | \`@simonw\` | Spec-driven development, tool namespacing, and prompt injection defense in agent tools. |
| **Martin Fowler / Birgitta Böckeler** | \`@martinfowler\` | Enterprise harness architecture, guides-and-sensors discipline, and evolutionary records. |
| **LangChain Team** | \`@LangChainAI\` | Terminal Bench 2.0 optimization via harness design (Top 30 to Top 5 without changing models). |

---

## 2. Core Method Log & Breakthrough Discoveries

`;

const tableHeader = `| Date | Source / Handle | Title | Impacted Layer | Summary |
| :--- | :--- | :--- | :--- | :--- |
`;

const tableRows = uniqueEntries
  .map(
    (e) =>
      `| **${e.date}** | \`${e.handle}\` | **${e.title}** | ${e.impactedLayer} | ${e.summary} |`
  )
  .join('\n');

const footer = `

---

## 3. Protocol for Ingesting New Discoveries

Whenever a new research paper, lab announcement, or notable thread on X emerges:
1. **Analyze the Discovery:** Identify which layer of the harness it impacts (1. Context, 2. Memory, 3. Tools, 4. Guardrails, 5. Reviewers).
2. **Determine Mechanical Feasibility:** Can this insight be enforced via code, a linter, an ADR, or an agent rule?
3. **Log & Update:**
   - Run \`npm run radar:update "@handle" "Title" "Layer" "Summary"\`.
   - Run \`npm run radar:sync\` to synchronize documentation.
`;

const fullMarkdown = header + tableHeader + tableRows + footer;
fs.writeFileSync(RADAR_MD_PATH, fullMarkdown, 'utf8');

console.log(`✅ Radar synchronized: ${uniqueEntries.length} unique entries logged.`);
