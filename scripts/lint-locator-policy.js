const fs = require('fs');
const path = require('path');

const targetDirs = ['src', 'tests'];
const allowedExtensions = new Set(['.ts']);
const ignoreDirs = new Set(['node_modules', 'playwright-report', 'test-results']);
const bannedPatterns = [
  'waitForTimeout(',
  'nth-child',
  'locator("xpath=',
  "locator('xpath=",
  'page.$(',
  'page.$$(',
];
const ignoredFiles = new Set(['src/utils/locator-policy.ts']);

function collectFiles(dir, acc) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoreDirs.has(entry.name)) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, acc);
      continue;
    }
    if (allowedExtensions.has(path.extname(entry.name))) {
      acc.push(fullPath);
    }
  }
}

function scanFile(filePath) {
  const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
  if (ignoredFiles.has(relativePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const violations = [];

  lines.forEach((line, index) => {
    for (const pattern of bannedPatterns) {
      if (line.includes(pattern)) {
        violations.push(`${filePath}:${index + 1} contains banned locator pattern "${pattern}"`);
      }
    }
  });

  return violations;
}

function main() {
  const files = [];
  for (const dir of targetDirs) {
    const full = path.resolve(process.cwd(), dir);
    if (fs.existsSync(full)) {
      collectFiles(full, files);
    }
  }

  const violations = files.flatMap((file) => scanFile(file));
  if (violations.length) {
    console.error('Locator policy violations found:\n');
    violations.forEach((violation) => console.error(`- ${violation}`));
    process.exit(1);
  }

  console.log('Locator policy check passed.');
}

main();
