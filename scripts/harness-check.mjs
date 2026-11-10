#!/usr/bin/env node

/**
 * Harness Health & Architecture Check
 * Verifies that the codebase complies with Harness Engineering invariants.
 */

import fs from 'node:fs';
import path from 'node:path';

const MAX_LINES_PER_FILE = 350;
const REQUIRED_DOCS = [
  'AGENTS.md',
  'ARCHITECTURE.md',
  'SYSTEM_HIERARCHY.md',
  'SECURITY.md',
  'RELIABILITY.md',
  'PLANS.md',
  'PROGRESS.md',
  '.agents/rules/standard.md',
  'docs/harness/core-principles.md',
  'docs/harness/operational-risks.md',
  'docs/harness/rad-radar.md',
];

const ROOT_DIR = process.cwd();
let errorsFound = 0;
let warningsFound = 0;

console.log('🔍 Running Harness Health & Integrity Check...\n');

// 1. Verify required harness documentation
console.log('Checking required harness documents...');
for (const doc of REQUIRED_DOCS) {
  const fullPath = path.join(ROOT_DIR, doc);
  if (!fs.existsSync(fullPath)) {
    console.error(`  ❌ Missing required document: ${doc}`);
    errorsFound++;
  } else {
    console.log(`  ✓ ${doc}`);
  }
}

// 2. Scan for file size limits (< 350 lines)
console.log('\nChecking file size constraints (< 350 lines)...');

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') && !entry.name.startsWith('.agents') && !entry.name.startsWith('.cursor')) {
      continue;
    }
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (['.ts', '.tsx', '.js', '.jsx', '.mjs', '.md'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n').length;
        const relPath = path.relative(ROOT_DIR, fullPath);

        if (lines > MAX_LINES_PER_FILE) {
          console.warn(`  ⚠️  File exceeds 350 lines limit: ${relPath} (${lines} lines)`);
          warningsFound++;
        }
      }
    }
  }
}

scanDir(ROOT_DIR);

console.log('\n----------------------------------------');
if (errorsFound > 0) {
  console.error(`❌ Harness check failed with ${errorsFound} error(s) and ${warningsFound} warning(s).`);
  process.exit(2);
} else {
  console.log(`✅ Harness check passed successfully! (${warningsFound} warning(s))`);
  process.exit(0);
}
