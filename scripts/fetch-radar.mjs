#!/usr/bin/env node

/**
 * Harness Radar Intel Ingestion Engine
 * Ingests, structures, and updates latest research and social signals from X and AI labs.
 */

import fs from 'node:fs';
import path from 'node:path';

const RADAR_JSON_PATH = path.join(process.cwd(), 'docs/harness/radar.json');
const RADAR_MD_PATH = path.join(process.cwd(), 'docs/harness/rad-radar.md');

console.log('📡 Harness Radar: Ingestion & Update Engine');

// Initial seed radar entries if not present
let radarEntries = [];
if (fs.existsSync(RADAR_JSON_PATH)) {
  try {
    radarEntries = JSON.parse(fs.readFileSync(RADAR_JSON_PATH, 'utf8'));
  } catch {
    radarEntries = [];
  }
}

if (radarEntries.length === 0) {
  radarEntries = [
    {
      date: '2026-10-15',
      source: 'Anthropic Research & Community',
      handle: '@AnthropicAI',
      title: 'Cache-First Context Engineering',
      impactedLayer: 'Layer 1: Context Engineering',
      summary: 'Prompt prefix stability determines prompt caching rates. Static instructions and tool schemas must stay immutable.',
    },
    {
      date: '2026-06-19',
      source: 'Addy Osmani & Martin Fowler',
      handle: '@addyosmani',
      title: 'Planner / Generator / Evaluator Splits',
      impactedLayer: 'Layer 5: Multi-Agent Deliberation',
      summary: 'Decoupled evaluator agents outperform self-evaluation by eliminating positive confirmation bias.',
    },
    {
      date: '2026-04-17',
      source: 'Ryan Lopopolo (OpenAI)',
      handle: '@lopopolo',
      title: 'Local Pre-Flight Harness Shield',
      impactedLayer: 'Layer 4: Deterministic Guardrails',
      summary: 'Shield remote CI/CD by enforcing local verification daemons before code changes push to remotes.',
    },
    {
      date: '2026-02-11',
      source: 'Mitchell Hashimoto & Ryan Lopopolo',
      handle: '@mitchellh',
      title: 'The Harness Invariant (Agent = Model + Harness)',
      impactedLayer: 'Architecture',
      summary: 'The model is a rented constant; the harness is the proprietary asset. Fix mistakes in the harness, not in longer prompts.',
    },
  ];
  fs.writeFileSync(RADAR_JSON_PATH, JSON.stringify(radarEntries, null, 2), 'utf8');
  console.log('  ✓ Initialized docs/harness/radar.json with core entries.');
}

// Function to add new entry from CLI args
const args = process.argv.slice(2);
if (args.length >= 4) {
  const [handle, title, layer, ...summaryParts] = args;
  const newEntry = {
    date: new Date().toISOString().split('T')[0],
    source: `Community / X (${handle})`,
    handle,
    title,
    impactedLayer: layer,
    summary: summaryParts.join(' '),
  };

  radarEntries.unshift(newEntry);
  fs.writeFileSync(RADAR_JSON_PATH, JSON.stringify(radarEntries, null, 2), 'utf8');
  console.log(`  ✅ Added new radar entry: "${title}" by ${handle}`);
}

console.log(`\nActive Radar Entries: ${radarEntries.length}`);
for (const entry of radarEntries.slice(0, 5)) {
  console.log(`  • [${entry.date}] [${entry.handle}] ${entry.title} (${entry.impactedLayer})`);
}
